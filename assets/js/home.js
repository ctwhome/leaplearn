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
    fingerPosition  = document.getElementById("finger-position"),
    fingerTipPosition     = document.getElementById("tip-position"),
    fingerDistance  = document.getElementById("finger-distance"),
    zoneDisplay     = document.getElementById("touch-zone");

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


// Screen position
    window.cursor = $('#cursor');
    window.output = $('#output');


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
        indexFinger = hand.fingers[1];                                          // Index finger

//      fingerDistance.innerText = indexFinger.touchDistance;
        fingerName.innerText = indexFinger.toString();                         // Distal stablish
        fingerDistance.innerText = indexFinger.touchDistance;
        fingerPosition.innerText =
            "\nx: "+indexFinger.stabilizedTipPosition[0] +
            "\ny: "+indexFinger.stabilizedTipPosition[1] +
            "\nz: "+indexFinger.stabilizedTipPosition[2];
        fingerTipPosition.innerText = indexFinger.tipPosition;
        //console.log("Console check: ", indexFinger);



        // Normalize position
        var pointable = frame.pointables[1];

        var interactionBox = frame.interactionBox;
        var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
        var tipPosition = pointable.tipPosition;
        normalizedDisplay.innerText =
            "\nx: " + normalizedPosition[0]
            +", \ny: "+ normalizedPosition[1]
            +", \nz: "+ normalizedPosition[2]
            +"\n Normalize position to String: "+ interactionBox.toString();




//
//        /**
//         * Screen Position
//         */
//        var screenPosition = hand.screenPosition(hand.palmPosition);
//
//        var outputContent = "x: " + (screenPosition[0].toPrecision(4)) + 'px' +
//            "        <br/>y: " + (screenPosition[1].toPrecision(4)) + 'px' +
//            "        <br/>z: " + (screenPosition[2].toPrecision(4)) + 'px';
//        // hide and show the cursor in order to get second-topmost element.
//        cursor.hide();
//        var el = document.elementFromPoint(
//            hand.screenPosition()[0],
//            hand.screenPosition()[1]
//        );
//        cursor.show();
//
//        if (el){
//            outputContent += '<br>Topmost element: '+ el.tagName + ' #' + el.id +  ' .' + el.className;
//        }
//
//        output.html(outputContent);
//
//        cursor.css({
//            left: screenPosition[0] + 'px',
//            top:  screenPosition[1] + 'px'
//        });
//        // End Screen Position


        // Call to the graphic zone
        barDistance(indexFinger.touchDistance);
        //var screenPosition = hand.screenPosition(hand.palmPosition);
        //barDistance(screenPosition[2].toPrecision(4));




    }
})
    //Ussing plugins
    .use('riggedHand')                  // Render 3d hands
    .use('screenPosition', {            // Screen Position
        scale: 1
    })


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
    console.log("Console check: ", distance);
}

