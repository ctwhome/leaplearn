/**
 * Algorithm of recognigser,
 * this is executed when a gesture is detected.
 * @param listOfGestures
 * @param actualScreenshot
 */


// Gesture list:
function passGesturesToAlgorithm(){
    // ADD Format:
    // one.add('circle',[[127,141],[124,140],[120,139],[...]]);

    $.each(gestureList, function(k, v) {
        //display the key and value pair
        //console.log(k + ' is ' + v);

        one.add(k, v);
    });
}


function matchGesture(gestureArray){

    // Refresh gesture list
    //console.log("Console check: ", gestureArray);
    one.check(gestureArray);

    // Listener
    one.on('triangle rectangle check caret zig-zag arrow delete star pigtail',
        function(result){
            // Print into the square
            info.innerHTML = result.name+' ('+result.score+'%)';

            console.log(result.name+' ('+result.score+'%)');                        // WINNER!!!
            console.log(result.ranking);                                            // COINCIDENCES with the rest
        });

    /**
     * ONE DOLLAR
     * @type {{enableGestures: boolean, frameEventName: string}}
     */

//Processing.js
//    new Processing(document.getElementById('js-sketch'),function(p){
//
//        var candidate, draw, length, str;
//
//        p.setup = function(){
//            p.size(500, 360);
//            p.background(230);
//
//            candidate = [];
//            draw = false;
//
//            p.noFill();
//            p.stroke(20);
//        };
//
//        p.draw = function(){
//            p.background(230);
//
//            if(draw===true){
//                p.stroke(0);
//            } else {
//                p.stroke(150);
//            }
//
//            p.beginShape();
//            for (var l=candidate.length, i=0; i<l; i++) {
//                p.vertex(candidate[i][0], candidate[i][1]);
//            }
//            p.endShape();
//        };
//
//        p.mousePressed = function(){
//            draw = true;
//            candidate = [];
//        };
//        p.mouseDragged = function(){
//            candidate.push([p.mouseX, p.mouseY]);
//        };
//        p.mouseReleased = function(){
//
//            str = 'Here you see the data of the last move ('+candidate.length+' points). With it, you can add easily your own gestures. <br><br>[';
//            for (var l=candidate.length, i=0; i<l; i++) {
//                str = str+'['+candidate[i][0]+','+candidate[i][1]+']';
//            }
//            str += ']';
//            document.getElementById('js-data').innerHTML = str;
//
//            one.check(candidate);
//            draw = false;
//        };
//
//    });
//
//    /***
//     *
//     * @type {{enableGestures: boolean, frameEventName: string}}
//     */
//
//        // write in the dev
//    gestureMade.innerText = gesture;


    // get the list of the gestures recorder

    // Match actual screenshot with the gestures that we have

    // keep the match.
}