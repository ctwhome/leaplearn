Leap Learn
=========

    Learn gestures with Leap Motion to realize actions. In Javascript.

Application views

![main view](https://raw.githubusercontent.com/ctwhome/leaplearn/master/readme_img/main.png)
![recording view](https://raw.githubusercontent.com/ctwhome/leaplearn/master/readme_img/recording.png)
![reading view](https://raw.githubusercontent.com/ctwhome/leaplearn/master/readme_img/reading.png)

Installation:
--------------

Set the properties of the Leap Motion device:
> Settings > General > Allow Web Apps    "must be activated".

Deploy application
--------------------
Clone repository and Install node dependences with
```sh
git clone https://github.com/ctwhome/leaplearn
cd leaplearn
node install
```

Run server
----------
```sh
# For dev, see gulpfile.js
gulp

# For execute: 
gulp server  
# Or
node web_server.js
```

Vendor: 
--------
  + LeapJs: https://github.com/leapmotion/leapjs
  + $1 Unistroke Recognizer: https://depts.washington.edu/aimgroup/proj/dollar/ 
  + NodObjC, node.js module to generate Objective C conde with node: https://github.com/TooTallNate/NodObjC
  + KeyboardJS: http://robertwhurst.github.io/KeyboardJS/
  
  Interface
  + d3
  + Animate.css
  + Bootstrap 3
  
  Special thanks to: 
   + Andrea Bellucci (uc3m), Ignacio Aedo (uc3m), Anna van Duin (support), macmouse
