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

    var ac1 = Math.abs((Math.round(indexFinger.tipVelocity[0])));
    var ac2 = Math.abs((Math.round(indexFinger.tipVelocity[1])));
    var ac3 = Math.abs((Math.round(indexFinger.tipVelocity[2])));
    var speedArray= [ac1, ac2, ac3];
    // If the acceleration decrement to a min STOP THE READING
    var speed = getMaxOfArray(speedArray);

    // wirte in debbuger
    aceleration.innerText = speed;

  var speed_detection = $('#value-vel').text();

    // If the acceletation is not enough then don't start reading
    if (speed < speed_detection){
      if (readingGesture){
        if (frame.id - frameIdActual > $('#value-clousure').text()){
          clousure = false;
          stopRead();
        }
      }
    }
    // if not, then start reading.
    else {
      if (!blockRead) {
        if (!clousure){
          frameIdActual = frame.id;
          clousure = true;
        }
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


        if (recording){
            $textBox.html(" - RECORDING -");
        }
        else{
            $textBox.html("Reading Gesture");
        }
        gesture.push(screenshot);
    }

/**
 * Stop reading gesture
 */
function stopRead(){
    //console.log("Stoped read");
    $textBox.html("");

    // Mode record
    if (recording) {
        recordKey();
    }
    else{
        // Match gesture
        matchGesture();
    }

 // Reset the gesture read
    if (!stopReadGestures){
      gesture = [];
    }
    readingGesture = false;
}
