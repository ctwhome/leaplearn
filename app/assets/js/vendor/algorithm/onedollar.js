/**
 * The $1 Unistroke Recognizer (JavaScript version)
 *
 *	Jacob O. Wobbrock, Ph.D.
 * 	The Information School
 *	University of Washington
 *	Seattle, WA 98195-2840
 *	wobbrock@uw.edu
 *
 *	Andrew D. Wilson, Ph.D.
 *	Microsoft Research
 *	One Microsoft Way
 *	Redmond, WA 98052
 *	awilson@microsoft.com
 *
 *	Yang Li, Ph.D.
 *	Department of Computer Science and Engineering
 * 	University of Washington
 *	Seattle, WA 98195-2840
 * 	yangli@cs.washington.edu
 *
 * The academic publication for the $1 recognizer, and what should be
 * used to cite it, is:
 *
 *	Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without
 *	  libraries, toolkits or training: A $1 recognizer for user interface
 *	  prototypes. Proceedings of the ACM Symposium on User Interface
 *	  Software and Technology (UIST '07). Newport, Rhode Island (October
 *	  7-10, 2007). New York: ACM Press, pp. 159-168.
 *
 * The Protractor enhancement was separately published by Yang Li and programmed
 * here by Jacob O. Wobbrock:
 *
 *	Li, Y. (2010). Protractor: A fast and accurate gesture
 *	  recognizer. Proceedings of the ACM Conference on Human
 *	  Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *	  (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **/
//
// Point class
//
function Point(x, y) // constructor
{
  this.X = x;
  this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) // constructor
{
  this.Name = name;
  this.Points = Resample(points, NumPoints);
  var radians = IndicativeAngle(this.Points);
  this.Points = RotateBy(this.Points, -radians);
  this.Points = ScaleTo(this.Points, SquareSize);
  this.Points = TranslateTo(this.Points, Origin);
  this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score) // constructor
{
  this.Name = name;
  this.Score = score;
}

//
// DollarRecognizer class constants
//
// var NumUnistrokes = 16;
var NumPoints = 64;
var SquareSize = 250.0;
var Origin = new Point(0,0);
var Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
var HalfDiagonal = 0.5 * Diagonal;
var AngleRange = Deg2Rad(45.0);
var AnglePrecision = Deg2Rad(2.0);
var Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
  //
  // one built-in unistroke per gesture type
  //
  //var newUnistroke = new Unistroke("not match", new Array(new Point(1,1),new Point(1,2)));
  this.Unistrokes = new Array();
  //this.AddGesture("star2", new Array(new Point(75,250),new Point(75,247),new Point(77,244),new Point(78,242),new Point(79,239),new Point(80,237),new Point(82,234),new Point(82,232),new Point(84,229),new Point(85,225),new Point(87,222),new Point(88,219),new Point(89,216),new Point(91,212),new Point(92,208),new Point(94,204),new Point(95,201),new Point(96,196),new Point(97,194),new Point(98,191),new Point(100,185),new Point(102,178),new Point(104,173),new Point(104,171),new Point(105,164),new Point(106,158),new Point(107,156),new Point(107,152),new Point(108,145),new Point(109,141),new Point(110,139),new Point(112,133),new Point(113,131),new Point(116,127),new Point(117,125),new Point(119,122),new Point(121,121),new Point(123,120),new Point(125,122),new Point(125,125),new Point(127,130),new Point(128,133),new Point(131,143),new Point(136,153),new Point(140,163),new Point(144,172),new Point(145,175),new Point(151,189),new Point(156,201),new Point(161,213),new Point(166,225),new Point(169,233),new Point(171,236),new Point(174,243),new Point(177,247),new Point(178,249),new Point(179,251),new Point(180,253),new Point(180,255),new Point(179,257),new Point(177,257),new Point(174,255),new Point(169,250),new Point(164,247),new Point(160,245),new Point(149,238),new Point(138,230),new Point(127,221),new Point(124,220),new Point(112,212),new Point(110,210),new Point(96,201),new Point(84,195),new Point(74,190),new Point(64,182),new Point(55,175),new Point(51,172),new Point(49,170),new Point(51,169),new Point(56,169),new Point(66,169),new Point(78,168),new Point(92,166),new Point(107,164),new Point(123,161),new Point(140,162),new Point(156,162),new Point(171,160),new Point(173,160),new Point(186,160),new Point(195,160),new Point(198,161),new Point(203,163),new Point(208,163),new Point(206,164),new Point(200,167),new Point(187,172),new Point(174,179),new Point(172,181),new Point(153,192),new Point(137,201),new Point(123,211),new Point(112,220),new Point(99,229),new Point(90,237),new Point(80,244),new Point(73,250),new Point(69,254),new Point(69,252)));



  //
  // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
  //
  this.Recognize = function(points, useProtractor)
  {
    points = Resample(points, NumPoints);
    var radians = IndicativeAngle(points);
    points = RotateBy(points, -radians);
    points = ScaleTo(points, SquareSize);
    points = TranslateTo(points, Origin);
    var vector = Vectorize(points); // for Protractor

    var b = +Infinity;
    var u = -1;

    var result =[];

    // CHECK EVERY UNISTROKE AND RETURN THE PERCENTAGE
    for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke
    {
      // show the percentaje of all the gestures matches


      var d;
      if (useProtractor) // for Protractor
        d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);
      else // Golden Section Search (original $1)
        d = DistanceAtBestAngle(points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision);

      // important for every step
      b = d;

      result.push(new Result(this.Unistrokes[i].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal));

      //console.log("DollarRecognizer: ", new Result(this.Unistrokes[i].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal));


      // Get the best
      if (d < b) {
        b = d; // best (least) distance
        u = i; // unistroke
      }
    }
    //return (u == -1) ? new Result("No match.", 0.0) : new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
    return result;

    //return new Result(
    //  this.Unistrokes[u].Name,
    //  useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal
    //);


  };
  this.AddGesture = function(name, points)
  {
    this.Unistrokes.push(new Unistroke(name, points)); // append new unistroke

    //console.log("DollarRecognizer: ", this.Unistrokes);

    //var num = 0;
    //for (var i = 0; i < this.Unistrokes.length; i++) {
    //  if (this.Unistrokes[i].Name == name)
    //    num++;
    //}
    //return num;
  }

  /**
   * Delete a gesture created before
   * @param name
   * @returns {number}
   * @constructor
   */
  this.DeleteUserGesture = function()
  {
    this.Unistrokes = [];
//    console.log("DollarRecognizer: ");
//    // locate the position of the name in the array
//    var position = this.Unistrokes.indexOf(name);
//
//    // in position, delete 1 element
//    console.log("DollarRecognizer: ", this.Unistrokes);
//    //this.Unistrokes.splice(position, 1);

    //return NumUnistrokes;
  }
}



//
// Private helper functions from this point down
//
function Resample(points, n)
{
  var I = PathLength(points) / (n - 1); // interval length
  var D = 0.0;
  var newpoints = new Array(points[0]);
  for (var i = 1; i < points.length; i++)
  {
    var d = Distance(points[i - 1], points[i]);
    if ((D + d) >= I)
    {
      var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
      var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
      var q = new Point(qx, qy);
      newpoints[newpoints.length] = q; // append new point 'q'
      points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
      D = 0.0;
    }
    else D += d;
  }
  if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
    newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
  return newpoints;
}
function IndicativeAngle(points)
{
  var c = Centroid(points);
  return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
  var c = Centroid(points);
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
    var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
  var B = BoundingBox(points);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = points[i].X * (size / B.Width);
    var qy = points[i].Y * (size / B.Height);
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
  var c = Centroid(points);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = points[i].X + pt.X - c.X;
    var qy = points[i].Y + pt.Y - c.Y;
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function Vectorize(points) // for Protractor
{
  var sum = 0.0;
  var vector = new Array();
  for (var i = 0; i < points.length; i++) {
    vector[vector.length] = points[i].X;
    vector[vector.length] = points[i].Y;
    sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
  }
  var magnitude = Math.sqrt(sum);
  for (var i = 0; i < vector.length; i++)
    vector[i] /= magnitude;
  return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
  var a = 0.0;
  var b = 0.0;
  for (var i = 0; i < v1.length; i += 2) {
    a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
    b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
  }
  var angle = Math.atan(b / a);
  return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
  var x1 = Phi * a + (1.0 - Phi) * b;
  var f1 = DistanceAtAngle(points, T, x1);
  var x2 = (1.0 - Phi) * a + Phi * b;
  var f2 = DistanceAtAngle(points, T, x2);
  while (Math.abs(b - a) > threshold)
  {
    if (f1 < f2) {
      b = x2;
      x2 = x1;
      f2 = f1;
      x1 = Phi * a + (1.0 - Phi) * b;
      f1 = DistanceAtAngle(points, T, x1);
    } else {
      a = x1;
      x1 = x2;
      f1 = f2;
      x2 = (1.0 - Phi) * a + Phi * b;
      f2 = DistanceAtAngle(points, T, x2);
    }
  }
  return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
  var newpoints = RotateBy(points, radians);
  return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
  var x = 0.0, y = 0.0;
  for (var i = 0; i < points.length; i++) {
    x += points[i].X;
    y += points[i].Y;
  }
  x /= points.length;
  y /= points.length;
  return new Point(x, y);
}
function BoundingBox(points)
{
  var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
  for (var i = 0; i < points.length; i++) {
    minX = Math.min(minX, points[i].X);
    minY = Math.min(minY, points[i].Y);
    maxX = Math.max(maxX, points[i].X);
    maxY = Math.max(maxY, points[i].Y);
  }
  return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2)
{
  var d = 0.0;
  for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
    d += Distance(pts1[i], pts2[i]);
  return d / pts1.length;
}
function PathLength(points)
{
  var d = 0.0;
  for (var i = 1; i < points.length; i++)
    d += Distance(points[i - 1], points[i]);
  return d;
}
function Distance(p1, p2)
{
  var dx = p2.X - p1.X;
  var dy = p2.Y - p1.Y;
  return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }
