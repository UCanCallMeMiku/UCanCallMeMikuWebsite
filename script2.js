//------------------------------------------------------ Constants

var defaultColor = [0, 0, 0];
var paintColor = defaultColor;
var predifinedColors = {
    "0": [255, 255, 255],
    "1": [0, 0, 0],
    "2": [255, 0, 0],
    "3": [0, 255, 0],
    "4": [0, 0, 255],
    "5": [255, 255, 0],
    "6": [255, 0, 255],
    "7": [0, 255, 255],
    "8": [125, 255, 0],
    "9": [125, 0, 255],
    "10": [255, 125, 0],
    "11": [0, 125, 255],
    "12": [255, 0, 125],
    "13": [0, 255, 125]
};

var mirrorVerticalyMode = false;
var mirrorHorizontalyMode = false;

var currentFrame = 0;
var playing = false;

var frames = 1;
var matrixX = 16;
var matrixY = 8;
var speed = 1;
var data = {};

function initializeData() {
    for (let k = 0; k < frames; k++) {
        data[k] = {};
        for (let y = 0; y < matrixY; y++) {
            data[k][y] = {};
            for (let x = 0; x < matrixX; x++) {
                data[k][y][x] = defaultColor;
            }
        }
    }
}
initializeData()

var dataKFF = {
    "frames": frames,
    "matrixX": matrixX,
    "matrixY": matrixY,
    "speed": speed,
    "data": data
};


var tableArray = [];


var tableVisual = document.getElementById("table");
for (let y = 0; y < matrixY; y++) {
    row = tableVisual.insertRow(y);
    row.style.margin = 0;
    tableArray.push([]);
    for (let x = 0; x < matrixX; x++) {
        cell = row.insertCell(x);
        cell.style.padding = 0;
        cell.id = y + "," + x;
        cell.innerHTML = "[" + cell.id + "]";
        cell.addEventListener("click", function (event) {
            cell = event.target.closest("td");
            let y = cell.id.split(",")[0];
            let x = cell.id.split(",")[1];
            if (data[currentFrame][y][x] == paintColor && !mirrorVerticalyMode && !mirrorHorizontalyMode) {
                data[currentFrame][y][x] = [0, 0, 0];
            } else {
                data[currentFrame][y][x] = paintColor;
            }

            if (mirrorVerticalyMode && mirrorHorizontalyMode) {
                data[currentFrame][matrixY - y - 1][matrixX - x - 1] = paintColor;
            }
            if (mirrorVerticalyMode) {
                data[currentFrame][y][matrixX - x - 1] = paintColor;
            }
            if (mirrorHorizontalyMode) {
                data[currentFrame][matrixY - y - 1][x] = paintColor;
            }
            updateColors();
        });
        let btn = document.createElement("input");
        btn.type = "button";
        btn.style.width = Math.sqrt(matrixX) + "vw";
        btn.style.height = matrixY + "vh";
        btn.style.border = "0";
        cell.appendChild(btn);
        tableArray[y].push(cell);
    }
}
updateColors();

//-------------------------------------------------------------------------------------------------- Color Chooser

var tableColorChooser = document.getElementById("colorchooser");
row = tableColorChooser.insertRow(0);
for (let x = 0; x < Object.keys(predifinedColors).length; x++) {
    cell = row.insertCell(x);
    cell.id = predifinedColors[x];
    cell.style.backgroundColor = calcColor(predifinedColors[x]);
    cell.addEventListener("click", function (event) {
        cell = event.target.closest("td");
        paintColor = cell.id.split(',').map(Number);;
        updateColors();
    });
    let btn = document.createElement("input");
    btn.type = "button";
    btn.style.width = Math.sqrt(matrixX) + "vw";
    btn.style.height = matrixY + "vh";
    btn.style.border = "0";
    btn.style.backgroundColor = calcColor(predifinedColors[x]);
    cell.appendChild(btn);
}

function calcColor(colorArray) {

    if (typeof colorArray[0] === "number") {
        const color = "rgb(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + ")";
        return color;
    } else {
        const array = JSON.parse(colorArray)
        const color = "rgb(" + array[0] + "," + array[1] + "," + array[2] + ")";
        return color;
    }
}

//--------------------------------------------------------------------------------------------------Button Functions

function setColor() {
    const colorInput = document.getElementById("colorInput");
    const colorPicker = document.getElementById("colorPicker");

    hex = colorInput.value.replace(/^#/, '');

    // Parse the hex string to get individual R, G, and B values
    const bigint = parseInt(hex, 16);

    // Extract the RGB values
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    paintColor = [r, g, b];
    console.log(paintColor);
    colorPicker.style.backgroundColor = paintColor;
}

function updateColors() {
    for (let y = 0; y < matrixY; y++) {
        for (let x = 0; x < matrixX; x++) {
            tableArray[y][x].style.backgroundColor = calcColor(data[currentFrame][y][x]);
            tableArray[y][x].children[0].style.backgroundColor = calcColor(data[currentFrame][y][x]);
        }
    }
}

var frameCounter = document.getElementById("frameCounter");
function updateFrameCounter() {
    frameCounter.innerHTML = (currentFrame + 1) + " / " + frames;
}
updateFrameCounter()

function previousFrame() {
    currentFrame--;
    if (currentFrame < 0) {
        currentFrame = frames - 1;
    }
    updateFrameCounter();
    updateColors();
}

function nextFrame() {
    currentFrame++;
    if (currentFrame > frames - 1) {
        currentFrame = 0;
    }
    updateFrameCounter();
    updateColors();
}

function mirrorVerticaly() {
    mirrorVerticalyMode = !mirrorVerticalyMode;
    document.getElementById("mirrorVerticaly").style.backgroundColor = mirrorVerticalyMode ? "rgb(255,100,100)" : "rgb(255,255,255)";
}

function mirrorHorizontaly() {
    mirrorHorizontalyMode = !mirrorHorizontalyMode;
    document.getElementById("mirrorHorizontaly").style.backgroundColor = mirrorHorizontalyMode ? "rgb(255,100,100)" : "rgb(255,255,255)";
}

function copyPreviousFrame() {
    for (let y = 0; y < matrixY; y++) {
        for (let x = 0; x < matrixX; x++) {
            if (currentFrame == 0) {
                data[currentFrame][y][x] = data[frames - 1][y][x];
            } else {
                data[currentFrame][y][x] = data[currentFrame - 1][y][x];
            }
        }
    }
    updateColors();
}

function deleteFrame() {
    for (let y = 0; y < matrixY; y++) {
        for (let x = 0; x < matrixX; x++) {
            data[currentFrame][y][x] = defaultColor;
        }
    }
    updateColors();
}

function toggleAnimation() {
    playing = !playing;
    document.getElementById("toggleAnimation").innerHTML = playing ? "pause Animation" : "play Animation";
    document.getElementById("toggleAnimation").style.backgroundColor = playing ? "rgb(255,100,100)" : "rgb(255,255,255)";
}

function createKFF() {
    dataKFF = {
        "frames": frames,
        "matrixX": matrixX,
        "matrixY": matrixY,
        "speed": speed,
        "data": data
    };
}

function logOutput() {
    createKFF();
    //let log = JSON.stringify(dataKFF).replace(/["\\]/g, '\\$&');
    let log = JSON.stringify(dataKFF);
    console.log(log);
    navigator.clipboard.writeText(log);
}

function importKFF(kff) {
    frames = kff.frames;
    console.log("frames: " + frames);
    matrixX = kff.matrixX;
    matrixY = kff.matrixY;
    speed = kff.speed;
    data = kff.data;
    updateColors();
    updateFrameCounter();
}