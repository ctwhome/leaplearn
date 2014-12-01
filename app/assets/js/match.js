/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 26/09/14, 11:25.
 *
 * Match gestures
 * ---------------------
 */

/**
 * ***********************************************************************************
 * Match Gesture 2D & 3D
 * @param gestureToCheck {array}
 * ***********************************************************************************
 */



/**
 * Match gesture
 */
function matchGesture(){
  var predominant = predominantPlane();
  // Data to mutch depending of the number of active axis

  // Show points of realized gestured
  getGestureStringlyfy()


  // split the gesture in their different axis
  descomposeGesture();      // get gestureAxis

  // Match the gestures and keep in an array
  checkGesture(predominant);

  // activate predominant panel buttons in the interface
  predominantPanel(predominant);
}


function checkGesture(predominant){
  predominant = predominant || "xy";
  // Paint the shape realiced in the squares
  paintShape();

  // Match the gestures

  if (algoOriginal){
    var resultMatch ={};
    switch(predominant) {
      case  "xy" : resultMatch.xy = xy_algo.Recognize(gestureAxis.xy, useProtractor); break;
      case  "xz" : resultMatch.xz = xz_algo.Recognize(gestureAxis.xz, useProtractor); break;
      case  "yz" : resultMatch.yz = yz_algo.Recognize(gestureAxis.yz, useProtractor); break;
    }
//    var resultMatch = {
//      "xy" : read_axis.xy && xy_algo.Recognize(gestureAxis.xy, useProtractor),    // true or false for PORTACTOR
//      "xz" : read_axis.xz && xz_algo.Recognize(gestureAxis.xz, useProtractor),    // true or false for PORTACTOR
//      "yz" : read_axis.yz && yz_algo.Recognize(gestureAxis.yz, useProtractor)     // true or false for PORTACTOR
//    }
  }
  else{
    // Call to the Algorithm for the diferents axis
    if (read_axis.xy){ one.check(gestureAxis.xy) }
    if (read_axis.xz){ two.check(gestureAxis.xz) }
    if (read_axis.yz){ three.check(gestureAxis.yz) }

    // Axis listeners
    one.on(gestureNames, function(result){
      calculateAvergageTrigger("xy", result);
    });
    two.on(gestureNames, function(result){
      calculateAvergageTrigger("xz", result)
    });
    three.on(gestureNames, function(result){
      calculateAvergageTrigger("yx", result);
    });

  }






//console.log("Gestos matched: ", resultMatch);


  // Match Predominant plane
  // write results with the finalResult

  //writeUIelements(resultMatch.xy);


  algoOriginal ?
    writeUIelements(resultMatch[predominant]) :
    writeUIelements(resultMatch);



  //  writeUIelements(calculateAverageReturns(resultMatch));
  // resset the average results when its finish
}


/**
 * Write elements in the list (depending of the average)
 * @param result
 * info.innerHTML = result.name+' ('+result.score+'%)';
 */
function writeUIelements(ranking){
  $('ul.gesture-list >li span.score').html("");

  var scoreList = [];
  //Paint results in % into the list
  $.each(ranking, function(k,v){
    scoreList.push(v.Score);
    var li = "ul.gesture-list li#list-"+ v.Name;
    var value = !isNaN(v.Score) ? useProtractor ? Math.round(v.Score*1000)/1000 : Math.round(v.Score*1000)/10+ "%" : useProtractor ? 0 : 0+ "%";
    $(li).find("span.score").html(value);
  })

  // WINNER If there is a Winner:
  var $winnerPercentage = $("#value-per").text();
  var major = useProtractor ? Math.round(getMaxOfArray(scoreList)*1000)/1000 : Math.round(getMaxOfArray(scoreList)*1000)/10+ "%"



  $('ul.gesture-list li').removeClass("winner");
    // Higligther winner
    useProtractor ? setWinner(): (major >= $winnerPercentage) && setWinner();


    function setWinner(){
      var winner = 'ul.gesture-list >li span:contains("'+major+'")';
      $(winner).parent().addClass("winner");
      // fire kay
      var key = $(winner).parent().find(".key").text();
      fireKey(keyToCode(key));
    }
}
