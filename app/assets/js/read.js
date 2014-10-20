/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 20/10/14, 12:50.
 *
 * read.js
 * ---------------------
 */

/**
 * Bar distance graphic
 * @param distance
 */
function detectGesture(frame) {
    // If the acceleration decrement to a min STOP THE READING
    var ac1 = Math.abs((Math.round(indexFinger.tipVelocity[0])));
    var ac2 = Math.abs((Math.round(indexFinger.tipVelocity[1])));
    var ac3 = Math.abs((Math.round(indexFinger.tipVelocity[2])));

    // wirte in debbuger
    aceleration.innerText = "x: "+ ac1 + "\ny: "+ ac2 +"\nz: "+ ac3;

    // If the acceletation of the hand is not enough then don't start reading
    if  ((ac1 < SPEED_DETECTION) &&
         (ac2 < SPEED_DETECTION) &&
         (ac3 < SPEED_DETECTION)){

        // GESTURE READ
        if (readingGesture){
            stopRead();
        }
    }
    // if not, then start reading.
    else {
        if (!blockRead) {
            // console.log("READING");
            readingGesture = true;
            read(frame.id, indexFinger.stabilizedTipPosition);
        }
    }
}

/**
 * Start reading gesture
 * @param frameid
 * @param screenshot
 */
function read(frameid, screenshot){
    gestureCounter = frameid;

    //Update information cartel
    notification.addClass("gesture");

    if (recording){
        textBox.html("RECORDING");
    }
    else{
        textBox.html("Reading Gesture");
    }
    gesture.push(screenshot);
}

/**
 * Stop reading gesture
 */
function stopRead(){
    //console.log("Stoped read");

    notification.removeClass("gesture");
    textBox.html("");

    // Mode record
    if (recording) {
        recordKey();
    }
    else{
        // Match gesture
        matchGesture(gesture);
    }

 // Reset the gesture read
    if (!prompt){
      gesture = [];
    }
    readingGesture = false;
}
