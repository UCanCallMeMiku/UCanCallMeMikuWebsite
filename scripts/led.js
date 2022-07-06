var canvasFractal = document.getElementById("led");
var ctx = canvasFractal.getContext("2d");

var scale = 0.15;

canvasFractal.width = window.innerWidth;
canvasFractal.height = window.innerWidth;

canvasFractal.style.width = canvasFractal.width * scale + "px";
canvasFractal.style.height = canvasFractal.height * scale + "px";

//--------------------------------------------- cookie handler



//--------------------------------------------- const

var mid = canvasFractal.width / 2;
var radius = canvasFractal.width / 2.25;

var setWidth = 50;
var width = canvasFractal.width / setWidth;

var setSpacing = 0.125;
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

//--------------------------------------------- Draw

var iterator = 0;
var breathingSpeed = Infinity;


function drawIt() {
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
    ctx.clearRect(0, 0, canvasFractal.width, canvasFractal.height);
}

function milisecond() {
    var miliseconds = date.getMilliseconds();
    ctx.lineWidth = width;
    var color = rgba(254, 254, 255, 1);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (cakeModeOn) ctx.moveTo(mid, mid);
    ctx.arc(mid, mid, Math.abs(radius * (1 - spacing * 0)), -Math.PI / 2, miliseconds / 500 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) ctx.lineTo(mid, mid);
    if (cakeModeOn) ctx.fill();
    ctx.stroke();
}

function second() {
    var seconds = date.getSeconds() + (date.getMilliseconds() / 1000);
    ctx.lineWidth = width;
    var color = "rgba(250, 88, 182, 1)";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (cakeModeOn) ctx.moveTo(mid, mid);
    ctx.arc(mid, mid, Math.abs(radius * (1 - spacing * 1)), -Math.PI / 2, seconds / 30 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) ctx.lineTo(mid, mid);
    if (cakeModeOn) ctx.fill();
    ctx.stroke();
}

function minute() {
    var minutes = date.getMinutes() + (date.getSeconds() / 60);
    ctx.lineWidth = width;
    var color = "rgba(122, 11, 192, 1)";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (cakeModeOn) ctx.moveTo(mid, mid);
    ctx.arc(mid, mid, Math.abs(radius * (1 - spacing * 2)), -Math.PI / 2, minutes / 30 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) ctx.lineTo(mid, mid);
    if (cakeModeOn) ctx.fill();
    ctx.stroke();
}

function hour() {
    var hours = date.getHours() + (date.getMinutes() / 60);
    if (hours > 12) hours = hours - 12;
    ctx.lineWidth = width;
    var color = "rgba(39, 0, 130, 1)";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (cakeModeOn) ctx.moveTo(mid, mid);
    ctx.arc(mid, mid, Math.abs(radius * (1 - spacing * 3)), -Math.PI / 2, hours / 6 * Math.PI - (Math.PI / 2));
    if (cakeModeOn) ctx.lineTo(mid, mid);
    if (cakeModeOn) ctx.fill();
    ctx.stroke();
}

var textSize = 11;

function text() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.font = (canvasFractal.width / textSize) * (Math.cos(iterator / breathingSpeed) / 2 + 0.5) + "px Orbitron";
    ctx.textAlign = "center";
    var text = "";
    if (hourTextOn) text += ("0" + date.getHours()).slice(-2);
    if (hourTextOn && minuteTextOn || hourTextOn && secondTextOn || hourTextOn && milisecondTextOn) text += ":";
    if (minuteTextOn) text += ("0" + date.getMinutes()).slice(-2);
    if (minuteTextOn && secondTextOn || minuteTextOn && milisecondTextOn) text += ":";
    if (secondTextOn) text += ("0" + date.getSeconds()).slice(-2);
    if (secondTextOn && milisecondTextOn) text += ":";
    if (milisecondTextOn) text += date.getMilliseconds();
    ctx.fillText(text, mid, mid + (canvasFractal.width / textSize) / 3);
}

//--------------------------------------------- functions

function clicked() {
    jitterActive = true;
    jitterIterrator = 0;
    iterator = 0;
    breathingSpeed = 1;
    var audio = new Audio("../sounds/mixkit-arcade-game-jump-coin-216.wav");
    audio.play();
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
    drawIt();
}
animate();