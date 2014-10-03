/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 26/09/14, 11:25.
 *
 * Home file
 * ---------------------
 */

/**
 * Variable definitions
 */

// time (in frames) to detect if the gesture its outside of the gesture zone
const FRAMES_OLGURA = 25;
const SPEED_DETECTION = 30;

var hand, finger, indexFinger,
    gesture = [],
    userGestures = [],
    gestureList = {};

// counter to detect the gesture in the touch zone
var readGesture = false,
    gestureCounter = 0;

// POINTABLE ZONE
var fingerName          = document.getElementById("finger-name");
    fingerPosition      = document.getElementById("finger-position"),
    fingerTipPosition   = document.getElementById("tip-position"),
    fingerDistance      = document.getElementById("finger-distance"),
    zoneDisplay         = document.getElementById("touch-zone"),
    aceleration         = document.getElementById("aceleration"),
    gestureMade         = document.getElementById("gesture-made"),
    info                = document.getElementById("info");


var ballDistance    = $('#notification-square .ball'),
    textBox         = $('#notification-square .text-notification'),
    notification    = $('#notification-square');

// OneDollar
var one = new OneDollar();

var normalizedDisplay = document.getElementById("normPosition");
var tipDisplay = document.getElementById("tipPosition");



// Main fuction
var main = function (){
    getListOfGesture();

}();



/**
 * The LEAP LOOP
 */
var options = {
    enableGestures: false,
    // Leap.loop uses browser's requestAnimationFrame
    frameEventName: "animationFrame"
};

// The leap Loop
Leap.loop(options, function(frame) {

    
    // Hand in the system
    if (frame.pointables.length > 0) {
        // POINTABLE ZONE
        zoneDisplay.innerText = frame.pointables[0].readGesture;
        //Hide info
        $(".img-detect").addClass("hide")
    }
    // Hand out of the system
    else {
        //Hide img of detection
        $(".img-detect").removeClass("hide")
        textBox.html("");
    }

    /**
     * If the finger is hovering
     */
    for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        indexFinger = hand.fingers[1];                                              // Index finger

        fingerName.innerText = indexFinger.toString();                              // Distal stablish
        fingerDistance.innerText = indexFinger.touchDistance;
        fingerPosition.innerText =
            "\nx: "+indexFinger.stabilizedTipPosition[0] +
            "\ny: "+indexFinger.stabilizedTipPosition[1] +
            "\nz: "+indexFinger.stabilizedTipPosition[2];
        fingerTipPosition.innerText = indexFinger.tipPosition;

//        console.log("Console check: ", indexFinger);


        // Call to the graphic zone
        ballDistance.css("left", (indexFinger.touchDistance * 100) + 90);

        detectGesture(indexFinger.touchDistance, frame.id, indexFinger.stabilizedTipPosition, indexFinger);

    }
})
    //Ussing plugins
    .use('riggedHand')                  // Render 3d hands
    .use('screenPosition', {            // Screen Position
        scale: 1
    })

/**
 * Bar distance graphic
 * @param distance
 */
function detectGesture(distance, frameid, screenshot, indexFinger) {

    // Enter tocuh zone
//    if (distance < 0.4) {
//
        // If the acceleration decrement to a min STOP THE READING
        aceleration.innerText = indexFinger.tipVelocity;

        if ((indexFinger.tipVelocity[0] < SPEED_DETECTION) &&
            (indexFinger.tipVelocity[1] < SPEED_DETECTION) &&
            (indexFinger.tipVelocity[2] < SPEED_DETECTION) ){
            stopRead();
        }
        else {
            read(frameid, screenshot);
        }

//        if(readGesture){
//            read(frameid, screenshot);
//
//        }
//    }
//    // Exit zone Tocuh
//    else {
//        if (readGesture) {
//            if (frameid - gestureCounter > FRAMES_OLGURA) {
//              stopRead();
//            }
//        }
//    }
}


/**
 * Start reading gesture
 * @param frameid
 * @param screenshot
 */
function read(frameid, screenshot){
    info.innerHTML = "Reading Gesture";

    gestureCounter = frameid;
    ballDistance.addClass();
    notification.addClass("gesture");
    textBox.html("Gesture Zone");

    gesture.push(screenshot);
}
/**
 * Stop reading gesture
 */
function stopRead(){
    console.log("Stoped");
    gestureCounter = 0;
    readGesture = false;
    notification.removeClass("gesture");
    textBox.html("Normal Zone");
    info.innerHTML = "";


    // Match gesture
    matchGesture(toTemplate(gesture));
    saveGesure(gesture);
    gesture = [];
}



/**
 * Get list of gestures
 * @returns {Array}
 */
function getListOfGesture(){

    // GET FROM FILE
    $.getJSON("assets/data/gesture_base.json", function(json){
        gestureList = json;
        console.log("Gestures list data loaded.");
        passGesturesToAlgorithm();
    });
}

/**
 * Update gestures json file
 */
function addGestureToFile(){

}


/**
 * Save Gesture created in LocalStorage
 */
function saveGesure(gesture){
    //last gesture push

    for (var i in gesture){
        for(var j in gesture[i])
        gesture[i][j] = Math.round(gesture[i][j]);
    }
    userGestures.push(gesture)
    localStorage.setItem('userGestures', JSON.stringify(userGestures))
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