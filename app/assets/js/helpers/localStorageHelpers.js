/**
 * ***********************************************************************************
 * LOCAL STORAGE
 * ***********************************************************************************
 */
function updateLocalStorage(){
  localStorage.setItem('userGestures', JSON.stringify(gestureList));
  localStorage.setItem('pointer', pointer);
  localStorage.setItem('protractor', protractor);
}

// From localStorage
function getListFromLocalSotorage(){
  gestureList = JSON.parse(localStorage.getItem('userGestures')) || {};

  protractor = JSON.parse(localStorage.getItem('protractor')) || false;
  pointer = JSON.parse(localStorage.getItem('pointer')) || false;

  protractor ? document.getElementById("protractor").checked = true : document.getElementById("dollar1").checked = true
  pointer ? document.getElementById("distal").checked = true :  document.getElementById("metacarpal").checked = true

  console.log("getListFromLocalSotorage: ", gestureList);
  UIlistFromLocalStorage();
}

/***
 * Gesture List Interface
 */
function UIlistFromLocalStorage() {

  $.each(gestureList, function(k, v) {
    //display the key and value pair: console.log(k + ' is ' + v);
    // k: name of gesture
    // v: v.key and v.gesture, v.predominant
    //console.log("Console check: ", v);

    addUIList(k, v.key);
  });
}


/**
 * ***********************************************************************************
 * JSON FILE SAMPLE
 * ***********************************************************************************
 */
function getGestureListJSON(){
  // GET FROM FILE
  $.getJSON("assets/data/gesture_base.json", function(json){

    //console.log("Console check: ", json);
    $.each(json, function(k,v) {
      nameGesture = k;
      keyGesture = v.key;
      gesture = v.gesture;
      predominant = v.predominant;

      addGestureTotheList();
    });
    console.log("Gestures list data loaded.");
  });

  addListenerRemoveGestureFromList();
}
