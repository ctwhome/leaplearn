/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 20/10/14, 12:48.
 *
 * keyboard.js
 * ---------------------
 */

/**
 * Send emulated key to node.js by httpRequest
 * * @param key {number}
 */
function fireKey(key) {
  $.ajax({
    url: 'http://localhost:8080/' + key,
    type: 'POST',
    success: function () {
      //console.log('POST completed');
    }
  });
}


/**
 * Keyboard detection.
 */

  $(document).on('keydown', updateReadout);
  //$(document).on('keyup', updateReadout);

  var $boxKeyReaded, konami, kI = 0;

  $boxKeyReaded = $('.gestureKey');
  $boxKeyReaded.html('Press some keys...');
  konami = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

  function updateReadout() {
    setTimeout(function () {
      var keys, keysString;

      keys = KeyboardJS.activeKeys();
      if (keys.length) {
        keysString = keys.join(', ');
        for (var i = 0; i < keys.length; i += 1) {
          //check to see if the key is part of the konami code
          if (keys[i] === konami[kI]) {
            if (kI < konami.length - 1) {
              kI += 1;
            } else {
              window.location = "http://en.wikipedia.org/wiki/Konami_Code";
            }
          } else {
            kI = 0;
          }
        }
      } else {
        //keysString = 'Press some keys...';
      }
      keyGesture = keysString;
      $boxKeyReaded.html(keysString);
      //console.log("Console check key: ", keyGesture);
      return (keysString);
    }, 0);
  }
