console.log("1");

var rainDensity = 1;

function rain() {
    var rainDiv = document.getElementById("rain");
    console.log("2");

    for (var i = 0; i<100; i+=(Math.random()/rainDensity)*(1500/window.innerWidth)) {
        var span = '<div class="raindrop" style="left:'+i*1+'%;animation-delay: '+Math.random()+'s;'+
        'animation-duration: '+(Math.random()*2+0.5)+'s; bottom: '+(Math.random()+100)+'%;"></div>';
        console.log(span);
        rainDiv.innerHTML += span;
    }
    console.log("3");
} 