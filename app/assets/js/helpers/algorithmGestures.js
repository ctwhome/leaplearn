/*
 * ***********************************************************************************
 * ALGORITHM HELPERS
 * ***********************************************************************************
 */


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

    xy_algo.AddGesture(k, getAxis(v.gesture,0,1));
    xz_algo.AddGesture(k, getAxis(v.gesture,0,2));
    yz_algo.AddGesture(k, getAxis(v.gesture,1,2));

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
