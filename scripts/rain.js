var rainDensity = 1;

function rain() {
    var rainDiv = document.getElementById("rain");
    for (var i = 0; i<99; i+=(Math.random()/rainDensity)*(1500/window.innerWidth)) {
        var span = '<div class="raindrop" style="left:'+i*1+'%;animation-delay: '+Math.random()+'s;'+
        'animation-duration: '+(Math.random()*2+0.5)+'s; bottom: '+(100)+'%;"></div>';
        rainDiv.innerHTML += span;
    }
} 