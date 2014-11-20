/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * Gestures zone controller
 * ---------------------
 * Main page touchs
 */

define([
  'controllers/GesturesPanelController',
  'controllers/SettingsPanelController',
  'views/GesturezoneView'
], function (
    GesturesPanelController,
    SettingsPanelController,
    GesturezoneView) {

  this.settings = {
    "gestureZone"   : "#gestureZone",
    "entranceButton": {}
  }


// DEBUGG ZONE
  var fingerName        = document.getElementById("finger-name"),
    fingerPosition      = document.getElementById("finger-position"),
    fingerTipPosition   = document.getElementById("tip-position"),
    fingerDistance      = document.getElementById("finger-distance"),
    aceleration         = document.getElementById("aceleration"),
    info                = document.getElementById("info");


  function start() {
// time (in frames) to detect if the gesture its outside of the gesture zone
    const FRAMES_OLGURA = localStorage.getItem('FRAMES_OLGURA') || 5;
    const PERCENTAGE_DETECTION = localStorage.getItem('PERCENTAGE_DETECTION') || 80;
    const SPEED_DETECTION = localStorage.getItem('SPEED_DETECTION') || 70;
    const PADING_CANVAS_BOX = 97;
// AXIS 1: xy  || 2: xy & yz || 3 xy & yz & zy
    const NUM_AXIS = 1;


    var readingGesture = false,
      recording = false,
      blockRead = false,
      stopReadGestures  = false,
      clousure = false;

    var gestureCounter = 0;




    GesturezoneView.render();



    /**
     * Main Function
     */
    getListFromLocalSotorage();     // LOAD FROM LOCAL STORAGEges
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


    //Load Panels
    GesturesPanelController.start();
    SettingsPanelController.start();

  }


  // LOAD LEAP MOTION
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



  /**
   * Hand detection to remove the image detection
   * @param frame
   */
  function handDetection(frame) {
    (frame.pointables.length > 0) ?
      $(".img-detect").addClass("hide") :
      $(".img-detect").removeClass("hide")
  }


  /**
   * Debbugin function
   * @param hand
   * @param indexFinger
   */
  function debbug(hand, indexFinger) {
    // Debug
    fingerName.innerText = indexFinger.toString();                              // Distal stablish
    fingerDistance.innerText = indexFinger.touchDistance;
    fingerPosition.innerText =
      "x: " + indexFinger.stabilizedTipPosition[0] +
      ": " + indexFinger.stabilizedTipPosition[1] +
      "z: " + indexFinger.stabilizedTipPosition[2];
    fingerTipPosition.innerText = indexFinger.tipPosition;
  }




// Clear Local Storage Data and Set Defaults
  function clearDataStorage(){
    localStorage.clear();
    location.reload();
  }



  return {
    start: start
  };
})
