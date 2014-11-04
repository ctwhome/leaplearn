/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 26/09/14, 11:25.
 *
 * Graph generator
 * ---------------------
 */

/**
 * See Stats
 */
function seeStats(){
 $('#modal-stats').modal('show');
  drawStats();
}

/**
 * Draw bars
 */
function drawStats(){
  $('#stats').html("");
//Width height and margin
  var margin = {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0
    },
    w = 500 - margin.left - margin.right,
    h = 150 - margin.top - margin.bottom;
  barPadding = 1;

  var dataset = [ 25, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 25, 25 ];
// checking the largest value of array and basing all bar height off it
// essentially setting max value as 100% of graph height etc
  maxVal = Math.max.apply(Math,dataset);
  var pixMax = h/maxVal;
  $.each(dataset,function(i) {
    dataset[i] = Math.round(dataset[i] * pixMax);
    window.console.log(dataset[i]);
  });
//Create SVG element
  var svg = d3.select("#stats")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")

    .attr("y", function(d) { // SET THE Y origin as 1px from the bottom of the SVG
      return h - 1;
    })
    .attr("height", function() { // Set initial height of bars to animate from
      return 1;
    })
    .transition()
// add a delay of .5 seconds that increases by multiple of iteration (i multiplied by 200) ie each bar is .2 of a second after the last
    .delay(function(d, i){
      delayBuild = 100 + (i * 100);
      return delayBuild;
    })
    .ease('elastic') // adds the bounce effect to the animation
    .duration(4000) // time of transition/animation
    .attr("x", function(d, i) {
      return i * (w / dataset.length);
    })
    .attr("y", function(d) {
      return h + margin.top - d;
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
      return d;
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d * 10) + ")";
    })
    .style({
      stroke: "none",
      fill: "steelblue"
    });

  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
      return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    })
    .attr("y", function(d) {
      return h + margin.top - d + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}
