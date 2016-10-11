
String.prototype.repeat = function(num) {
  return new Array(num + 1).join(this);
};


/**
 * Add line of dots
 * @param amount
 * @returns {*}
 */
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = "";
        //, segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };


  // Asign variables to the interface
  $('#value-per').html(optPer.value);
  $('#value-clousure').html(optClousure.value);
  $('#value-vel').html(optVel.value);

  /**
   *  Percentage
   */
    var $percentage = $("#per-detection");
    if ($percentage.length) {
      $percentage.slider(optPer).addSliderSegments($percentage.slider("option").max);
    }
    $percentage.slider().bind('slide',function(event,ui){
      $('#value-per').html(ui.value);
      // update local Storage
      localStorage.setItem("PERCENTAGE_DETECTION", ui.value )
    });

   /**
   *  Velocity
   */
    var $slider = $("#velocity-bar");
    if ($slider.length) {
      $slider.slider(optVel).addSliderSegments($slider.slider("option").max);
    }
    $slider.slider().bind('slide',function(event,ui){
      $('#value-vel').html(ui.value);
      // update local Storage
      localStorage.setItem("SPEED_DETECTION", ui.value )
});

/**
 * Cousure
 */
var $clousure = $("#clousere-bar");
if ($clousure.length) {
  $clousure.slider(optClousure).addSliderSegments($clousure.slider("option").max);
}

$clousure.slider().bind('slide',function(event,ui){
  $('#value-clousure').html(ui.value);
  // update local Storage
  localStorage.setItem("FRAMES_OLGURA", ui.value )
});
