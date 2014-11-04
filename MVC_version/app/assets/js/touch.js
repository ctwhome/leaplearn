/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * touch.js
 * ---------------------
 * Main page touchs
 */

var link_playrecorder = "home.html";
    /**
     * Buttons
     */

     // Entrar
    var entranceButton = area("#entranceButton");
    //var helpButton = area("#helpButton");
    var backToHomeButton = area("#backToHomeButton");

    //console.log("Console check: ", helpButton);
    console.log("Console check: ", backToHomeButton);

//
//
    // helpButton
    //var $helpButton = $("#helpButton").offset();
    //var helpButtonY = $helpButton.top - $(window).scrollTop();
    //var helpButtonX = $helpButton.left - $(window).scrollLeft();

    // Button Home
    var backToHomeButton = $("#backToHomeButton").offset();




  //console.log("offset: ", ("#backToHomeButton").offset());
    var backToHomeButtonY = backToHomeButton.top - $(window).scrollTop();
    var backToHomeButtonX = backToHomeButton.left - $(window).scrollLeft();

    /**
     * Touch
     */
    var stageWidth = 1024;
    var stageHeight = 768;

    var tips = new Array(10);

    var stage = new Kinetic.Stage({
        container: 'stage',
        width: stageWidth,
        height: stageHeight
    });

    var leap = new Leap.Controller();
    leap.connect();

    var layer = new Kinetic.Layer();

//Make ten circles to use as finger tips
    for (var t = 0; t < 10; t++) {
        var tip = new Kinetic.Circle({
            x: 239,
            y: 75,
            radius: 20,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            opacity: .5,
            visible: false
        });
        tips[t] = tip;
        layer.add(tip);
    }

// add the layer to the stage
    stage.add(layer);

    var anim = new Kinetic.Animation(function (frame) {
        var time = frame.time,
            timeDiff = frame.timeDiff,
            frameRate = frame.frameRate;

        // update finger tip display with data from latest frame
        var tipPointer = 0;
        var leapFrame = leap.frame();

//    console.log("Console check: ", leapFrame);

        if (leapFrame.valid) {
            var iBox = leapFrame.interactionBox;
            for (var p = 0; p < leapFrame.pointables.length; p++) {
                var pointable = leapFrame.pointables[p];
                var pos = iBox.normalizePoint(pointable.tipPosition, true);
                tips[tipPointer].setX(pos[0] * stageWidth);
                tips[tipPointer].setY(stageHeight - pos[1] * stageHeight);
                tips[tipPointer].setVisible(true);


                var nameMap = ["thumb", "index", "middle", "ring", "pinky"];


                if (pointable.touchZone == "hovering") {
                    tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .2);
                    tips[tipPointer].setFillRGB({r: 0, g: 128, b: 0});


                }
                else if (pointable.touchZone == "touching") {
                    tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .5);
                    tips[tipPointer].setFillRGB({r: 128, g: 0, b: 0});

                    // INDEX FINGER
                    if (pointable.type === 1){
                        touchButton( tips[tipPointer].attrs.x,  tips[tipPointer].attrs.y);

                    }
                }
                else {
                    tips[tipPointer].setOpacity(.1);
                    tips[tipPointer].setFillRGB({r: 0, g: 0, b: 128});
                }
                if (tipPointer < 9) tipPointer++;
            }
            while (tipPointer <= 9) tips[tipPointer++].setVisible(false);
        }
    }, layer);

    anim.start();

    /**
     * Range
     * @param x
     * @param min
     * @param max
     * @returns {boolean}
     */
    function between(x, min, max) {
        return x >= min && x <= max;
    }


    /**
     * Click button
     *
     * @param posX
     * @param posY
     */
    function touchButton(posX, posY){

        $('#postionfinger').html(
                'PosX: '+posX+' <br/> PosY: '+ posY

        );

        if (between(posX, entranceButton.left, entranceButton.right) && between(posY, entranceButton.top, entranceButton.bottom)) {
            window.location.href = link_playrecorder;
        }

        //if (between(posX, helpButton.left, helpButton.right) && between(posY, helpButton.top, helpButton.bottom)) {
        //    $('.index-content').addClass('hide');
        //    $('.help-content').removeClass('hide');
        //}

        if (between(posX, backToHomeButton.left, backToHomeButton.right) && between(posY, backToHomeButton.top, backToHomeButton.bottom)) {
            $('.help-content').addClass('hide');
            $('.index-content').removeClass('hide');
        }
    }



    /**
     * Position top, left, bottom, right
     * @param {string} id
     * return array
     */
    function area(id){
        var div = $(id).position();                           // return an object
        var verLeft= div.left - $('body').scrollLeft();
        var verTop = div.top - $('body').scrollTop();
        var verRight = verLeft + $("#entranceButton").width()+ 30;
        var verBottom = verTop + $("#entranceButton").height() + 20;

        return {
            top: verTop,
            right: verRight,
            bottom:verBottom,
            left: verLeft
        }
    }





function changePages(e){
    if (e.currentTarget.getAttribute('data-button') === "help"){
        $('.index-content').addClass('hide');
        $('.help-content').removeClass('hide');
    }
    else{
        $('.help-content').addClass('hide');
        $('.index-content').removeClass('hide');
    }
}



