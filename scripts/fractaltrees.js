var canvas = document.getElementById("fractaltree");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
if (canvas.width > canvas.height) {
  canvas.width = canvas.height;
} else {
  canvas.height = canvas.width;
}
var c = canvas.getContext("2d");
//---------------------------------------------

var axiom = "F";
var sentence = axiom;

var rule = {
  a: "F",
  b: "FF+[+F-F-F-F]-[-F+F+F]",
};

function generate() {
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == rule.a) {
      nextSentence += rule.b;
    } else {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  draw(true);
}

function reset() {

}

var turtle = {
  x: canvas.width / 2,
  y: canvas.height,
  angle: 0,
};

var len = 0;
if (canvas.width > canvas.height) {
  len = canvas.height / 4.4;
} else {
  len = canvas.width / 4.4;
}
var angle = Math.PI / 6;
var queueX = [];
var queueY = [];
var queueA = [];


function draw(flag) {
  if (flag) {
    len = len * 0.5;
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      c.beginPath();
      c.moveTo(turtle.x, turtle.y);
      turtle.x -= Math.sin(turtle.angle) * len;
      turtle.y -= Math.cos(turtle.angle) * len;
      c.lineTo(turtle.x, turtle.y);
      c.lineWidth = 50 / ((queueA.length + 1) * 10);
      c.strokeStyle = "rgba(" + ((-Math.sin(speedCount / 20)) * 25 + 150) + ", 0, " + queueA.length * 60 + "," + (1 - (queueA.length / 6)) + ")";
      c.stroke();
      c.closePath();
    } else if (current == "+") {
      turtle.angle -= angle;
    } else if (current == "-") {
      turtle.angle += angle;
    } else if (current == "[") {
      queueX.push(turtle.x);
      queueY.push(turtle.y);
      queueA.push(turtle.angle);
    } else if (current == "]") {
      turtle.x = queueX.pop();
      turtle.y = queueY.pop();
      turtle.angle = queueA.pop();
    }
  }
  turtle.x = canvas.width / 2;
  turtle.y = canvas.height;
  turtle.angle = 0;
  queueX = [];
  queueY = [];
  queueA = [];
}

//---------------------------------------------
var setSpeed = 20;
var speedCount = 0;
var lastCalled = 0;
function animate() {
  requestAnimationFrame(animate);

  speedCount++;
  angle = (Math.PI / 6) + (Math.sin(speedCount / setSpeed ) / 12 - 0.11);

  draw(false);
}

animate();
