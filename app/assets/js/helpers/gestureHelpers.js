
/**
 * Descompose geture to pass it to the algorithm
 */
function descomposeGesture(){
    gestureAxis.xy = getAxis(gesture,0,1);
    gestureAxis.xz = getAxis(gesture,0,2);
    gestureAxis.yz = getAxis(gesture,1,2);
}

// detect predominant plane
// input gesture
// return 0, 1, 2
function predominantPlane(){

  var predominant;
  // get distances
  var x = getDistanceAxi(0);
  var y = getDistanceAxi(1);
  var z = getDistanceAxi(2);

  // get the distance in a ax
  function getDistanceAxi(axi){
    var maxd,mind,numArray =[];

    for (var i in gesture){ numArray.push(gesture[i][axi]) }
    maxd = getMaxOfArray(numArray);
    mind = getMinOfArray(numArray);
    return Math.abs(maxd-mind);
  }

  var major = function(){
    if ((x>y) && (x>z)) {return 'xy'}
    if ((y>x) && (y>z)) {return 'yz'}
    if ((z>y) && (z>x)) {return 'xz'}
  }

//  console.log("predominantPlane: ", major());
//  console.log("Distance x: ", x);
//  console.log("Distance y: ", y);
//  console.log("Distance z: ", z);
  return major();
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
  }
  return gestureTemplate;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

/**
 * Get the text to save in the JSON file for the gesture
 */
function getGestureStringlyfy(){
  var gesTostring = getAxis(gesture,0,1,2);
  //console.log("matchGesture: ",JSON.stringify(gesTostring));
}
