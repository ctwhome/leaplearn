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
function matchGesture(){
  // Data to mutch depending of the number of active axis

  // Show points of realized gestured
  //getGestureStringlyfy();

  // split the gesture in their different axis
  descomposeGesture();      // get gestureAxis

  // Match the gestures and keep in an array

  checkGesture();

  // get the average gestures and the winner

  //
  //
  //addToevaluationGesture();
  //
  //
  //
}

function checkGesture(){
  // Paint the shape realiced in the squares
  paintShape();

  // Match the gestures
  var resultMatch = {
    "xy" : read_axis.xy && xy_algo.Recognize(gestureAxis.xy, false),    // true or false for PORTACTOR
    "xz" : read_axis.xz && xz_algo.Recognize(gestureAxis.xz, false),    // true or false for PORTACTOR
    "yz" : read_axis.yz && yz_algo.Recognize(gestureAxis.yz, false)     // true or false for PORTACTOR
  }
  console.log("Gestos matched: ", resultMatch);

  // write results with the finalResult
  //writeUIelements(resultMatch.xy);
  writeUIelements(calculateAverageReturns(resultMatch));
  // resset the average results when its finish
}

/**
 *
 * @param averageResutls {object} with the 3 (or no) axis
 * {name: "circle", score: 63.11, path: Object, ranking: Array[1]}
 */
function calculateAverageReturns(resultMatch){
  //var result = { ranking = [], score = ""}
  var ranking = {},
      axis=0;

  //console.log("calculateAverageReturns: ", (typeof ranking[v.Name] === 'undefined'));
  // Getting the average for all the axis
  read_axis.xy && $.each(resultMatch.xy, function(k,v){(typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});
  read_axis.xz && $.each(resultMatch.xz, function(k,v){ (typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});
  read_axis.yz && $.each(resultMatch.yz, function(k,v){ (typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});

  // Num axis active
  resultMatch.xy && axis ++; resultMatch.xz && axis ++; resultMatch.yz && axis ++;
  $.each(ranking, function(k){
    ranking[k] = Math.round(ranking[k] / axis);
  });

  return ranking;
};


/**
 * Write elements in the list (depending of the average)
 * @param result
 * info.innerHTML = result.name+' ('+result.score+'%)';
 */
function writeUIelements(ranking){

  var scoreList = [];
  //Paint results in % into the list
  $.each(ranking, function(k,v){
    !isNaN(v) && scoreList.push(v);
    var li = "ul.gesture-list li#list-"+ k;
    !isNaN(v) ? $(li).find("span.score").html(v+ "%") : $(li).find("span.score").html("0%") ;
  })

  // WINNER If there is a Winner:
  var $winnerPercentage = $("#value-per").text();
  var major = getMaxOfArray(scoreList)
  $('ul.gesture-list li').removeClass("winner");

  // Higligther winner
  if (major >= $winnerPercentage){
    var winner = 'ul.gesture-list >li span:contains("'+major+'")';

    $(winner).parent().addClass("winner");

    // fire kay
    var key = $(winner).parent().find(".key").text();
    fireKey(keyToCode(key));
  }
}
