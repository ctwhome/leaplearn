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




// Painting
(function paint(square, points) {

var points = [[68,222],[70,220],[73,218],[75,217],[77,215],[80,213],[82,212],[84,210],[87,209],[89,208],[92,206],[95,204],[101,201],[106,198],[112,194],[118,191],[124,187],[127,186],[132,183],[138,181],[141,180],[146,178],[154,173],[159,171],[161,170],[166,167],[168,167],[171,166],[174,164],[177,162],[180,160],[182,158],[183,156],[181,154],[178,153],[171,153],[164,153],[160,153],[150,154],[147,155],[141,157],[137,158],[135,158],[137,158],[140,157],[143,156],[151,154],[160,152],[170,149],[179,147],[185,145],[192,144],[196,144],[198,144],[200,144],[201,147],[199,149],[194,157],[191,160],[186,167],[180,176],[177,179],[171,187],[169,189],[165,194],[164,196]];

    // repeat this for every point

    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#c00';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(20,20);
    for (var i in points){
            ctx.lineTo(points[i][0],points[i][1]);
    }
    ctx.stroke();

})();


/**
 * Gest the min and the max of the canvas
 */
function minMax() {
    var minX = 1000000,
        minY = 1000000,
        maxX = -1000000,
        maxY = -1000000,
        i = 0, p,
        lw = ctx.lineWidth;

    for(; p = points[i++];) {
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
    }

    ctx.lineWidth = 3;
    ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    ctx.lineWidth = lw;
}





