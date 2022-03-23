var rainDensity = 1.5;
var duration = 2.5;
var size = 1;
var overlay = 5;

var state = 0;
var text = ["I", "LOVE", "COOKIE"];
var display = document.getElementById("overlay");
var cloudflare = "cloudfare wtf please fix this";

function textNext() {
    display.textContent = text[state];
    if (state == text.length - 1) {
        state = 0;
    } else {
        state++;
    }
}

function rain() {
    var rainDiv = document.getElementById("rain");
    for (var i = 0; i < 99; i += (Math.random() / rainDensity) * (1500 / window.innerWidth)) {
        var span = '<i class="fa fa-heart heartdrop" style="font-size:' + ((Math.random() * 25) + 1) * size + 'px;color:red; left:' + i * 0.94 + '%;animation-delay: ' + Math.random() + 's;' +
            'animation-duration: ' + (Math.random() * 2 + 0.5) * duration + 's; bottom: ' + (100) + '%;z-index: ' + Math.floor(Math.random() * overlay - (overlay - 1)) + ';"></i>';
        rainDiv.innerHTML += span;
    }
}

function next() {
    setTimeout(function() {
        textNext();
        next();
    }, 1000);
}

next();