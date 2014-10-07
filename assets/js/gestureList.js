/**
 * Algorithm of recognigser,
 * this is executed when a gesture is detected.
 * @param listOfGestures
 * @param actualScreenshot
 */

/*
 * ***********************************************************************************
 * List of gestures
 * ***********************************************************************************
 */
function addGestureTotheList(){
    // Add gesture to the Object
    gestureList[nameGesture] = gesture;
    addUIList(nameGesture);
    updateDataList();
}

/**
 * Remove gesture from the list
 */
function removeGestureFromList(key){
    // Find the key in gesture list and update the local storage
    one.remove(key);
    delete gestureList[key];
    // Update local storage
    updateDataList();
}
/**
 * update all the data list in the application
 */
function updateDataList(){
    // Add to the gesture list, from who read the algorithm
    updateGesturesAlgorithm();
    // Update local storage
    updateLocalStorage();
}

/*
 * ***********************************************************************************
 * listener for the data list
 * ***********************************************************************************
 */
/***
 * Gesture List Interface
 */
function UIlistFromLocalStorage() {
    var $list = $("ul.gesture-list").html("");

    $.each(gestureList, function(k, v) {
        //display the key and value pair: console.log(k + ' is ' + v);
        addUIList(k);
    });
}

function addUIList(nameGesture) {
    // Ui changes
    $("ul.gesture-list").prepend('<li id="list-'+nameGesture+'"><span class="name">'
        +  nameGesture
        + '</span><span class="score"></span></li>');
    $('input#name-gesture').val("");
    $('ul.gesture-list > li:first-child').addClass('animated bounceInLeft');
    addListenerRemoveGestureFromList();
}

//Start reading the list to be removed
function addListenerRemoveGestureFromList(){

    var $li = $("ul.gesture-list li");

    $li.unbind();
    $li.on("click", function(e){
        var $current = $(e.currentTarget);
        var name = $current.find("span.name").text()

        $current.removeAttr("class");
        $current.addClass('animated bounceOutLeft');
        // Detect the animation and realice something
       // console.log("Console check: ", $current);

        $current.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        // Remove element from the sistem
            removeGestureFromList(name);
            $current.remove();
        });
    })
}

/**
 * ***********************************************************************************
 * LOCAL STORAGE
 * ***********************************************************************************
 */
function updateLocalStorage(){
    localStorage.setItem('userGestures', JSON.stringify(gestureList));
    //console.log("Gesture recorder: ", gesture);
}
// From localStorage
function getListFromLocalSotorage(){
    gestureList = JSON.parse(localStorage.getItem('userGestures')) || {};
    UIlistFromLocalStorage();
}

// JSON EXAMPLE
function getGestureListJSON(){
    // GET FROM FILE
    $.getJSON("assets/data/gesture_base.json", function(json){


        $.each(json, function(k,v) {
            nameGesture = k;
            gesture = v;
            console.log("Console check: ", nameGesture);

            addGestureTotheList();
        });

        console.log("Gestures list data loaded.");
        //passGesturesToAlgorithm();
    });


    addListenerRemoveGestureFromList();
}