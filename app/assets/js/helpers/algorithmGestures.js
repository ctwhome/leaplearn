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
    /**
     * Display the key and value pair: console.log(k + ' is ' + v);
     * k = gesture name
     * v = key, gesure and predominant
     */

    //Only add to the gestures in the predominant plane
      switch(v.predominant) {
        case  "xy" : xy_algo.AddGesture(k, getAxis(v.gesture,0,1)); break;
        case  "xz" : xz_algo.AddGesture(k, getAxis(v.gesture,0,2)); break;
        case  "yz" : yz_algo.AddGesture(k, getAxis(v.gesture,1,2)); break;
      }
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
