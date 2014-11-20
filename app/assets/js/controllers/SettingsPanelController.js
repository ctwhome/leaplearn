/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * touch.js
 * ---------------------
 * Main page touchs
 */

define([
  'views/SettingsPanelView',
], function (settingsPanelView) {


  this.param = {}


// Options for the sliders
  var optPer = {
    min        : 1,
    max        : 100,
    value      : PERCENTAGE_DETECTION,
    orientation: "horizontal",
    range      : "min"
  }
  var optVel = {
    min        : 1,
    max        : 250,
    value      : SPEED_DETECTION,
    orientation: "horizontal",
    range      : "min"
  }
  var optClousure = {
    min        : 1,
    max        : 20,
    value      : FRAMES_OLGURA,
    orientation: "horizontal",
    range      : "min"
  }


  // Interface vars
  var ballr = $('#notification-square .ball-r'),
      balll = $('#notification-square .ball-l'),
      $textBox = $('#notification-square .text-notification'),
      notification = $('#notification-square');

  var $nameGesture = $('input#name-gesture');


// OneDollar Algorithm function OneDollar(score (80), parts, size, angle, step)
  var one = new OneDollar(0, 64,250,45,2);
  var two = new OneDollar(0, 64,250,45,2);
  var three = new OneDollar(0, 64,250,45,2);





  /**
   * Start funciton
   */
  function start() {
    settingsPanelView.render();
  }


  /**
   *
   * @param indexFinger
   */
  function infoBars(indexFinger) {
    // Bar touch distance
    var distance;
    if (indexFinger.touchDistance < 0) {
      distance = Math.round(indexFinger.touchDistance * -50) + "%";
      ballr.css("width", distance);
    }
    else {
      distance = Math.round(indexFinger.touchDistance * 50) + "%";
      balll.css("width", distance);
    }
  }


  /**
   * Buttons AXIS xy, xz, yz
   */
  (function () {

    // Load defaults or from localStorage
    $.each(read_axis, function (k, v) {

      if (v) {
        var data = '[data-axi="' + k + '"]';
        $('.tab ul.tabs li a').filter(data).parent().addClass("active");
        $('#graphs canvas').filter(data).addClass("active");
      }

      $('.tab ul.tabs li a').click(function (e) {
        e.preventDefault();

        var data = $(e.currentTarget).data('axi');
        var $buton = $(e.currentTarget).parent();

        if ($buton.hasClass('active')) {
          $buton.removeClass('active');
          read_axis[data] = false;
        }
        else {
          $buton.addClass('active');
          read_axis[data] = true;
        }
        changeColorBox3d();
        // Set Local Storage
        localStorage.setItem('read_axis', JSON.stringify(read_axis));
      });
    })
  })();

  function changeColorBox3d() {
    $.each($('#graphs canvas'), function () {
      $(this).removeClass('active');
    });
    if (read_axis.xy) {
      $('#square3d-xy').addClass('active')
    }
    if (read_axis.xz) {
      $('#square3d-xz').addClass('active')
    }
    if (read_axis.yz) {
      $('#square3d-yz').addClass('active')
    }
  }

  /**
   * Han detection image manage
   * @param frame
   */
  $nameGesture.keypress(function (event) {
    if (event.keyCode == 13) {
      record();
    }
  });


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
      ": " + indexFinger.stabilizedTipPosition[1] +
      "z: " + indexFinger.stabilizedTipPosition[2];
    fingerTipPosition.innerText = indexFinger.tipPosition;
  }

  /**
   *
   * @param indexFinger
   */
  function infoBars(indexFinger) {
    // Bar touch distance
    var distance;
    if (indexFinger.touchDistance < 0) {
      distance = Math.round(indexFinger.touchDistance * -50) + "%";
      ballr.css("width", distance);
    }
    else {
      distance = Math.round(indexFinger.touchDistance * 50) + "%";
      balll.css("width", distance);
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
      '<canvas id="square3d-xz" class="square3d" width="100" height="100"></canvas>' +
      '<canvas id="square3d-yz" class="square3d" width="100" height="100"></canvas>'
    );

    changeColorBox3d();

    paint("square3d-xy", getAxis(gesture, 0, 1));
    paint("square3d-xz", getAxis(gesture, 0, 2));
    paint("square3d-yz", getAxis(gesture, 1, 2));
  }

  /**
   * paint a 2D shape
   * @param square
   * @param points
   */
  function paint(square, points) {
    var c = document.getElementById(square);
    var ctx = c.getContext("2d");

    //var points = [[75,250],[75,247],[77,244],[78,242],[79,239],[80,237],[82,234],[82,232],[84,229],[85,225],[87,222],[88,219],[89,216],[91,212],[92,208],[94,204],[95,201],[96,196],[97,194],[98,191],[100,185],[102,178],[104,173],[104,171],[105,164],[106,158],[107,156],[107,152],[108,145],[109,141],[110,139],[112,133],[113,131],[116,127],[117,125],[119,122],[121,121],[123,120],[125,122],[125,125],[127,130],[128,133],[131,143],[136,153],[140,163],[144,172],[145,175],[151,189],[156,201],[161,213],[166,225],[169,233],[171,236],[174,243],[177,247],[178,249],[179,251],[180,253],[180,255],[179,257],[177,257],[174,255],[169,250],[164,247],[160,245],[149,238],[138,230],[127,221],[124,220],[112,212],[110,210],[96,201],[84,195],[74,190],[64,182],[55,175],[51,172],[49,170],[51,169],[56,169],[66,169],[78,168],[92,166],[107,164],[123,161],[140,162],[156,162],[171,160],[173,160],[186,160],[195,160],[198,161],[203,163],[208,163],[206,164],[200,167],[187,172],[174,179],[172,181],[153,192],[137,201],[123,211],[112,220],[99,229],[90,237],[80,244],[73,250],[69,254],[69,252]];
    var mc = multiplicatorCoefficient(points);

    c.innerHTML = "s";
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#006687';
    ctx.lineCap = 'round';

    ctx.beginPath();

    if (mc.minx < 0) {
      mc.minx = 0 - mc.minx
    } else {
      mc.minx = 0
    }
    if (mc.miny < 0) {
      mc.miny = 0 - mc.miny
    } else {
      mc.miny = 0
    }

    for (var i in points) {
      ctx.lineTo(points[i][0] * mc.mc + mc.minx, points[i][1] * mc.mc + mc.miny);
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
    var coef = {},
      aux = [],
      dx, dy;

    // Get the max for x
    for (var i in points) {
      aux.push(points[i][0]);
    }
    disX = getMaxOfArray(aux);
    coef.minx = getMinOfArray(aux);

    // Get the max and min for y
    aux = [];
    for (var i in points) {
      aux.push(points[i][1]);
    }
    disY = getMaxOfArray(aux);
    coef.miny = getMinOfArray(aux);

    // Multiplicator coefficient, what axi is bigger
    var mc = 0;
    if (disX > disY) {
      mc = disX
    } else {
      mc = disY
    }
    coef.mc = PADING_CANVAS_BOX / mc;

//    console.log("Console check: ", coef);
    return coef;
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
   * Buttons AXIS xy, xz, yz
   */
  (function () {

    // Load defaults or from localStorage
    $.each(read_axis, function (k, v) {

      if (v) {
        var data = '[data-axi="' + k + '"]';
        $('.tab ul.tabs li a').filter(data).parent().addClass("active");
        $('#graphs canvas').filter(data).addClass("active");
      }

      $('.tab ul.tabs li a').click(function (e) {
        e.preventDefault();

        var data = $(e.currentTarget).data('axi');
        var $buton = $(e.currentTarget).parent();

        if ($buton.hasClass('active')) {
          $buton.removeClass('active');
          read_axis[data] = false;
        }
        else {
          $buton.addClass('active');
          read_axis[data] = true;
        }
        changeColorBox3d();
        // Set Local Storage
        localStorage.setItem('read_axis', JSON.stringify(read_axis));
      });
    })
  })();

  function changeColorBox3d() {
    $.each($('#graphs canvas'), function () {
      $(this).removeClass('active');
    });
    if (read_axis.xy) {
      $('#square3d-xy').addClass('active')
    }
    if (read_axis.xz) {
      $('#square3d-xz').addClass('active')
    }
    if (read_axis.yz) {
      $('#square3d-yz').addClass('active')
    }
  }


  return {
    start: start
  };
})
