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
var frameString = "", handString = "", fingerString = "";
var hand, finger, indexFinger;

// POINTABLE ZONE
var fingerName      = document.getElementById("finger-name");
var fingerPosition  = document.getElementById("finger-position");
var fingerDistance  = document.getElementById("finger-distance");
var zoneDisplay     = document.getElementById("touch-zone");

var ballDistance    = $('#notification-square .ball'),
    textBox         = $('#notification-square .text-notification'),
    notification    = $('#notification-square');



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
        zoneDisplay.innerText = frame.pointables[0].touchZone;;
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
        indexFinger = hand.fingers[1];
//        fingerDistance.innerText = indexFinger.touchDistance;
        fingerDistance.innerText = indexFinger.stabilizedTipPosition;
        console.log("Console check: ", indexFinger);

        barDistance(indexFinger.touchDistance);
    }
})
    .use('riggedHand');


function barDistance(distance){
    ballDistance.css("left",(distance*100)+90);
    if (distance < 0.4) {
        ballDistance.addClass();
        notification.addClass("gesture");
        textBox.html("Gesture Zone");
    }
    else {
        notification.removeClass("gesture");
        textBox.html("Normal Zone");
    }
}