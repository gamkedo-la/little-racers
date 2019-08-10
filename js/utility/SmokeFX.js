/*
////////////////////////////////////////
// SmokeFX - webgl game particle effects
////////////////////////////////////////
Instead of drawing tons of billboard particles,
This is a single draw call GPU simulation
Created by Christer Kaitila (@McFunkypants)
Based on work by Pavel Dobryakov (@PavelDoGreat)
////////////////////////////////////////
Fluid simulation shader code is Copyright (c) 2019 by Pavel Dobryakov
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

function SmokeFXClass(smokeCanvas) {

    const DEBUG_SMOKE = true;
    const HIGH_DEFINITION = false; // if true, no downsampling
    var titlescreenTime = 0; // elapsed seconds
    var titlescreenFrameCount = 0; // to measure FPS
    const titlescreenTimespan = 2.0; // tire track fire anim length in seconds

	if (DEBUG_SMOKE) console.log("SmokeFX initializing");

	let config = {
		TEXTURE_DOWNSAMPLE: HIGH_DEFINITION?1:2, // 1 == high def, 2 == blurry, 4 = low def
		DENSITY_DISSIPATION: 0.985, // how much the smoke fades (1=lasts forever)
		VELOCITY_DISSIPATION: 0.85, // how fast it slows down (0.8=glue, 0.99=air)
		PRESSURE_DISSIPATION: 0.999, // 0.7 will have things gradually slow (1=smoke lasts forever)
		PRESSURE_ITERATIONS: 5, // 25 was the default simulation passes
		CURL: 50, // how swirly the movements are, 30 is puffy 80 is spiky
		SPLAT_RADIUS: 0.0005 // the default size of a puff (1=entire screen)
	};

	//let splatStack = [];
    let puffs = []; // pending fx
   	let lastTime = Date.now();

    //make a webgl canvas if we didn't get one in the function params
    if (!smokeCanvas) {
        if (DEBUG_SMOKE) console.log("SmokeFX creating overlay canvas");
        smokeCanvas = document.createElement('canvas');
        smokeCanvas.style = "z-index:4; position:absolute; pointer-events:none;"+
        "top:0px; left:0px; width:100%; height:100%; margin:0; background:none;";
        // full screen:
        document.body.appendChild(smokeCanvas);
        // 800x600 letterboxed w black bars: FIXME the div is full width
        // but you can't make this a child of a canvas - GL error
        // div.appendChild(smokeCanvas); // put as a child of the game div
        smokeCanvas.width = smokeCanvas.clientWidth;
        smokeCanvas.height = smokeCanvas.clientHeight;
    }

	const { gl, ext } = getWebGLContext(smokeCanvas);

	function getWebGLContext(canvas) {
        
        //$CTK const params = { alpha: false, depth: false, stencil: false, antialias: false };
        const params = { alpha: true, depth: false, stencil: false, antialias: false };

		let gl = canvas.getContext('webgl2', params);
		const isWebGL2 = !!gl;
		if (!isWebGL2)
			gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

        if (!gl) {
            console.log("No WebGL on this browser: SmokeFX disabled.");
            document.body.removeChild(canvas);
            return;
        }

		let halfFloat;
		let supportLinearFiltering;
		if (isWebGL2) {
			gl.getExtension('EXT_color_buffer_float');
			supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
		} else {
			halfFloat = gl.getExtension('OES_texture_half_float');
			supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
		}

		//gl.clearColor(0.0, 0.0, 0.0, 1.0); // opaque black
        gl.clearColor(0.0, 0.0, 0.0, 0.0); // see through

		const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
		let formatRGBA;
		let formatRG;
		let formatR;

		if (isWebGL2) {
			formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
			formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
			formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
		} else {
			formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
			formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
			formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
		}

		if (DEBUG_SMOKE) console.log("SmokeFX has access to WebGL" + (isWebGL2?" 1 and 2":" 1 but *not* WebGL 2"));

		return {
			gl,
			ext: {
				formatRGBA,
				formatRG,
				formatR,
				halfFloatTexType,
				supportLinearFiltering
			}
		};


	}

	function getSupportedFormat(gl, internalFormat, format, type) {
		if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
			switch (internalFormat) {

				case gl.R16F:
					return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
				case gl.RG16F:
					return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
				default:
					return null;
			}

		}

		return {
			internalFormat,
			format
		};

	}

	function supportRenderTextureFormat(gl, internalFormat, format, type) {
		let texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

		let fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

		const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (status != gl.FRAMEBUFFER_COMPLETE)
			return false;
		return true;
	}

	class GLProgram {
		constructor(vertexShader, fragmentShader) {
			this.uniforms = {};
			this.program = gl.createProgram();

			gl.attachShader(this.program, vertexShader);
			gl.attachShader(this.program, fragmentShader);
			gl.linkProgram(this.program);

			if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
				throw gl.getProgramInfoLog(this.program);

			const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
			for (let i = 0; i < uniformCount; i++) {
				const uniformName = gl.getActiveUniform(this.program, i).name;
				this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
			}
		}

		bind() {
			gl.useProgram(this.program);
		}
	}


	function compileShader(type, source) {
        
        if (!gl) return;
        
        const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
			throw gl.getShaderInfoLog(shader);

		return shader;
	};

	const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		attribute vec2 aPosition;
		varying vec2 vUv;
		varying vec2 vL;
		varying vec2 vR;
		varying vec2 vT;
		varying vec2 vB;
		uniform vec2 texelSize;

		void main () {
				vUv = aPosition * 0.5 + 0.5;
				vL = vUv - vec2(texelSize.x, 0.0);
				vR = vUv + vec2(texelSize.x, 0.0);
				vT = vUv + vec2(0.0, texelSize.y);
				vB = vUv - vec2(0.0, texelSize.y);
				gl_Position = vec4(aPosition, 0.0, 1.0);
		}
`);

	const clearShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		uniform sampler2D uTexture;
		uniform float value;

		void main () {
                gl_FragColor = value * texture2D(uTexture, vUv);
                //$CTK
                //gl_FragColor.a = 0.1;
		}
`);

	const displayShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		uniform sampler2D uTexture;

		void main () {
                gl_FragColor = texture2D(uTexture, vUv);
                //$CTK
                //gl_FragColor.a = 0.1;
		}
`);

	const splatShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		uniform sampler2D uTarget;
		uniform float aspectRatio;
		uniform vec3 color;
		uniform vec2 point;
		uniform float radius;

		void main () {
				vec2 p = vUv - point.xy;
				p.x *= aspectRatio;
				vec3 splat = exp(-dot(p, p) / radius) * color;
				vec3 base = texture2D(uTarget, vUv).xyz;
                //$CTK gl_FragColor = vec4(base + splat, 1.0);
                gl_FragColor = vec4(base + splat, 0.1); // FIXME why does this not render at 0.0 like in the demo
		}
`);

	const advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		uniform sampler2D uVelocity;
		uniform sampler2D uSource;
		uniform vec2 texelSize;
		uniform float dt;
		uniform float dissipation;

		vec4 bilerp (in sampler2D sam, in vec2 p) {
				vec4 st;
				st.xy = floor(p - 0.5) + 0.5;
				st.zw = st.xy + 1.0;
				vec4 uv = st * texelSize.xyxy;
				vec4 a = texture2D(sam, uv.xy);
				vec4 b = texture2D(sam, uv.zy);
				vec4 c = texture2D(sam, uv.xw);
				vec4 d = texture2D(sam, uv.zw);
				vec2 f = p - st.xy;
				return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
		}

		void main () {
				vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
				gl_FragColor = dissipation * bilerp(uSource, coord);
                //$CTK 
                //gl_FragColor.a = 0.1;
		}
`);

	const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		uniform sampler2D uVelocity;
		uniform sampler2D uSource;
		uniform vec2 texelSize;
		uniform float dt;
		uniform float dissipation;

		void main () {
				vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
				gl_FragColor = dissipation * texture2D(uSource, coord);
                // $CTK gl_FragColor.a = 1.0;
                gl_FragColor.a = 0.0; //0.001; //gl_FragColor.r;// + gl_FragColor.g + gl_FragColor.b) / 3.0;
		}
`);

	const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		varying vec2 vL;
		varying vec2 vR;
		varying vec2 vT;
		varying vec2 vB;
		uniform sampler2D uVelocity;

		vec2 sampleVelocity (in vec2 uv) {
				vec2 multiplier = vec2(1.0, 1.0);
				if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
				if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
				if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
				if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
				return multiplier * texture2D(uVelocity, uv).xy;
		}

		void main () {
				float L = sampleVelocity(vL).x;
				float R = sampleVelocity(vR).x;
				float T = sampleVelocity(vT).y;
				float B = sampleVelocity(vB).y;
				float div = 0.5 * (R - L + T - B);
                //$CTK 
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
                //gl_FragColor = vec4(div, 0.0, 0.0, 0.1);
		}
`);

	const curlShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		varying vec2 vL;
		varying vec2 vR;
		varying vec2 vT;
		varying vec2 vB;
		uniform sampler2D uVelocity;

		void main () {
				float L = texture2D(uVelocity, vL).y;
				float R = texture2D(uVelocity, vR).y;
				float T = texture2D(uVelocity, vT).x;
				float B = texture2D(uVelocity, vB).x;
				float vorticity = R - L - T + B;
                //$CTK
                gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
                //gl_FragColor = vec4(vorticity, 0.0, 0.0, 0.1);
		}
`);

	const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		varying vec2 vT;
		varying vec2 vB;
		uniform sampler2D uVelocity;
		uniform sampler2D uCurl;
		uniform float curl;
		uniform float dt;

		void main () {
				float T = texture2D(uCurl, vT).x;
				float B = texture2D(uCurl, vB).x;
				float C = texture2D(uCurl, vUv).x;
				vec2 force = vec2(abs(T) - abs(B), 0.0);
				force *= 1.0 / length(force + 0.00001) * curl * C;
				vec2 vel = texture2D(uVelocity, vUv).xy;
                //$CTK 
                gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
                //gl_FragColor = vec4(vel + force * dt, 0.0, 0.1);
		}
`);

	const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		varying vec2 vL;
		varying vec2 vR;
		varying vec2 vT;
		varying vec2 vB;
		uniform sampler2D uPressure;
		uniform sampler2D uDivergence;

		vec2 boundary (in vec2 uv) {
				uv = min(max(uv, 0.0), 1.0);
				return uv;
		}

		void main () {
				float L = texture2D(uPressure, boundary(vL)).x;
				float R = texture2D(uPressure, boundary(vR)).x;
				float T = texture2D(uPressure, boundary(vT)).x;
				float B = texture2D(uPressure, boundary(vB)).x;
				float C = texture2D(uPressure, vUv).x;
				float divergence = texture2D(uDivergence, vUv).x;
				float pressure = (L + R + B + T - divergence) * 0.25;
                //$CTK 
                gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
                //gl_FragColor = vec4(pressure, 0.0, 0.0, 0.1);
		}
`);

	const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
		precision highp float;
		precision mediump sampler2D;

		varying vec2 vUv;
		varying vec2 vL;
		varying vec2 vR;
		varying vec2 vT;
		varying vec2 vB;
		uniform sampler2D uPressure;
		uniform sampler2D uVelocity;

		vec2 boundary (in vec2 uv) {
				uv = min(max(uv, 0.0), 1.0);
				return uv;
		}

		void main () {
				float L = texture2D(uPressure, boundary(vL)).x;
				float R = texture2D(uPressure, boundary(vR)).x;
				float T = texture2D(uPressure, boundary(vT)).x;
				float B = texture2D(uPressure, boundary(vB)).x;
				vec2 velocity = texture2D(uVelocity, vUv).xy;
				velocity.xy -= vec2(R - L, T - B);
                //$CTK 
                gl_FragColor = vec4(velocity, 0.0, 1.0);
                //gl_FragColor = vec4(velocity, 0.0, 0.1);
		}
`);

	let textureWidth;
	let textureHeight;
	let density;
	let velocity;
	let divergence;
	let curl;
	let pressure;

	initFramebuffers();

	const clearProgram = new GLProgram(baseVertexShader, clearShader);
	const displayProgram = new GLProgram(baseVertexShader, displayShader);
	const splatProgram = new GLProgram(baseVertexShader, splatShader);
	const advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
	const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
	const curlProgram = new GLProgram(baseVertexShader, curlShader);
	const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
	const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
	const gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

	function initFramebuffers() {
        
        if (!gl) return;

        if (DEBUG_SMOKE) console.log("SmokeFX init framebuffers");

		textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
		textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

		const texType = ext.halfFloatTexType;
		const rgba = ext.formatRGBA;
		const rg = ext.formatRG;
		const r = ext.formatR;

		density = createDoubleFBO(2, textureWidth, textureHeight, rgba.internalFormat, rgba.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
		velocity = createDoubleFBO(0, textureWidth, textureHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
		divergence = createFBO(4, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
		curl = createFBO(5, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
		pressure = createDoubleFBO(6, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
	}

	function createFBO(texId, w, h, internalFormat, format, type, param) {

        if (!gl) return;

		gl.activeTexture(gl.TEXTURE0 + texId);
		let texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

		let fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
		gl.viewport(0, 0, w, h);
		gl.clear(gl.COLOR_BUFFER_BIT);

		return [texture, fbo, texId];
	}

	function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
        if (!gl) return;
		let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
		let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

		return {
			get read() {
				return fbo1;
			},
			get write() {
				return fbo2;
			},
			swap() {
				let temp = fbo1;
				fbo1 = fbo2;
				fbo2 = temp;
			}
		};

	}

	const dataBuffer = gl.createBuffer();
	const dataArray = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
	const indexBuffer = gl.createBuffer();
	const indexArray = new Uint16Array([0, 1, 2, 0, 2, 3]);

	const blit = (() => {
        if (!gl) return;
		gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, dataArray, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		return destination => {
			gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
			gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
		};
	})();

    function resizeCanvas() {
        if (smokeCanvas.width != smokeCanvas.clientWidth || 
            smokeCanvas.height != smokeCanvas.clientHeight) {
            if (DEBUG_SMOKE) console.log("SmokeFX resizing render buffers to fit new canvas size");
            smokeCanvas.width = smokeCanvas.clientWidth;
            smokeCanvas.height = smokeCanvas.clientHeight;
            initFramebuffers();
        }
    }

    function titlescreenFX(dt) {
          
        titlescreenTime += dt;
        titlescreenFrameCount++;

		var animPercent = titlescreenTime/titlescreenTimespan;

        if (animPercent>=1 && !window.reportedFPS) {
            if (DEBUG_SMOKE) console.log("Tire track animation: " + titlescreenFrameCount + " frames in " + titlescreenTime.toFixed(1) + " sec = " + (titlescreenFrameCount/titlescreenTime).toFixed(1)+" FPS");
            window.reportedFPS = true;
        }
        
        // just for fun, spawn on the mouse cursor during the menus
        // FIXME this does not take canvas stretching into account
        // works, but offset
        /*
        add(mouseX,mouseY,
            200 * (Math.random() - 0.5),-50 * (Math.random()),
            [Math.random()/2,Math.random()/2, Math.random()/2],
            Math.random()*0.001);
        */

        // fire near the logo
        // the canvas stretching makes the calulation wierd
        for (var loop=0; loop<2; loop++) {

			if(animPercent > 6) {
				//reset counters so the animation can run again
				animPercent = 0;
				titlescreenTime = 0;
		        titlescreenFrameCount = 0;
            }
            
            var puffscale = 0.25;


            // ==== FLAMING TRACKS
            add((smokeCanvas.width * animPercent),
                smokeCanvas.height - (smokeCanvas.height * 0.18 + Math.random() * 20),
                256 * (Math.random() - 0.5), -32 * (Math.random()),
                [Math.random()*0.72+0.75,Math.random()*0.25+0.25,Math.random()*0.25],
                puffscale * Math.random()*0.002 + 0.0001);
            add((smokeCanvas.width * animPercent),
                smokeCanvas.height - (smokeCanvas.height * 0.075 + Math.random() * 20),
                256 * (Math.random() - 0.5), -32 * (Math.random()),
                [Math.random()*0.72+0.75,Math.random()*0.25+0.25,Math.random()*0.25],
                puffscale * Math.random()*0.002 + 0.0001);

        }

    }

    function update() {
        
        if (!smokeCanvas) return;
		if (!gl) return;
		
        resizeCanvas();
        
		const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);

        if (window.titleScreen) titlescreenFX(dt);

        lastTime = Date.now();
		gl.viewport(0, 0, textureWidth, textureHeight);
		advectionProgram.bind();
		gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
		gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read[2]);
		gl.uniform1f(advectionProgram.uniforms.dt, dt);
		gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
		blit(velocity.write[1]);
		velocity.swap();

		gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
		gl.uniform1i(advectionProgram.uniforms.uSource, density.read[2]);
		gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
		blit(density.write[1]);
		density.swap();

		// add all pending puffs to the simulation
		for (let i = 0; i < puffs.length; i++) {
				const puff = puffs[i];
			if (puff.moved) {
				splat(puff.x, puff.y, puff.dx, puff.dy, puff.color, puff.size);
				puff.moved = false;
			}
        }
        // fixme this thrashes the GC - better to just overwrite
        puffs = [];

		curlProgram.bind();
		gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read[2]);
		blit(curl[1]);

		vorticityProgram.bind();
		gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read[2]);
		gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
		gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
		gl.uniform1f(vorticityProgram.uniforms.dt, dt);
		blit(velocity.write[1]);
		velocity.swap();

		divergenceProgram.bind();
		gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read[2]);
		blit(divergence[1]);

		clearProgram.bind();
		let pressureTexId = pressure.read[2];
		gl.activeTexture(gl.TEXTURE0 + pressureTexId);
		gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
		gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
		gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
		blit(pressure.write[1]);
		pressure.swap();

		pressureProgram.bind();
		gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
		pressureTexId = pressure.read[2];
		gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
		gl.activeTexture(gl.TEXTURE0 + pressureTexId);

		for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
			gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
			blit(pressure.write[1]);
			pressure.swap();
		}

		gradienSubtractProgram.bind();
		gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
		gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read[2]);
		gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read[2]);
		blit(velocity.write[1]);
		velocity.swap();

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		displayProgram.bind();
		gl.uniform1i(displayProgram.uniforms.uTexture, density.read[2]);
		blit(null);

		//requestAnimationFrame(update);
	} // end update function

	this.update = update;

    // warning: do not call this many times per frame! <4x is good
    function splat(x, y, dx, dy, color, size) {

        if (!gl) return; // make sure WebGL initialized ok

        if (!size) size = config.SPLAT_RADIUS; // default

        //if (DEBUG_SMOKE && !titleScreen) console.log("SmokeFX splat pos:" + x + "," + y + " spd:" + dx + "," + dy + " col:" + color);
        
        // black does work but it is "invisible" and erases r,g,b density
        // so it is only good to define areas where smoke can't go
        //if (Math.random()>0.5) { color[0]=color[1]=color[2]=0; }

		splatProgram.bind();
		gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read[2]);
		gl.uniform1f(splatProgram.uniforms.aspectRatio, smokeCanvas.width / smokeCanvas.height);
		gl.uniform2f(splatProgram.uniforms.point, x / smokeCanvas.width, 1.0 - y / smokeCanvas.height);
		gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
		gl.uniform1f(splatProgram.uniforms.radius, size);
		blit(velocity.write[1]);
		velocity.swap();

		gl.uniform1i(splatProgram.uniforms.uTarget, density.read[2]);
		gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
		blit(density.write[1]);
		density.swap();
	}

    /*
    function multipleSplats(amount) {
		for (let i = 0; i < amount; i++) {
			const color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
			const x = smokeCanvas.width * Math.random();
			const y = smokeCanvas.height * Math.random();
			const dx = 1000 * (Math.random() - 0.5);
			const dy = 1000 * (Math.random() - 0.5);
			splat(x, y, dx, dy, color);
		}
    }
    */

    // the game uses this function to add fx
    // eg. SmokeFX.add(p1.x,p1.y,speed.x,speed.y,[255,255,255],0.001);
    function add(x, y, dx, dy, color, size) {
        if (!smokeCanvas) return;
        if (!gl) return;
        if (x==0 && y==0) return; // ignore during inits etc
//        if (x<0) x=0; if (x>smokeCanvas.width) x=smokeCanvas.width;
//        if (y<0) y=0; if (y>smokeCanvas.height) y=smokeCanvas.height;

        // cannot do - shader in wrong state
        //splat(x, y, dx, dy, color, size);
        //return;

        // queued for processing during the update
        var data = {x:x,y:y,dx:dx,dy:dy,color:color,size:size,moved:true};
        //if (DEBUG_SMOKE) console.log("SmokeFX.add at "+x+","+y);
        puffs.push(data); // FIXME memory leak
        /*
        if (!puffs[0]) puffs[0] = {};
        puffs[0].x = x;
        puffs[0].y = y;
        puffs[0].dx = dx;
        puffs[0].dy = dy;
        puffs[0].color = color;
        puffs[0].size = size;
        puffs[0].moved = true;
        */
    }

    this.add = add;

    this.stop = function() {
        if (DEBUG_SMOKE) console.log("SmokeFX stopping.");
        smokeCanvas.style.display='none';
        if (DEBUG_SMOKE) console.log("Title screen: " + titlescreenFrameCount + " frames in " + titlescreenTime.toFixed(1) + " sec = " + (titlescreenFrameCount/titlescreenTime).toFixed(1)+" FPS");
    }

    this.hide = function() {
        if (DEBUG_SMOKE) console.log("SmokeFX canvas is now hidden");
        smokeCanvas.style.display='none';
    }

    this.show = function() {
        if (DEBUG_SMOKE) console.log("SmokeFX canvas is now visible");
        smokeCanvas.style.display='block';
    }

    // fixme - this gets run >1 times per frame yuck
    this.resizeTo = function(w,h) {
        //if (DEBUG_SMOKE) console.log("SmokeFX resizeTo "+w+"x"+h);
        smokeCanvas.style.display='block';
        smokeCanvas.style.top = "0px";
        smokeCanvas.style.left = Math.round((window.innerWidth / 2) - (w / 2)) + "px";
        smokeCanvas.style.width = w+"px";
        smokeCanvas.style.height = h+"px";
        resizeCanvas();
    }

} // end SmokeFX class

// start animating the effect at 60fps
function SmokeFXStartRendering() {
    // only update the simulation if enabled
    //if ((titleScreen && SMOKE_FX_IN_MENU) ||
    //    ((!titleScreen) && SMOKE_FX_IN_GAME)) {
        SmokeFX.update();
    //}

    // hide the canvas if no longer being used
    // this also stops any CPU/GPU use:
    // SmokeFX (WebGL) will no longer run
    // at all during the game this way:
    if (!titleScreen && !SMOKE_FX_IN_GAME) {
        SmokeFX.stop();
    }
    else {
        // wait for next frame and update if still allowed
        requestAnimationFrame(SmokeFXStartRendering);
    }
}