
/**
 * Descompose geture to pass it to the algorithm
 */
function descomposeGesture(){
    gestureAxis.xy = getAxis(gesture,0,1);
    gestureAxis.xz = getAxis(gesture,0,2);
    gestureAxis.yz = getAxis(gesture,1,2);

    //console.log("descomposeGesture: ", gestureAxis);
}


/**
 * Template for 1 Dollar
 * @param gesture
 * @return Function array with the format for 1 Dollar
 * a1 and a2: x(0), y(1), z(2)
 */
function getAxis(gesture,a1, a2, a3){
  var gestureTemplate = [];
  for (var i in gesture){

    // get all the axis in arrays
    if (a3){
      gestureTemplate.push(
        new Array(
          Math.round(gesture[i][a1]),
          Math.round(gesture[i][a2]),
          Math.round(gesture[i][a3])
        )
      )
    }
    // return the gesture for analyce in the algorithm
    else {
      gestureTemplate.push(
        new Point(
          Math.round(gesture[i][a1]),
          Math.round(gesture[i][a2])
        )
      )
    }

    //gestureTemplate.push([
    //      Math.round(gesture[i][a1]),
    //      Math.round(gesture[i][a2])                           // 2 dimension, add the third!
    //  ])
  }
  return gestureTemplate;
}


/**
 * Get the text to save in the JSON file for the gesture
 */
function getGestureStringlyfy(){
  var gesTostring = getAxis(gesture,0,1,2);
  console.log("matchGesture: ",JSON.stringify(gesTostring));
}
