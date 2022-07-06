var canvas = document.getElementById("wavefunction");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.65;

const size = 1500;
var resolution = 1;
const speed = 5;
const entropyDeepnes = 1;
var motionBlur = false;

class Grid {
    constructor(x, y, tileset) {
        this.tileset = tileset;
        this.x = x;
        this.y = y;
        this.cells = [];
        for (var y = 0; y < this.y; y++) {
            this.cells.push([]);
            for (var x = 0; x < this.x; x++) {
                this.cells[y].push(new Cell(this.tileset));
            }
        }
    }
    draw() {
        for (var y = 0; y < this.y; y++) {
            for (var x = 0; x < this.x; x++) {
                let cell = this.cells[y][x];
                if (cell.collapsed) {
                    ctx.save();
                    ctx.translate(x * canvas.width / this.x + canvas.width / this.x / 2, y * canvas.height / this.y + canvas.height / this.y / 2);
                    ctx.rotate(cell.tile.rotation * -90 * Math.PI / 180);
                    let widthX = (canvas.width / this.x) / 2;
                    let widthY = (canvas.height / this.y / 2);
                    ctx.drawImage(cell.tile.image, -widthX, -widthY, 2 * widthX, 2 * widthY);
                    ctx.restore();
                } else {
                    ctx.fillStyle = "rgb(87,168,60)"
                    ctx.fillRect(x * canvas.width / this.x, y * canvas.height / this.y, canvas.width / this.x, canvas.height / this.y);
                }
            }
        }
    }
    determineEntropy() {
        for (var y = 0; y < this.y; y++) {
            for (var x = 0; x < this.x; x++) {
                var cell = this.cells[y][x];
                if (!cell.collapsed) {

                    let up = undefined
                    if (y != 0 && this.cells[y - 1][x].collapsed) {
                        up = this.cells[y - 1][x].tile.down;
                    }
                    let right = undefined
                    if (x != this.x - 1 && this.cells[y][x + 1].collapsed) {
                        right = this.cells[y][x + 1].tile.left;
                    }
                    let down = undefined
                    if (y != this.y - 1 && this.cells[y + 1][x].collapsed) {
                        down = this.cells[y + 1][x].tile.up;
                    }
                    let left = undefined
                    if (x != 0 && this.cells[y][x - 1].collapsed) {
                        left = this.cells[y][x - 1].tile.right;
                    }

                    for (var fix = 0; fix < 5; fix++) {
                        for (var i = 0; i < cell.fittingTiles.length; i++) {
                            let tile = cell.fittingTiles[i];
                            let tileFits = (
                                (up == tile.up || up == undefined) &&
                                (right == tile.right || right == undefined) &&
                                (down == tile.down || down == undefined) &&
                                (left == tile.left || left == undefined));

                            if (!tileFits) {
                                cell.fittingTiles.splice(i, 1);
                            }
                        }
                    }
                    cell.entropy = cell.fittingTiles.length;
                }
            }
        }
    }
    collapseOne() {
        this.determineEntropy();

        var lowestEntropy = this.tileset.tiles.length;
        for (var y = 0; y < this.y; y++) {
            for (var x = 0; x < this.x; x++) {
                if (this.cells[y][x].entropy < lowestEntropy && !this.cells[y][x].collapsed && this.cells[y][x].entropy != 0) {
                    lowestEntropy = this.cells[y][x].entropy;
                }
            }
        }
        var cellsWithLowestEntropy = []
        for (var y = 0; y < this.y; y++) {
            for (var x = 0; x < this.x; x++) {
                if (this.cells[y][x].entropy == lowestEntropy && !this.cells[y][x].collapsed) {
                    cellsWithLowestEntropy.push(this.cells[y][x]);
                }
            }
        }
        let cell = cellsWithLowestEntropy[Math.floor(Math.random() * cellsWithLowestEntropy.length)];
        if (cell != undefined) cell.collapse();
    }
}

class Cell {
    constructor(tileset) {
        this.collapsed = false;
        this.tileset = tileset;
        this.fittingTiles = this.tileset.copyTiles();
        this.entropy = this.fittingTiles.length;
        this.tile = undefined;
        //this.tile = this.tileset.tiles[Math.floor(Math.random() * this.tileset.tiles.length)];
    }
    collapse() {
        this.collapsed = true;
        this.tile = this.fittingTiles[Math.floor(Math.random() * this.fittingTiles.length)];
    }
}

class TileSet {
    constructor() {
        this.baseURL = "../images/wavefunction";
        let src = [
            "ccsc.png",
            "ffff.png",
            "ggcc.png",
            "ggff.png",
            "gggc.png",
            "gggf.png",
            "gggg.png",
            "scsc.png",
            "sscc.png",
            "sscs.png",
            "ssss.png",
            "ggcg.png",
            "bcbb.png",
            "bcsc.png",
            "ssbb.png",
            "sfsf.png",
            "ssgb.png",
            "sscb.png",
            "sgsg.png",
            "ssff.png",
            "bccc.png"
        ]

        this.tiles = [];
        for (let rotation = 0; rotation < 4; rotation++) {
            for (let i = 0; i < src.length; i++) {
                this.tiles.push(new Tile(this.baseURL + "/" + src[i], rotation));
            }
        }
    }
    copyTiles() {
        let tiles = [];
        for (let i = 0; i < this.tiles.length; i++) {
            tiles.push(this.tiles[i]);
        }
        return tiles;
    }
}

class Tile {
    constructor(src, rotation) {
        this.image = new Image();
        this.image.src = src;
        this.rotation = rotation;

        let rule = src.split("/");
        rule = rule[rule.length - 1].split(".")[0];
        this.rule = rule;
        rule = rule + "" + rule;
        this.up = rule.charAt((0 + rotation));
        this.right = rule.charAt((1 + rotation));
        this.down = rule.charAt((2 + rotation));
        this.left = rule.charAt((3 + rotation));
    }
}

var amount = (canvas.width / resolution) * (canvas.height / resolution);
while (amount > size) {
    resolution++;
    amount = (canvas.width / resolution) * (canvas.height / resolution);
}
console.log(resolution);


var g1 = new Grid(Math.round(canvas.width / resolution), Math.round(canvas.height / resolution), new TileSet());
console.log(g1);


function animate() {
    requestAnimationFrame(animate);
    if (motionBlur) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    g1.draw();

    for (var q = 0; q < speed; q++) {
        g1.collapseOne();
    }
}
animate();