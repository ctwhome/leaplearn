/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 26/09/14, 11:25.
 *
 * Gesture record
 * ---------------------
 */

/**
 * record gesture
 */
function record(){
    if ($nameGesture.val() == ""){
        // Open modal
        $("#modal-gesture").modal('show');
        return;
    }

    /**
     * Timer draw (Recursive function)
     * @type {HTMLElement}
     */
    var loader = document.getElementById('loader')
        , border = document.getElementById('border')
        , a = 10
        , pi = Math.PI
        , t = 1;
    (function draw() {

        blockRead = true;
        a++;
        a %= 360;
        var r = ( a * pi / 180 )
            , x = Math.sin( r ) * 125
            , y = Math.cos( r ) * - 125
            , mid = ( a > 180 ) ? 1 : 0
            , anim = 'M 0 0 v -125 A 125 125 1 '
                + mid + ' 1 '
                +  x  + ' '
                +  y  + ' z';

        loader.setAttribute( 'd', anim );
        border.setAttribute( 'd', anim );

        if (r == 0){
            recording = true;
            blockRead = false;
            return;
        }
        setTimeout(draw, t); // Redraw
    })();
}

/**
 * Save Gesture created in LocalStorage
 */
function saveGesure(){

    //  Add gesture to the list
    nameGesture = $('#name-gesture').val();

    //last gesture push
    for (var i in gesture){
        for(var j in gesture[i])
            gesture[i][j] = Math.round(gesture[i][j]);
    }

  addGestureTotheList();

    readingGesture = true;
    recording = false;
    prompt = false;
    console.log("Gesture saved");
}

// EXAMPLE
function recordKey() {
  prompt = true;
  $('.gestureKey').html("");
  $('#square3d-yz').focus();

  $('#modal-recordkey').modal('show');
  //when the button is close: then save gesture
}
