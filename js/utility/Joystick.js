// ultra-simple single axis gamepad support
// made with love by mcfunkypants for Ballrog

var isJoystickBeingUsed = false;
function handleJoystickControls() {

    // pixles per frame at max joystick reading
    const JOYSTICK_SPEED_SCALE = 8; 
    
    var x = 0;
    var buttonWasPressed = false;

    if (navigator.getGamepads) { // new enough browser? 
        var gamepad = navigator.getGamepads()[0]; // first avail
        if (gamepad) { // always null unless user has pressed a button
            
            // just use the first gamepad
            x = gamepad.axes[0]; // left stick
            
            // deadzone to avoid drift due to sensor innacuracy
            if (Math.abs(x)<0.1) x = 0;
            
            buttonWasPressed = 
                (gamepad.buttons[0].value || 
                gamepad.buttons[1].value ||
                gamepad.buttons[2].value ||
                gamepad.buttons[3].value ||
                gamepad.buttons[9].value);
            
                // avoids joystick setting turn state when using keyboard
            if (buttonWasPressed) isJoystickBeingUsed = true;
        
        }
    }


    if (isJoystickBeingUsed) { // ever, this game

        vehicleList[0].keyHeld_Gas = gamepad.buttons[0].value > 0;
        vehicleList[0].keyHeld_Reverse = gamepad.buttons[1].value > 0;
        // FIXME: could be using analog turning controls (ie: not just on/off)
        vehicleList[0].keyHeld_TurnLeft = x < 0;
        vehicleList[0].keyHeld_TurnRight = x > 0;
        
        // debug info
        /*
        console.log('joystick X: '+x.toFixed(1)+
        (vehicleList[0].keyHeld_Gas ? 'GAS ':'')+
        (vehicleList[0].keyHeld_Reverse ? 'REV ':'')+
        (vehicleList[0].keyHeld_TurnLeft ? 'LEFT ':'')+
        (vehicleList[0].keyHeld_TurnRight ? 'RIGHT ':''));
        */

    }
}
