/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * Main app
 * ---------------------
 * Main page touchs
 */
requirejs.config({
  "baseUrl": "assets/js",
  "paths"  : {
    "jquery"    : "../../bower_components/jquery/dist/jquery.min",
    "jqueryUI"    : "../../bower_components/jqueryUI/jquery-ui.min",
    "handlebars": "../../bower_components/handlebars/handlebars.min",
    "text"      : "../../bower_components/requirejs-text/text",

    "leap"            : "../../bower_components/leap/leap-0.6.3.min",
    "leap-plugins"    : "../../bower_components/leap/leap-plugins-0.1.6",
    "leap-rigged-hand": "../../bower_components/leap/leap.rigged-hand-0.1.4",
    "kinetic"         : "../../bower_components/kinetic/kinetic-v4.5.4.min",
    "threejs"         : "../../bower_components/threejs/three.min",
    "d3"              : "../../bower_components/d3/d3.v3.min",

    "modal-bootstrap": "../../bower_components/bootstrap/modal",
    "alert-bootstrap": "../../bower_components/bootstrap/alert",

    "keyboard": "../../bower_components/keyboardjs/keyboard",
    "onedollar": "../../bower_components/onedollar/onedollar.min"


  },
  // Shim: for global exports
  "shim"   : {
    "jquery": {
      "exports": "$"
    },
    "leap"  : {
      "exports": "leap"
    }
  }
});

// Main Applicacion. The first ejecution
// Load the main app module to start the app
require([
  'Router',
  'jquery',                      // Put at the end when It has a shim.
  'leap'
], function (Router) {

  Router.startRouting();

});
