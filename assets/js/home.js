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
 *
 */


/**
 * Variable definitions
 */

const FRAMES_OLGURA = 25;
var hand, finger, indexFinger,
    gesture = [];
    gestureList = getListOfGesture();


// counter to detect the gesture in the touch zone
var touchZone = false,
    gestureCounter = 0;

// POINTABLE ZONE
var fingerName      = document.getElementById("finger-name");
    fingerPosition  = document.getElementById("finger-position"),
    fingerTipPosition     = document.getElementById("tip-position"),
    fingerDistance  = document.getElementById("finger-distance"),
    zoneDisplay     = document.getElementById("touch-zone"),
    gestureMade     = document.getElementById("gesture-made");

var ballDistance    = $('#notification-square .ball'),
    textBox         = $('#notification-square .text-notification'),
    notification    = $('#notification-square');

var normalizedDisplay = document.getElementById("normPosition");
var tipDisplay = document.getElementById("tipPosition");


// Leap.loop uses browser's requestAnimationFrame
var options = {
    enableGestures: false,
    frameEventName: "animationFrame"
};


/**
 * The LEAP LOOP
 */
Leap.loop(options, function(frame) {

    // Hand in
    if (frame.pointables.length > 0) {
        // POINTABLE ZONE
        zoneDisplay.innerText = frame.pointables[0].touchZone;
        //Hide info
        $(".img-detect").addClass("hide")
    }
    // Hand out
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
        indexFinger = hand.fingers[1];                                         // Index finger

//      fingerDistance.innerText = indexFinger.touchDistance;
        fingerName.innerText = indexFinger.toString();                         // Distal stablish
        fingerDistance.innerText = indexFinger.touchDistance;
        fingerPosition.innerText =
            "\nx: "+indexFinger.stabilizedTipPosition[0] +
            "\ny: "+indexFinger.stabilizedTipPosition[1] +
            "\nz: "+indexFinger.stabilizedTipPosition[2];
        fingerTipPosition.innerText = indexFinger.tipPosition;

        // Call to the graphic zone
        barDistance(indexFinger.touchDistance, frame.id, indexFinger.stabilizedTipPosition);

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
function barDistance(distance, frameid, screenshot) {

    ballDistance.css("left", (distance * 100) + 90);

    // Enter tocuh zone
    if (distance < 0.4) {
        touchZone = true;
        gestureCounter = frameid;
        ballDistance.addClass();
        notification.addClass("gesture");
        textBox.html("Gesture Zone");

        gesture.push(screenshot);
    }
    // Exit zone Tocuh
    else {
        if (touchZone) {
            if (frameid - gestureCounter > FRAMES_OLGURA) {
                gestureCounter = 0;
                touchZone = false;
                notification.removeClass("gesture");
                textBox.html("Normal Zone");

               // Match gesture
                matchGesture();
                gesture = [];
            }
        }
    }
}

/**
 * Algorithm of recognigser
 * @param listOfGestures
 * @param actualScreenshot
 */
function matchGesture(){

    gestureMade.innerText = gesture;

    // get the list of the gestures recorder


    // Match actual screenshot with the gestures that we have

    // keep the match.

}

function getListOfGesture(){
    var gestureList = [];
    return gestureList;
}
