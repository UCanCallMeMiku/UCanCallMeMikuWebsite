var rainDensity = 5;
var duration = 2;
var size = 1;

function rain() {
    var rainDiv = document.getElementById("rain");
    for (var i = 0; i < 99; i += (Math.random() / rainDensity) * (1500 / window.innerWidth)) {
        var span = '<i class="fa fa-heart heartdrop" style="font-size:' + ((Math.random() * 20) + 10) * size + 'px;color:red; left:' + i * 0.94 + '%;animation-delay: ' + Math.random() + 's;' +
            'animation-duration: ' + (Math.random() * 2 + 0.5) * duration + 's; bottom: ' + (100) + '%;"></i>';
        rainDiv.innerHTML += span;
    }
}


var state = 0;
var text = ["I", "LOVE", "COOKIE", "♥"];
var display = document.getElementById("overlay");

function textNext() {
    display.style.display = "block";
    display.innerText = text[state];
    if (state == text.length - 1) {
        state = 0;
    } else {
        state++;

    }
}