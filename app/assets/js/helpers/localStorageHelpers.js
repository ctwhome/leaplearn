/**
 * ***********************************************************************************
 * LOCAL STORAGE
 * ***********************************************************************************
 */
function updateLocalStorage(){
  localStorage.setItem('userGestures', JSON.stringify(gestureList));
}

// From localStorage
function getListFromLocalSotorage(){
  gestureList = JSON.parse(localStorage.getItem('userGestures')) || {};
  UIlistFromLocalStorage();
}

/***
 * Gesture List Interface
 */
function UIlistFromLocalStorage() {

  $.each(gestureList, function(k, v) {
    //display the key and value pair: console.log(k + ' is ' + v);
    // k: name of gesture
    // v: v.key and v.gesture
    //console.log("Console check: ", v);
    addUIList(k, v.key);
  });
}
