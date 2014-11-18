/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * Home view
 * ---------------------
 * Main page touchs
 */
define(['handlebars','text!templates/homeTemplate.html'],function(Handlebars,HomeTemplate){

  function render(parameters){
    var appDiv = document.getElementById('leap-learn');
    var template = Handlebars.compile(HomeTemplate);
    appDiv.innerHTML = template();
  }

  return {
    render:render
  };
});
