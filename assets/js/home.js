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
 * Main Function
 */
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
    handDetection(frame);

    for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        indexFinger = hand.fingers[1];      // Index finger

        debbug(hand, indexFinger);          // Debug data
        infoBars(indexFinger);

        detectGesture(frame);
    }
})
    //Ussing plugins
    .use('riggedHand');                      // Render 3d hands


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