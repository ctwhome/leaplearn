/**
 * Created by ctw on 05/10/14.
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
//        console.log("STOP" );

        //console.log("STOP", gesture);

        if (readingGesture){
            stopRead();
        }

    }
    // if not, then start reading.
    else {
        if (!blockRead) {
            console.log("READING");
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
    }else{
        textBox.html("Reading Gesture");
    }
    gesture.push(screenshot);
}

/**
 * Stop reading gesture
 */
function stopRead(){
    console.log("Stoped");


//    gestureCounter = 0;

    notification.removeClass("gesture");
    textBox.html("");

    // Mode record
    if (recording){
        saveGesure(gesture);
    }else{
        // Match gesture
        matchGesture(toTemplate(gesture));
    }

 // Reset the gesture read
    gesture = [];
    readingGesture = false;
}

/**
 * Template for 1 Dollar
 * @param gesture
 * @return Function array with the format for 1 Dollar
 */
function toTemplate(gesture){
    var gestureTemplate = [];
    for (var i in gesture){
        gestureTemplate.push([
            Math.round(gesture[i][0]),
            Math.round(gesture[i][1])                           // 2 dimension, add the third!
        ])
    }
    return gestureTemplate;
}