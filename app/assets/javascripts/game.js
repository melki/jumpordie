function load() {
    // fonction servant à animer le tout (mieux que setIntervalle)
    window.requestAnimFrame = (function () {
           return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
           window.setTimeout(callback, 20)
    }})();
  

//constante
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var lvl = 1;
var baseSpeed = 10;
var cube;
var c1 = new Array();
var c2 = new Array();
var speed = new Array();
var sol = new Array();
var ciel = new Array();
var creation=0;

 
$.getJSON('lvl.json', function(data) {
    var nbLvl = data.nbLvl
    for (var i = 1; i <= nbLvl; i++) {
       
        c1[i] = data.lvl[i].c1;
        c2[i] = data.lvl[i].c2;
        sol[i] = data.lvl[i].sol;
        ciel[i] = data.lvl[i].ciel;
        speed[i] = data.lvl[i].speed;

       
         };
    animate();
});

//c'est parti


function animate() 
{
    if(creation!=1)
        {
            creation=1;
            createCube(sol[lvl],c1[lvl],speed[lvl]);
        }
    requestAnimFrame(animate);
    clearCanvas(ctx);
    moveCube();
    drawBackground(ciel[lvl],sol[lvl],c1[lvl],c2[lvl]);
    drawCube(c2[lvl]);

}

function createCube(sol,c1,speed) 
{
    cube = {
            "color": c1,
            "posX": 0,
            "posY": sol-20,
            "dx": speed * baseSpeed,
            "dy": 0
            }
}

function drawBackground(ciel,sol,c1,c2)
{
    ctx.fillStyle = c1;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = c2;
    ctx.fillRect(0,0,width,ciel);
    ctx.fillRect(0,sol,width,height-sol);

}

function moveCube()
{
    cube.posX=cube.posX+cube.dx;
    cube.posY=cube.posY+cube.dy;

}

function drawCube(c2)
{
    ctx.fillStyle = c2;
    
    ctx.fillRect(cube.posX,cube.posY,20,20);
}


function clearCanvas(ctx) 
{
    ctx.clearRect(0, 0, width, height)
}


}

window.addEventListener("load", load, true);