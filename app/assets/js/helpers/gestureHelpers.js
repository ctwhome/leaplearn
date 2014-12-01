
/**
 * Descompose geture to pass it to the algorithm
 */
function descomposeGesture(){
    gestureAxis.xy = getAxis(gesture,0,1);
    gestureAxis.xz = getAxis(gesture,0,2);
    gestureAxis.yz = getAxis(gesture,1,2);

    //console.log("descomposeGesture: ", gestureAxis);
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
//  switch (major()){
//    case 'x': predominant = "xy"
//      break;
//    case 'y': predominant = "yz"
//      break;
//    case 'z': predominant = "xz"
//      break;
//  }
  console.log("predominantPlane: ", major());
  console.log("Distance x: ", x);
  console.log("Distance y: ", y);
  console.log("Distance z: ", z);


  return major();


//    console.log("x: ", x);
//    console.log("y: ", y);
//    console.log("z: ", z);


  // Detection of long distances like rects
  // z es mayor que 2 veces las otras
//  if ((z > 2*y) && (z > 2*x)){
//   // return "xz"
//  }
//
//  // x es mayor que 2 veces las otras
//  if ((x > 2*y) && (x > 2*z)){
//    return "xy"
//  }
//    else {
//  // x es la menor
//    if ((x < y) && (x < z)){
//      return "yz"
//    }
//  }
//
//  //  // x es la menor
//  if ((x < y) && (x < z)){ return "yz"}
//
//  // y es la menor
//  if ((y < x) && (y < z)){ return "xz"}
//
//  // z es la menor
//  if ((z < y) && (z < x)){ return "xy"}


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



function moveCoeficient(points) {
  var move = [], minx, miny;

  return move;
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
  console.log("matchGesture: ",JSON.stringify(gesTostring));
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

  // Getting the average for all the axis
  read_axis.xy && $.each(resultMatch.xy, function(k,v){ (typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});
  read_axis.xz && $.each(resultMatch.xz, function(k,v){ (typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});
  read_axis.yz && $.each(resultMatch.yz, function(k,v){ (typeof ranking[v.Name] === 'undefined') ? ranking[v.Name] = Number(v.Score) : ranking[v.Name] += Number(v.Score)});

  // Num axis active
  resultMatch.xy && axis ++; resultMatch.xz && axis ++; resultMatch.yz && axis ++;
  $.each(ranking, function(k){
    ranking[k] = useProtractor ? Math.round(ranking[k] / axis*1000)/1000 : Math.round(ranking[k] / axis*1000)/10;
  });

  return ranking;
};
