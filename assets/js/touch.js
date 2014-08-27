/**
 * Created by ctw on 27/08/14.
 */
var stageWidth = 1200;
var stageHeight = 900;

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
    if (leapFrame.valid) {
    var iBox = leapFrame.interactionBox;
    for (var p = 0; p < leapFrame.pointables.length; p++) {
    var pointable = leapFrame.pointables[p];
    var pos = iBox.normalizePoint(pointable.tipPosition, true);
    tips[tipPointer].setX(pos[0] * stageWidth);
    tips[tipPointer].setY(stageHeight - pos[1] * stageHeight);
    tips[tipPointer].setVisible(true);
    if (pointable.touchZone == "hovering") {
    tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .2);
    tips[tipPointer].setFillRGB({r: 0, g: 128, b: 0});
    } else if (pointable.touchZone == "touching") {
    tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .5);
    tips[tipPointer].setFillRGB({r: 128, g: 0, b: 0});
    } else {
    tips[tipPointer].setOpacity(.1);
    tips[tipPointer].setFillRGB({r: 0, g: 0, b: 128});
    }
    if (tipPointer < 9) tipPointer++;
    }
    while (tipPointer <= 9) tips[tipPointer++].setVisible(false);
    }
    }, layer);

anim.start();