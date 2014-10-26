/*
 * Variables are declared locally here once in order to minimize variable creation and lookup in the high-speed frame listener.
 */

// time (in frames) to detect if the gesture its outside of the gesture zone
const FRAMES_OLGURA = localStorage.getItem('FRAMES_OLGURA') || 5;
const PERCENTAGE_DETECTION = localStorage.getItem('PERCENTAGE_DETECTION') || 80;
const SPEED_DETECTION = localStorage.getItem('SPEED_DETECTION') || 70;
const PADING_CANVAS_BOX = 97;
// AXIS 1: xy  || 2: xy & yz || 3 xy & yz & zy
const NUM_AXIS = 1;

var hand, finger, indexFinger,
    gesture = [],                              // Actual Gesture
    gestureAxis = { xy : [], xz: [], yz: [] }, // Separate axis
    nameGesture = "",                          // Name of gesture
    gestureList = {},                          // List of gestures
    gestureNames = "",                         // Names of the gestures
    keyGesture = "",                           // Key asign to the gesture
    frameIdActual = "",                        // Keep the frame when the gesture is stoped to add clousure
    averageResutls = {},                       // Array with the average of all the results

    read_axis =
      JSON.parse(localStorage.getItem('read_axis')) ||
      { xy: true, xz: false, yz: false };

// counter to detect the gesture in the touch zone
var readingGesture = false,
    recording = false,
    blockRead = false,
    stopReadGestures  = false,
    clousure = false;

var gestureCounter = 0;

// POINTABLE ZONE
var fingerName          = document.getElementById("finger-name"),
    fingerPosition      = document.getElementById("finger-position"),
    fingerTipPosition   = document.getElementById("tip-position"),
    fingerDistance      = document.getElementById("finger-distance"),
    aceleration         = document.getElementById("aceleration"),
    info                = document.getElementById("info");

// Interface vars
var ballr          = $('#notification-square .ball-r'),
    balll          = $('#notification-square .ball-l'),
    $textBox        = $('#notification-square .text-notification'),
    notification   = $('#notification-square');

var $nameGesture= $('input#name-gesture');

// OneDollar Algorithm function OneDollar(score (80), parts, size, angle, step)
var one = new OneDollar(0, 64,250,45,2);
var two = new OneDollar(0, 64,250,45,2);
var three = new OneDollar(0, 64,250,45,2);

// Options for the sliders
var optPer = {
  min: 1,
  max: 100,
  value:PERCENTAGE_DETECTION,
  orientation: "horizontal",
  range: "min"
}
var optVel = {
  min: 1,
  max: 250,
  value:SPEED_DETECTION,
  orientation: "horizontal",
  range: "min"
}
var optClousure = {
  min: 1,
  max: 20,
  value:FRAMES_OLGURA,
  orientation: "horizontal",
  range: "min"
}

// Clear Local Storage Data and Set Defaults
function clearDataStorage(){
  localStorage.clear();
  location.reload();
}
