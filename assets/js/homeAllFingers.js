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



var output = document.getElementById('output');
var frameString = "", handString = "", fingerString = "";
var hand, finger, indexFinger;

var fpsDisplay = document.getElementById('leapFPS');
var handCountDisplay = document.getElementById('handCount');
var pointableCountDisplay = document.getElementById('pointableCount');
var fingerCountDisplay = document.getElementById('fingerCount');
var toolCountDisplay = document.getElementById('toolCount');
var gestureCountDisplay = document.getElementById('gestureCount');

// POINTABLE ZONE
var zoneDisplay = document.getElementById("zone");

// Leap.loop uses browser's requestAnimationFrame
var options = {
    enableGestures: false,
    frameEventName: "animationFrame"
};



/**
 * The LEAP LOOP
 */


Leap.loop(options, function(frame) {

    //$(".dev").html();

    //Hide img of detection
    $(".img-detect").removeClass("hide")

    // POINTABLE ZONE
    if(frame.pointables.length > 0)
    {
        var touchZone = frame.pointables[0].touchZone;
        zoneDisplay.innerText = touchZone;

        //Hide info
        $(".img-detect").addClass("hide")
    }


    // TABLE INFO



    fpsDisplay.innerText = frame.currentFrameRate;
    handCountDisplay.innerText = frame.hands.length;
    pointableCountDisplay.innerText = frame.pointables.length;
    fingerCountDisplay.innerText = frame.fingers.length;
    toolCountDisplay.innerText = frame.tools.length;
    gestureCountDisplay.innerText = frame.gestures.length;
     // Show image



    frameString = concatData("frame_id", frame.id);
    frameString += concatData("num_hands", frame.hands.length);
    frameString += concatData("num_fingers", frame.fingers.length);
    frameString += concatData("finguer", frame.fingers.index);




    
    /**
     * If the finger is hovering
     */
    var pointable = frame.pointables[0];

    frameString += pointable;
//    if (pointable.touchZone == "hovering") {
//        frameString += concatData("Pointable hovering");
////            tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .2);
////            tips[tipPointer].setFillRGB({r: 0, g: 128, b: 0});
//    }

    //$(".dev").html(pointable.touchDistance);
//    console.log(frame.pointables[0].touchDistance);


    //var position = finger.mcpPosition;
    //console.table(position);

   // console.table(["name", "paradigm"]);


    frameString += "<br>";
    frameString += "<br>";
    frameString += "<br>";


    // Showcase some new V2 features
    for (var i = 0, len = frame.hands.length; i < len; i++) {




        hand = frame.hands[i];
        handString = concatData("hand_type", hand.type);
        handString += concatData("confidence", hand.confidence);
        handString += concatData("pinch_strength", hand.pinchStrength);
        handString += concatData("grab_strength", hand.grabStrength);

        handString += '<br>';

        // Helpers for thumb, pinky, etc.
        fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);
        for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
            finger = hand.fingers[j];
            indexFinger = hand.fingers[0];
            console.log("Console check: ", indexFinger.touchDistance);


            fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>";
            fingerString += concatJointPosition("finger_dip", finger.dipPosition);
            fingerString += concatJointPosition("finger_pip", finger.pipPosition);
            fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
            fingerString += "<br>";
        }

        frameString += handString;
        frameString += fingerString;
    }

    output.innerHTML = frameString;

})
    //This plugin is used to send pre-recorded Leap frame data in to any Leap App.
//            .use('playback', {
//                recording: 'recorder/recordings/waiting-short.json.lz',
//                requiredProtocolVersion: 6,
//                pauseOnHand: true,
//                loop: true
//            })
    .use('riggedHand');


window.controller = Leap.loopController;



function concatData(id, data) {
    return id + ": " + data + "<br>";
}

function getFingerName(fingerType) {
    switch(fingerType) {
        case 0:
            return 'Thumb';
            break;

        case 1:
            return 'Index';
            break;

        case 2:
            return 'Middle';
            break;

        case 3:
            return 'Ring';
            break;

        case 4:
            return 'Pinky';
            break;
    }
}

function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}



