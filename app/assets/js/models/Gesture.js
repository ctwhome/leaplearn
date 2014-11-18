/**
 * Created by ctw on 18/11/14.
 */
define(['text!../data/gesture_base.json'],function(gesturesJSON){
  function Gesture(name, key, gesture){
    this.name = name || "No name";
    this.key = key || "No key";
    this.gesture = gesture || "";
  }

  /**
   * Collection
   */
  function GestureCollection(gesturesJSON){
    this.items = [];

    // Create the data base of gestures.
    for (var i in JSON.parse(gesturesJSON)){
      this.items.push(new Gesture(gesturesJSON.name, gesturesJSON.key, gesturesJSON.gesture))
    }
  }

  return {
    Gesture:Gesture,
    GestureCollection:GestureCollection
  };
})
