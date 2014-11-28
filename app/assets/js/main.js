/**
 *  Leap Learn
 * ----------------------
 * GNU GPLv3 License (c) - 2014
 *
 * @link http://www.github.com/learnlab
 * @copyright GNU GPLv3 License, http://gnu.org/copyleft/gpl.html
 * @author Jesus Garcia <ctw@ctwhome.com> 25/07/14, 22:35.
 *
*/

 /**
 * Main Function
 */
getListFromLocalSotorage();     // LOAD FROM LOCAL STORAGE
updateDataList();               // Load the algorithm


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

  if (!stopReadGestures) {
    for (var i = 0, len = frame.hands.length; i < len; i++) {
      hand = frame.hands[i];
      indexFinger = hand.fingers[1];      // Index finger

      debbug(hand, indexFinger);          // Debug data
      infoBars(indexFinger);

      detectGesture(frame);
    }
  }
}
