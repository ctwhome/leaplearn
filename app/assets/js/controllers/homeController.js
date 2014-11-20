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

define([
  'views/HomeView',
  'kinetic'
  ],function(
  HomeView,
  Kinetic){

  this.settings = {
    "gestureZone" : "#gesturezone"
  }

  /**
   * Start funciton
   */
  function start() {
    HomeView.render();
    bindtouchzonne();
  }

  function bindtouchzonne(){

    this.settings.entranceButton = area("#entranceButton");

    var stageWidth = 1024,
        stageHeight = 768,
        tips = new Array(10),
    stage = new Kinetic.Stage({
      container: 'stage',
      width: stageWidth,
      height: stageHeight
    }),
    leap = new Leap.Controller();


    leap.connect();

    var layer = new Kinetic.Layer();

//Make ten circles to use as finger tips
    for (var t = 0; t < 10; t++) {
      var tip = new Kinetic.Circle({x: 239, y: 75, radius: 20, fill: 'green', stroke: 'black', strokeWidth: 4, opacity: .5, visible: false});
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

      if (leapFrame.valid) {
        var iBox = leapFrame.interactionBox;
        for (var p = 0; p < leapFrame.pointables.length; p++) {
          var pointable = leapFrame.pointables[p];
          var pos = iBox.normalizePoint(pointable.tipPosition, true);
          tips[tipPointer].setX(pos[0] * stageWidth);
          tips[tipPointer].setY(stageHeight - pos[1] * stageHeight);
          tips[tipPointer].setVisible(true);

          //var nameMap = ["thumb", "index", "middle", "ring", "pinky"];

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

    // Detect button position
    if (between(posX, this.settings.entranceButton.left, this.settings.entranceButton.right) && between(posY, this.settings.entranceButton.top, this.settings.entranceButton.bottom)) {
      window.location.href = this.settings.gestureZone;
    }

  }


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
   * Position top, left, bottom, right
   * @param {string} id
   * return array
   */
  function area(id){
    var div = $(id).position(); // return an object

    var verLeft = div.left - $('body').scrollLeft();

    var verTop = div.top - $('body').scrollTop();
    var verRight = verLeft + $(id).width()+ 30;
    var verBottom = verTop + $(id).height() + 20;

    return {
      top: verTop,
      right: verRight,
      bottom:verBottom,
      left: verLeft
    }
  }

  return {
    start:start
  };
})
