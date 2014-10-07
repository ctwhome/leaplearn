/**
 * Created by ctw on 05/10/14.
 */
// time (in frames) to detect if the gesture its outside of the gesture zone
const FRAMES_OLGURA = 25;
const SPEED_DETECTION = 50;

var hand, finger, indexFinger,
    gesture = [],                       // Actual Gesture
    nameGesture = "",                   // Name of gesture
    gestureList = {},                   // list of gestures
    gestureNames = "";                  // Names of the gestures


// counter to detect the gesture in the touch zone
var readingGesture = false,
    recording = false,
    blockRead = false;

var gestureCounter = 0;

// POINTABLE ZONE
var fingerName          = document.getElementById("finger-name"),
    fingerPosition      = document.getElementById("finger-position"),
    fingerTipPosition   = document.getElementById("tip-position"),
    fingerDistance      = document.getElementById("finger-distance"),
    zoneDisplay         = document.getElementById("touch-zone"),
    aceleration         = document.getElementById("aceleration"),
    gestureMade         = document.getElementById("gesture-made"),
    info                = document.getElementById("info");

// Interface vars
var ballr    = $('#notification-square .ball-r'),
    balll    = $('#notification-square .ball-l'),
    textBox         = $('#notification-square .text-notification'),
    notification    = $('#notification-square');

var $nameGesture= $('input#name-gesture');


// OneDollar Algorithm
var one = new OneDollar();



var normalizedDisplay = document.getElementById("normPosition");
var tipDisplay = document.getElementById("tipPosition");