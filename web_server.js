/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 26/09/14, 11:25.
 *
 * SERVER NODE.JS
 * ---------------------
 */
var static = require('node-static');
var keyboard = require('mac-keyboard');
  welcomeMessage();
	keyboard.init();

//
// Node-static server instance to serve the './app' folder
//
var file = new static.Server('./app');

require('http').createServer(function (request, response) {

    request.addListener('end', function(){
    	//
    	// Serve files!
        //
        file.serve(request, response);

        // Fire Key when the request
        if (request.method == "POST"){
        	keyboard.pressKey(removeSlash(request.url));
        }
        else{
        var log = request.method + ": "+request.url;
        	console.log(log);
		}
    }).resume();

}).listen(8080);

/**
* removeSlash(url)
* Delete "/" from the url.
*/
function removeSlash(url){
	var res = url.slice(1,url.lenght);
	  // console.log(typeof(res));
	  return  Number(res);
}


function welcomeMessage(){
  var message = " +-+-+-+-+ +-+-+-+-+-+\n |L|e|a|p| |L|e|a|r|n| \n +-+-+-+-+ +-+-+-+-+-+ \n  by Jesus Garcia\n  github.com/ctwhome\n ";
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  console.log(message);
  console.log("  Run in a web browser: http://localhost:8080\n  * Don not close this window. ");
}
