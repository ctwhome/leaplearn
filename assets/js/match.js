
/*
 * ***********************************************************************************
 * MATCH
 * @param gestureArray
 * ***********************************************************************************
 */

function matchGesture(gestureToCheck){

    gestureToCheck = getAxis(gestureToCheck,0,1);

    if (NUM_AXIS == 1){
        // num axis to check is "xy"
    }

    // Refresh gesture list
    one.check(gestureToCheck);            // Array of dots

    // Paint the shape realiced in the squares
    paintShape();


    // Listener
    one.on(gestureNames, function(result){
//        info.innerHTML = result.name+' ('+result.score+'%)';
        //console.log(result.name+' ('+result.score+'%)');                        // WINNER!!!

        $.each(result.ranking, function(k,v){
            var li = "ul.gesture-list li#list-"+ v.name;
            $(li).find("span.score").html(v.score+"%");
            $(li).removeClass("winner");
        })
        var winner =  "ul.gesture-list li#list-"+ result.name;
        $(winner).addClass("winner");
        });


    /*FIXME KEYBOARD*/
    simulateKeyPress("10");



    //console.log("matching gesture");
}

/*FIXME KEYBOARD*/
function simulateKeyPress(character) {
    jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
    console.log("Console check: ", character);
}




/**
 * Template for 1 Dollar
 * @param gesture
 * @return Function array with the format for 1 Dollar
 * a1 and a2: x(0), y(1), z(2)
 */
function getAxis(gesture,a1, a2){
    var gestureTemplate = [];
    for (var i in gesture){
        gestureTemplate.push([
            Math.round(gesture[i][a1]),
            Math.round(gesture[i][a2])                           // 2 dimension, add the third!
        ])
    }
    //console.log("Console check: ", gestureTemplate);
    return gestureTemplate;
}


/*
 * ***********************************************************************************
 * ALGORITHM HELPERS
 * ***********************************************************************************
 */

/**
 * Update algorithm data from the gesture list
 */
function updateGesturesAlgorithm(){
    // Remove gestures:

    gestureNames = getGestureNamesAlgorithm();
    // Add all the gestures (maybe again)
    $.each(gestureList, function(k, v) {
        //display the key and value pair: console.log(k + ' is ' + v);
        one.add(k, v);
    });
    console.log("List of gestures:", gestureList);
}

/**
 * Get the keys for the gestures.
 * @type {string[]}
 */
function getGestureNamesAlgorithm(){
    var names = "";
    $.each(gestureList, function(k) {
        names += k + " ";
    });
    return names;
}

/**
 * Gesture list:
 * ADD Format: one.add('circle',[[127,141],[124,140],[120,139],[...]]);
 */
function passGesturesToAlgorithm(){
    $.each(gestureList, function(k, v) {
        //display the key and value pair: console.log(k + ' is ' + v);
        one.add(k, v);
    });
}