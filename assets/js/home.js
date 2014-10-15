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
    getListFromLocalSotorage();     // LOAD FROM LOCAL STORAGEges
    updateDataList();               // Load the algorithm
}();


/**
 * KEY BINDING FIXME
 */
//var Mousetrap = new Mousetrap();
//
//Mousetrap.bind('/', function(){
//    alert("PUSHED A");
//} );


var java = require('java');

var Robot = java.import('java.awt.Robot');
var robot = new Robot();

robot.mouseMoveSync(0, 0);






/**
 * The LEAP LOOP
 */
//var options = {
//    enableGestures: false,
//    // Leap.loop uses browser's requestAnimationFrame
//    frameEventName: "animationFrame"
//};

//// The leap Loop
//Leap.loop(options, function(frame) {
//
//})
//    //Ussing plugins
//    .use('riggedHand');                      // Render 3d hands
//


var controller = new Leap.Controller({
    //host: '127.0.0.1',
    //port: 8081,
    enableGestures: false,
    frameEventName: 'animationFrame',
    useAllPlugins: true,
    //riggedHand : true
});

controller.connect();
controller.setBackground(true);
controller.on('frame', onFrame);



function onFrame(frame) {
    handDetection(frame);


    // FOCUS FIXME BUT WORKS: ASIGN THE VAR
    if ( document.hasFocus() ) {
//        console.log("FOCUS");
    } else {
//        console.log("NO FOCUS");
    }


    for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        indexFinger = hand.fingers[1];      // Index finger

        debbug(hand, indexFinger);          // Debug data
        infoBars(indexFinger);

        detectGesture(frame);
    }
}