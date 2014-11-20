/**
 * LeapLearn. by Jesus García
 * ----------------------------------------------------------------
 * Copyright (c) 2014 Universidad Carlos III de Madrid
 *
 * @link http://www.ctwhome.com/leaplearn
 * @copyright 2014 Jesus García
 * @date 11/09/14, 10:44.
 *
 * Gesture model
 * ---------------------
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
