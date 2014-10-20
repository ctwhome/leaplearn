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
var main = function () {
  getListFromLocalSotorage();     // LOAD FROM LOCAL STORAGEges
  updateDataList();               // Load the algorithm
}();

/**
 * Leap controller
 * @type {exports.Controller}
 */
var controller = new Leap.Controller({
  //host: '127.0.0.1',
  //port: 8081,
  enableGestures: false,
  frameEventName: 'animationFrame',
  useAllPlugins: true
  //riggedHand : true
});

controller.connect();

controller.setBackground(true);
controller.on('frame', onFrame);

function onFrame(frame) {
  handDetection(frame);

  if (!prompt) {
    for (var i = 0, len = frame.hands.length; i < len; i++) {
      hand = frame.hands[i];
      indexFinger = hand.fingers[1];      // Index finger

      debbug(hand, indexFinger);          // Debug data
      infoBars(indexFinger);

      detectGesture(frame);
    }
  }
}
