var rainDensity = 1;
var duration = 2

function rain() {
    var rainDiv = document.getElementById("rain");
    for (var i = 0; i < 99; i += (Math.random() / rainDensity) * (1500 / window.innerWidth)) {
        var span = '<i class="fa fa-heart heartdrop" style="font-size:48px;color:red; left:' + i * 0.94 + '%;animation-delay: ' + Math.random() + 's;' +
            'animation-duration: ' + (Math.random() * 2 + 0.5) * duration + 's; bottom: ' + (100) + '%;"></i>';
        rainDiv.innerHTML += span;
    }
}