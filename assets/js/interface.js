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
 * List of gestures
 */
$nameGesture.keypress(function(event) {
    if (event.keyCode == 13) { record(); }
});
$("ul.gesture-list li").on("click", function(e){
    console.log(e.currentTarget);
    $(e.currentTarget).addClass('animated bounceOutLeft');
    $(e.currentTarget).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        $(e.currentTarget).remove();
    });
})

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