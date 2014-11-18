/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * App Routing
 * ---------------------
 * Main page touchs
 */

define(function(){

  /**
   * Rutes for the application
   * @type {{hash: string, controller: string}[]}
   */
  var routes = [
    {hash:'#home',  controller:'HomeController'},
    {hash:'#gestureZone', controller:'GestureZoneController'}
  ];

  var defaultRoute = '#home';
  var currentHash = '';

  function startRouting(){
    window.location.hash = window.location.hash || defaultRoute;
    setInterval(hashCheck, 100);
  }

  function hashCheck(){
    if (window.location.hash != currentHash){
      for (var i = 0, currentRoute; currentRoute = routes[i++];){
        if (window.location.hash == currentRoute.hash)
          loadController(currentRoute.controller);
      }
      currentHash = window.location.hash;
    }
  }

  function loadController(controllerName){
    require(['controllers/' + controllerName], function(controller){
      controller.start();
    });
  }

  return {
    startRouting:startRouting
  };
});
