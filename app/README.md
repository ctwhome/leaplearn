leaplearn
=========

    Learn gestures with Leap Motion to realize actions. In Javascript.


Installation:
--------------

Set the properties of the Leap Motion device:
>> Settings > General > Allow Web Apps    "must be actuvated".

Install dependencies
--------------------
```
$> npm install java 			// Java (for binding the gestures to others applications).
$> npm install -g node-java     // Binding (https://github.com/joeferner/node-java).
```

Execute: 
--------
Run HTTP server:
```
$> grunt sever
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
