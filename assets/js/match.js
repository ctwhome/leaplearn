
/*
 * ***********************************************************************************
 * MATCH
 * @param gestureArray
 * ***********************************************************************************
 */

function matchGesture(gestureToCheck){

    // Refresh gesture list
    one.check(gestureToCheck);            // Array of dots

    // Listener
    one.on(gestureNames, function(result){
        // Print into the square

        info.innerHTML = result.name+' ('+result.score+'%)';
        //console.log(result.name+' ('+result.score+'%)');                        // WINNER!!!

        $.each(result.ranking, function(k,v){
            var li = "ul.gesture-list li#list-"+ v.name;
            $(li).find("span.score").html(v.score+"%");
            $(li).removeClass("winner");
        })
        var winner =  "ul.gesture-list li#list-"+ result.name;
        $(winner).addClass("winner");
        });
    //console.log("matching gesture");
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
    console.log("one", gestureList);
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