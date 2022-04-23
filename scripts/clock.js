var canvas = document.getElementById("loading");
var c = canvas.getContext("2d");

var smoothScaling = 1;
var scale = 1;
canvas.width = window.innerWidth * 0.9 * smoothScaling;
canvas.height = window.innerHeight * 0.7 * smoothScaling;
if (canvas.width > canvas.height) {
    canvas.width = canvas.height;
} else {
    canvas.height = canvas.width;
}

canvas.style.width = canvas.width * scale + "px";
canvas.style.height = canvas.height * scale + "px";

//--------------------------------------------- cookie handler


//--------------------------------------------- const

var date = new Date();
var mid = canvas.width / 2;
var radius = canvas.width / 2.5;

var setWidth = 50;
var width = canvas.width / setWidth;

var setSpacing = 0.1;
var spacing = setSpacing;

//--------------------------------------------- what to show

var milisecondBarOn = false;
var secondBarOn = true;
var minuteBarOn = true;
var hourBarOn = true;

var milisecondTextOn = false;
var secondTextOn = true;
var minuteTextOn = true;
var hourTextOn = true;

//--------------------------------------------- Modes

var cakeModeOn = false;
var breathingModeOn = true;

//--------------------------------------------- Draw

var iterator = 0;
var breathingSpeed = Infinity;


function draw() {
    date = new Date();
    iterator++;

    jitter();
    spacing = Math.sin(iterator / breathingSpeed) / 20 + setSpacing;

    background();
    if (milisecondBarOn) milisecond();
    if (secondBarOn) second();
    if (minuteBarOn) minute();
    if (hourBarOn) hour();
    text();
}

function background() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function milisecond() {
    var miliseconds = date.getMilliseconds();
    c.lineWidth = width;
    c.fillStyle = "white";
    c.strokeStyle = "white";
    c.beginPath();
    if (cakeModeOn) c.moveTo(mid, mid);
    c.arc(mid, mid, Math.abs(radius * (1 - spacing * 0)), -Math.PI / 2, miliseconds / 500 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) c.lineTo(mid, mid);
    if (cakeModeOn) c.fill();
    c.stroke();
}

function second() {
    var seconds = date.getSeconds() + (date.getMilliseconds() / 1000);
    c.lineWidth = width;
    c.fillStyle = "yellow";
    c.strokeStyle = "yellow";
    c.beginPath();
    if (cakeModeOn) c.moveTo(mid, mid);
    c.arc(mid, mid, Math.abs(radius * (1 - spacing * 1)), -Math.PI / 2, seconds / 30 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) c.lineTo(mid, mid);
    if (cakeModeOn) c.fill();
    c.stroke();
}

function minute() {
    var minutes = date.getMinutes() + (date.getSeconds() / 60);
    c.lineWidth = width;
    c.fillStyle = "violet";
    c.strokeStyle = "violet";
    c.beginPath();
    if (cakeModeOn) c.moveTo(mid, mid);
    c.arc(mid, mid, Math.abs(radius * (1 - spacing * 2)), -Math.PI / 2, minutes / 30 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) c.lineTo(mid, mid);
    if (cakeModeOn) c.fill();
    c.stroke();
}

function hour() {
    var hours = date.getHours() + (date.getMinutes() / 60);
    if (hours > 12) hours = hours - 12;
    c.lineWidth = width;
    c.fillStyle = "blue";
    c.strokeStyle = "blue";
    c.beginPath();
    if (cakeModeOn) c.moveTo(mid, mid);
    c.arc(mid, mid, Math.abs(radius * (1 - spacing * 3)), -Math.PI / 2, hours / 6 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) c.lineTo(mid, mid);
    if (cakeModeOn) c.fill();
    c.stroke();
}

var textSize = 11;

function text() {
    c.fillStyle = "white";
    c.strokeStyle = "white";
    c.font = (canvas.width / textSize) * (Math.cos(iterator / breathingSpeed) / 2 + 0.5) + "px Orbitron";
    c.textAlign = "center";
    var text = "";
    if (hourTextOn) text += ("0" + date.getHours()).slice(-2);
    if (hourTextOn && minuteTextOn || hourTextOn && secondTextOn || hourTextOn && milisecondTextOn) text += ":";
    if (minuteTextOn) text += ("0" + date.getMinutes()).slice(-2);
    if (minuteTextOn && secondTextOn || minuteTextOn && milisecondTextOn) text += ":";
    if (secondTextOn) text += ("0" + date.getSeconds()).slice(-2);
    if (secondTextOn && milisecondTextOn) text += ":";
    if (milisecondTextOn) text += date.getMilliseconds();
    c.fillText(text, mid, mid + (canvas.width / textSize) / 3);
}

//--------------------------------------------- functions

function clicked() {
    jitterActive = true;
    jitterIterrator = 0;
    iterator = 0;
    breathingSpeed = 1;
    document.cookie = "hi";
    console.log(document.cookie);
}

var jitterActive = false;
var jitterIterrator = 0;

function jitter() {
    jitterIterrator++;
    if (!jitterActive) return;
    if (jitterIterrator > 100) {
        jitterActive = false;
        breathingSpeed = Infinity;
    }
    breathingSpeed = breathingSpeed * 1.4;
}

//--------------------------------------------- Animate

function animate() {
    requestAnimationFrame(animate);
    draw();
}

animate();