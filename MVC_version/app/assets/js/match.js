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
  descomposeGesture();      // gestureAxis
  checkGesture();
}

function checkGesture(){
  // Paint the shape realiced in the squares
  paintShape();

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

/**
 * Execute IF all the listeners are finished.
 * Convert the 3 results in only one depending of the Actives Axis.
 * Keep the format of the one.result that is an object.
 *
 * key: {string} key of the object
 * result: {object} with the result for the 2D axis
 */
function calculateAvergageTrigger(key, result2D){

  // Asign the result to the object
  averageResutls[key] = result2D.ranking;

  // Detect if the rest of the triggers were shoted
  if ((read_axis.xy)&&(!averageResutls.xy)){ return; }
  if ((read_axis.xz)&&(!averageResutls.xz)){ return; }
  if ((read_axis.yz)&&(!averageResutls.yz)){ return; }

  // write results with the finalResult
  writeUIelements(calculateAverageReturns(averageResutls));
  // resset the average results when its finish
  averageResutls = {};
}

/**
 *
 * @param averageResutls {object} with the 3 (or no) axis
 * {name: "circle", score: 63.11, path: Object, ranking: Array[1]}
 */
function calculateAverageReturns(averageResutls){
  //var result = { ranking = [], score = ""}
  var ranking = {};

  $.each(averageResutls, function(k,v){
    //k = xy    -   v = [{name, score},{name, score},{name, score}];
    //k = xz    -   v = [{name, score},{name, score},{name, score}];

    for (var i in v){

      if (ranking[v[i].name]){
        var array = ranking[v[i].name];
        array.push(v[i].score);
        ranking[v[i].name] = array ;
      }
      else {
        ranking[v[i].name] = [v[i].score];
      }

    }
  })
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
    scoreList.push(v[0]);
    var li = "ul.gesture-list li#list-"+ k;
    $(li).find("span.score").html(v[0]+"%");
    $(li).removeClass("winner");
  })


  // SET THE WINNER
  var $winnerPercentage = $("#value-per").text();
  var major = getMaxOfArray(scoreList)
  var $winner;
  // Higligther winner
  if (major >= $winnerPercentage){
    var winner = 'ul.gesture-list li span:contains("'+major+'")';
    $(winner).parent().addClass("winner");

    // fire kay
    var key = $(winner).parent().find(".key").text();
    fireKey(keyToCode(key));
  }
}

/**
 * Template for 1 Dollar
 * @param gesture
 * @return Function array with the format for 1 Dollar
 * a1 and a2: x(0), y(1), z(2)
 */
function getAxis(gesture,a1, a2){
    var gestureTemplate = [];
    for (var i in gesture){
        gestureTemplate.push([
            Math.round(gesture[i][a1]),
            Math.round(gesture[i][a2])                           // 2 dimension, add the third!
        ])
    }
    //console.log("Console check: ", gestureTemplate);
    return gestureTemplate;
}


/*
 * ***********************************************************************************
 * ALGORITHM HELPERS
 * ***********************************************************************************
 */

/**
 * Get % average of results
 * @param array (document.write(average([10,2,25]));)
 * @returns {number}
 */
function average(array){
  var sum = 0;
  for (var i in array){
    sum += parseInt( array[i], 10 ); //don't forget to add the base
  }
  return Math.round(sum/array.length);
}



/**
 * Descompose geture to pass it to the algorithm
 */
function descomposeGesture(){
  if (read_axis.xy){
    gestureAxis.xy = getAxis(gesture,0,1);
  }
  if (read_axis.xz){
    gestureAxis.xz = getAxis(gesture,0,2);
  }
  if (read_axis.yz){
    gestureAxis.yz = getAxis(gesture,1,2);
  }
}

/**
 * Update algorithm data from the gesture list
 */
function updateGesturesAlgorithm(){
    // Remove gestures:

    gestureNames = getGestureNamesAlgorithm();
    // Add all the gestures (maybe again)
    $.each(gestureList, function(k, v) {
        //display the key and value pair: console.log(k + ' is ' + v);
        // k = gesture name
        // v = key and gesure
        one.add(k, getAxis(v.gesture,0,1));
        two.add(k, getAxis(v.gesture,0,2));
        three.add(k, getAxis(v.gesture,1,2));
    });
}

/**
 * Get the keys for the gestures.
 * @type {string[]}
 */
function getGestureNamesAlgorithm(){
    var names = "";
    $.each(gestureList, function(k) {
        names += k + " ";
    });
    return names;
}

/**
 * Gesture list:
 * ADD Format: one.add('circle',[[127,141],[124,140],[120,139],[...]]);
 */
function passGesturesToAlgorithm(){
    $.each(gestureList, function(k, v) {
        //display the key and value pair: console.log(k + ' is ' + v);
        one.add(k, v);
    });
}

/**
 * ***********************************************************************************
 * LOCAL STORAGE
 * ***********************************************************************************
 */
function updateLocalStorage(){
  localStorage.setItem('userGestures', JSON.stringify(gestureList));
}
// From localStorage
function getListFromLocalSotorage(){
  gestureList = JSON.parse(localStorage.getItem('userGestures')) || {};
  UIlistFromLocalStorage();
}

