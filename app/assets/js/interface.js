/**
 * Han detection image manage
 * @param frame
 */
function handDetection(frame) {
  // Hand in the system
  if (frame.pointables.length > 0) {
    // POINTABLE ZONE
    //Hide info
    $(".img-detect").addClass("hide")
  }
  // Hand out of the system
  else {
    //Hide img of detection
    $(".img-detect").removeClass("hide")
    $textBox.html("");
  }
}
/**
 * List of gestures and remove elements
 */
$nameGesture.keypress(function (event) {
  if (event.keyCode == 13) {
    record();
  }
});


/**
 * Debbugin function
 * @param hand
 * @param indexFinger
 */
function debbug(hand, indexFinger) {
  // Debug
  fingerName.innerText = indexFinger.toString();                              // Distal stablish
  fingerDistance.innerText = indexFinger.touchDistance;
  fingerPosition.innerText =
    "x: " + indexFinger.stabilizedTipPosition[0] +
    "y: " + indexFinger.stabilizedTipPosition[1] +
    "z: " + indexFinger.stabilizedTipPosition[2];
  fingerTipPosition.innerText =
    "x: " + indexFinger.tipPosition[0] +
    "y: " + indexFinger.tipPosition[1] +
    "z: " + indexFinger.tipPosition[2];
}

/**
 *
 * @param indexFinger
 */
function infoBars(indexFinger) {
  // Bar touch distance
  var distance;
  if (indexFinger.tipPosition[2] < 0) {
    distance = Math.round(indexFinger.tipPosition[2] *-0.333);
    (distance >= 50) && (distance = 50);
    ballr.css("width", distance + "%");
  }
  else {
    distance = Math.round(indexFinger.tipPosition[2]* 0.333) ;
    (distance >= 50) && (distance = 50);
    balll.css("width", distance + "%");
  }

}


/**
 * Painting the shapes
 * @param square
 * @param points
 */
function paintShape() {
  // Clean the canvas every time
  $("#graphs").html('' +
    '<canvas id="square3d-xy" class="square3d" width="100" height="100"></canvas>' +
    '<canvas id="square3d-yz" class="square3d" width="100" height="100"></canvas>' +
    '<canvas id="square3d-xz" class="square3d" width="100" height="100"></canvas>'
  );
  paint("square3d-xy", getAxis(gesture, 0, 1));
  paint("square3d-xz", getAxis(gesture, 0, 2));
  paint("square3d-yz", getAxis(gesture, 1, 2));
  //changeColorBox3d();
}

/**
 * paint a 2D shape
 * @param square
 * @param points
 */
function paint(square, points) {
  var c = document.getElementById(square);
  var ctx = c.getContext("2d");

//  points = [[75,250],[75,247],[77,244],[78,242],[79,239],[80,237],[82,234],[82,232],[84,229],[85,225],[87,222],[88,219],[89,216],[91,212],[92,208],[94,204],[95,201],[96,196],[97,194],[98,191],[100,185],[102,178],[104,173],[104,171],[105,164],[106,158],[107,156],[107,152],[108,145],[109,141],[110,139],[112,133],[113,131],[116,127],[117,125],[119,122],[121,121],[123,120],[125,122],[125,125],[127,130],[128,133],[131,143],[136,153],[140,163],[144,172],[145,175],[151,189],[156,201],[161,213],[166,225],[169,233],[171,236],[174,243],[177,247],[178,249],[179,251],[180,253],[180,255],[179,257],[177,257],[174,255],[169,250],[164,247],[160,245],[149,238],[138,230],[127,221],[124,220],[112,212],[110,210],[96,201],[84,195],[74,190],[64,182],[55,175],[51,172],[49,170],[51,169],[56,169],[66,169],[78,168],[92,166],[107,164],[123,161],[140,162],[156,162],[171,160],[173,160],[186,160],[195,160],[198,161],[203,163],[208,163],[206,164],[200,167],[187,172],[174,179],[172,181],[153,192],[137,201],[123,211],[112,220],[99,229],[90,237],[80,244],[73,250],[69,254],[69,252]];
  var paintPoints = []
    for (var i in points){
      paintPoints.push([points[i].X, points[i].Y]);
  }

  var mc = multiplicatorCoefficient(paintPoints);

  c.innerHTML = "s";
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#006687';
  ctx.lineCap = 'round';

  ctx.beginPath();

  // get min and max of the shapes and rescale
  mc.minx < 0 ? mc.minx = 0 - mc.minx : mc.minx = 0;
  mc.miny < 0 ? mc.miny = 0 - mc.miny : mc.miny = 0;

  for (var i in paintPoints) {
    ctx.lineTo(
      paintPoints[i][0] * mc.mc + mc.minx,
      paintPoints[i][1] * mc.mc + mc.miny
    );
  }
  ctx.scale(1, 0.5);       // pencil effect
  ctx.width = 100;
  ctx.height = 100;

  ctx.stroke();
};

/**
 * Multiplicator coefficient
 * Get the multiplication coefficient to resice the canvas
 */
function multiplicatorCoefficient(points) {
  var coef = {}, aux = [];

  // Get the max for x
  for (var i in points) {
    aux.push(points[i][0]);
  }
  var disX = getMaxOfArray(aux);
  coef.minx = getMinOfArray(aux);


  // Get the max and min for y
  aux = [];
  for (var i in points) {
    aux.push(points[i][1]);
  }
  var disY = getMaxOfArray(aux);
  coef.miny = getMinOfArray(aux);

  // Multiplicator coefficient, wich axi is bigger?
  var biAxi;
  (disX > disY) ? biAxi = disX : biAxi = disY;

  coef.mc = PADING_CANVAS_BOX / biAxi;
  return coef;
}

/**
 * Buttons AXIS xy, xz, yz
 */


function predominantPanel(predominant){
  var sqr = "#square3d-"+ predominant;

  $.each($('#graphs canvas'), function(){
    $(this).removeClass('active');
  });
  $(sqr).addClass('active');

  $('.tab ul.tabs li').removeClass('active');
  var button = '.tab ul.tabs li a[data-axi="'+predominant+'"]';
  $(button).parent().addClass("active");
}
