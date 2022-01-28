var canvas = document.getElementById("fractaltree");
canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.7;
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

var turtle = {
  x: canvas.width / 2,
  y: canvas.height,
  angle: 0,
};

var len = canvas.height / 4.4;
var angle = Math.PI / 6;
var queueX = [];
var queueY = [];
var queueA = [];

var iteration;

function draw(flag) {
  if (flag) {
    len = len * 0.5;
    iteration++;
  }
  c.clearRect(0, 0, innerWidth, innerWidth);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      c.beginPath();
      c.moveTo(turtle.x, turtle.y);
      turtle.x -= Math.sin(turtle.angle) * len;
      turtle.y -= Math.cos(turtle.angle) * len;
      c.lineTo(turtle.x, turtle.y);
      c.lineWidth = 50 / ((queueA.length + 1) * 10);
      c.strokeStyle = "rgba(150, 0, " + queueA.length * 50 + ", 0.5)";
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
var trigger1 = false;
var trigger2 = false;
var setSpeed = 200;
function animate() {
  requestAnimationFrame(animate);
  var speed = setSpeed;
  if (!trigger2) {
    speed = speed / 2;
  }
  if (trigger1) {
    angle -= Math.random() / speed;
  } else {
    angle += Math.random() / speed;
  }

  if (angle > Math.PI / 6 + 0.05) {
    trigger1 = true;
  }
  if (angle < Math.PI / 6 - 0.15) {
    trigger1 = false;
  }
  if (angle > Math.PI / 6 + 0.025 || angle < Math.PI / 6 - 0.075) {
    trigger2 = true;
  } else {
    trigger2 = false;
  }

  draw(false);
}

animate();
