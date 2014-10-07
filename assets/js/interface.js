/**
 * Han detection image manage
 * @param frame
 */
function handDetection(frame){
    // Hand in the system
    if (frame.pointables.length > 0) {
        // POINTABLE ZONE
        //Hide info
        $(".img-detect").addClass("hide")
    }
    // Hand out of the system
    else {
        //Hide img of detection
        $(".img-detect").removeClass("hide")
        textBox.html("");
    }
}
/**
 * List of gestures and remove elements
 */
$nameGesture.keypress(function(event) {
    if (event.keyCode == 13) { record(); }
});
/**
 * Debbugin function
 * @param hand
 * @param indexFinger
 */
function debbug(hand, indexFinger){
    // Debug
    fingerName.innerText = indexFinger.toString();                              // Distal stablish
    fingerDistance.innerText = indexFinger.touchDistance;
    fingerPosition.innerText =
        "\nx: "+indexFinger.stabilizedTipPosition[0] +
        "\ny: "+indexFinger.stabilizedTipPosition[1] +
        "\nz: "+indexFinger.stabilizedTipPosition[2];
    fingerTipPosition.innerText = indexFinger.tipPosition;
}

/**
 *
 * @param indexFinger
 */
function infoBars(indexFinger){
    // Bar touch distance
    var distance;
    if (indexFinger.touchDistance < 0){
        distance = Math.round(indexFinger.touchDistance * -50)  +"%";
        ballr.css("width", distance);
    }
    else{
        distance = Math.round(indexFinger.touchDistance * 50)  +"%";
        balll.css("width", distance);
    }
}


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
