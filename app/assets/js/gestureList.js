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
    gestureList[nameGesture] = {key: keyGesture, gesture: gesture, predominant: predominant};

    //console.log("Gesture saved", JSON.stringify(gestureList));
    addUIList(nameGesture, keyGesture);
    updateDataList();
}

/**
 * Remove gesture from the list
 */
function removeGestureFromList(key){
    // Find the key in gesture list and update the local storage
  if (algoOriginal) {
    xy_algo.DeleteUserGesture(key);
    xz_algo.DeleteUserGesture(key);
    yz_algo.DeleteUserGesture(key);
    delete gestureList[key];
    // Update local storage
    updateDataList();
  }
  else{
    // Find the key in gesture list and update the local storage
    one.remove(key);
    delete gestureList[key];
    // Update local storage
    updateDataList();
  }

}
/**
 * update all the data list in the application
 */
function updateDataList(){
  if (algoOriginal) {
    xy_algo.DeleteUserGesture();
    xz_algo.DeleteUserGesture();
    yz_algo.DeleteUserGesture();
  }
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

function addUIList(nameGesture, keyGesture) {
    // Ui changes
    $("ul.gesture-list").prepend('<li id="list-'+nameGesture+'"><span class="name">'
        +  nameGesture
        + '</span><span class="key"><span class="glyphicon glyphicon-chevron-right"></span>'
        +  keyGesture
        + '</span>' +
        '<span class="score"></span></li>');
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

        // when the animation is finished
        $current.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        // Remove element from the sistem
            removeGestureFromList(name);
            $current.remove();
        });
    })
}
