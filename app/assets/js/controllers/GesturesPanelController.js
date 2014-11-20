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
  'views/GesturesPanelView'
  ],function(
  GesturesPanelView
  ){

  this.settings = {
    "gestureZone" : "#gestureZone",
    "entranceButton": {}
  }

  function start() {

    GesturesPanelView.render();

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








  return {
    start:start
  };
})
