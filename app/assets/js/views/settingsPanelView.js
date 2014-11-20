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
 */
define(['handlebars','text!templates/settingsPanelTemplate.html'],function(Handlebars,Template){

  function render(){
    var appDiv = document.getElementById('settingsPanel');
    var template = Handlebars.compile(Template);
    appDiv.innerHTML = template();
  }

  return {
    render:render
  };
});
