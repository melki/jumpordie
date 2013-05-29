function load() {



    // fonction servant à animer le tout (mieux que setIntervalle)
    window.requestAnimFrame = (function () {
           return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
           || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame 
           || function (callback) {
           window.setTimeout(callback, 20)
    }})();
  

//constante
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.font = "40px Tahoma,Calibri,Geneva,Arial";
    ctx.fillText('Press enter to begin', 200, 180);
var width = canvas.width;
var height = canvas.height;
var lvl = 0;
var baseSpeed = 10;
var cube,nbLvl,inJump,i,j,boom=0,play=0,gameEnd=1;
var audio = document.getElementById('audio');
var c1 = new Array();
var c2 = new Array();
var speed = new Array();
var nbObstacles = new Array();
var obstacles = new Array();
var gravity = new Array();
var sol = new Array();
var ciel = new Array();
var stopY = new Array();
var stopX = new Array();
var creation=0;
var stopTheGame = 0;
var nbTry = 0;
var frame = 0;
var udontcare = 0;
var debris = new Array();
 
$.getJSON('lvl.json', function(data) 
{
    nbLvl = data.nbLvl;
    for (i = 0; i < nbLvl; i++) 
    {
       
        c1[i] = data.lvl[i].c1;
        c2[i] = data.lvl[i].c2;
        gravity[i] = data.lvl[i].gravity;
        sol[i] = data.lvl[i].sol;
        ciel[i] = data.lvl[i].ciel;
        speed[i] = data.lvl[i].speed;
        nbObstacles[i] = data.lvl[i].nbObstacles;
        if(nbObstacles[i] != 0) 
        {
            obstacles[i]=new Array();
            for (j = 0; j < nbObstacles[i]; j++) 
            {
                udontcare = data.lvl[i].obstacles[j].frame;
                obstacles[i][j]=
                {
                    "oneShot":data.lvl[i].obstacles[j].oneShot,
                    "posX":data.lvl[i].obstacles[j].posX1,
                    "posY":data.lvl[i].obstacles[j].posY1,
                    "width":data.lvl[i].obstacles[j].width,
                    "height":data.lvl[i].obstacles[j].height,
                    "posX1":data.lvl[i].obstacles[j].posX1,
                    "posX2":data.lvl[i].obstacles[j].posX2,
                    "posY1":data.lvl[i].obstacles[j].posY1,
                    "posY2":data.lvl[i].obstacles[j].posY2,
                    "frame":data.lvl[i].obstacles[j].frame,
                    "pasX":Math.abs((data.lvl[i].obstacles[j].posX1-data.lvl[i].obstacles[j].posX2)/udontcare),
                    "pasY":Math.abs((data.lvl[i].obstacles[j].posY1-data.lvl[i].obstacles[j].posY2)/udontcare),
                    "pastille":data.lvl[i].obstacles[j].pastille,
                    "pastilleActuel":data.lvl[i].obstacles[j].pastille
                };
                if(obstacles[i][j].pastille != 0)
                {
                    obstacles[i][j]=
                    {
                        "oneShot":data.lvl[i].obstacles[j].oneShot,
                        "posX":data.lvl[i].obstacles[j].posX1,
                        "posY":data.lvl[i].obstacles[j].posY1,
                        "width":data.lvl[i].obstacles[j].width,
                        "height":data.lvl[i].obstacles[j].height,
                        "posX1":data.lvl[i].obstacles[j].posX1,
                        "posX2":data.lvl[i].obstacles[j].posX2,
                        "posY1":data.lvl[i].obstacles[j].posY1,
                        "posY2":data.lvl[i].obstacles[j].posY2,
                        "frame":data.lvl[i].obstacles[j].frame,
                        "pasX":Math.abs((data.lvl[i].obstacles[j].posX1-data.lvl[i].obstacles[j].posX2)/udontcare),
                        "pasY":Math.abs((data.lvl[i].obstacles[j].posY1-data.lvl[i].obstacles[j].posY2)/udontcare),
                        "pastille":data.lvl[i].obstacles[j].pastille,       
                        "pastilleX":data.lvl[i].obstacles[j].pastilleX,
                        "pastilleY":data.lvl[i].obstacles[j].pastilleY,
                        "pastilleActuel":data.lvl[i].obstacles[j].pastille
                    };
                }
            }   
        }
        
    };
    animate();
});

//c'est parti


function animate() 
{   
    requestAnimFrame(animate);
    if(stopTheGame==1)
    {    
        if (boom==0)
        {
            if(creation!=1)
                {
                    creation=1;
                    createCube(sol[lvl],c1[lvl],speed[lvl]);
                }
            clearCanvas(ctx);
            moveCube();
            drawBackground(ciel[lvl],sol[lvl],c1[lvl],c2[lvl]);
            drawCube(c2[lvl]);
            if (nbObstacles[lvl]!=0)
            {
                drawObstacles(obstacles[lvl],nbObstacles[lvl]);
                collisionsObstacles(obstacles[lvl],nbObstacles[lvl]);
            }
            collisionsPastille(obstacles[lvl],nbObstacles[lvl]);
            collisionsCiel();
            testArrive();
            infos();
        }
        if (boom==1)
        {
            clearCanvas(ctx);
            drawBackground(ciel[lvl],sol[lvl],c1[lvl],c2[lvl]);
            if (nbObstacles[lvl]!=0)
            {
                drawObstacles(obstacles[lvl],nbObstacles[lvl]);
            }
            explosion();
            infos();
            if (frame>20) {boom=0}
        }
    }    
}

function collisionsCiel()
{
    if(cube.posY<=ciel[lvl])
    {
        avantExplosion();
    }
}

function collisionsObstacles(obstacles,nb)
{
    for (i = 0; i < nb; i++) 
    {
        if (!((cube.posX>=(obstacles[i].posX+obstacles[i].width) || ((cube.posY + 20 )<=obstacles[i].posY)
         || (cube.posY>=(obstacles[i].posY+obstacles[i].height)) || ((cube.posX+20)<=obstacles[i].posX))))
        {
           avantExplosion();
        }
    }
}
function collisionsPastille(obstacles,nb)
{
    for (i = 0; i < nb; i++) 
    {
        if (obstacles[i].pastilleActuel!=0)
        {
            if (!((cube.posX>=(obstacles[i].pastilleX+5) || ((cube.posY + 20 )<=obstacles[i].pastilleY)
             || (cube.posY>=(obstacles[i].pastilleY+5)) || ((cube.posX+20)<=obstacles[i].pastilleX))))
            {
                obstacles[i].pastilleActuel=0;
            }
        }
    }
}

function avantExplosion()
{
    nbTry+=1;
    boom=1;
    creation=0;
    
    debris[0]={"posX":cube.posX,"posY":cube.posY};
    debris[1]={"posX":cube.posX,"posY":cube.posY+5};
    debris[2]={"posX":cube.posX,"posY":cube.posY+10};
    debris[3]={"posX":cube.posX,"posY":cube.posY+15};
    debris[4]={"posX":cube.posX+5,"posY":cube.posY};
    debris[5]={"posX":cube.posX+5,"posY":cube.posY+5};
    debris[6]={"posX":cube.posX+5,"posY":cube.posY+10};
    debris[7]={"posX":cube.posX+5,"posY":cube.posY+15};
    debris[8]={"posX":cube.posX+10,"posY":cube.posY};
    debris[9]={"posX":cube.posX+10,"posY":cube.posY+5};
    debris[10]={"posX":cube.posX+10,"posY":cube.posY+10};
    debris[11]={"posX":cube.posX+10,"posY":cube.posY+15};
    debris[12]={"posX":cube.posX+15,"posY":cube.posY};
    debris[13]={"posX":cube.posX+15,"posY":cube.posY+5};
    debris[14]={"posX":cube.posX+15,"posY":cube.posY+10};
    debris[15]={"posX":cube.posX+15,"posY":cube.posY+15};
    
}

function explosion()
{
    frame+=1;
    for (var j = 0; j < 16; j++) {
        debris[j].posX+=Math.random()*20-10;
        debris[j].posY+=Math.random()*20-10;
    };
    for (j = 0; j < 16; j++) {
        ctx.fillStyle = c2[lvl];
        ctx.fillRect(debris[j].posX,debris[j].posY,5,5);
    };
       
}

function infos()
{
    ctx.fillStyle = c1[lvl];
    ctx.font = "20px Tahoma,Calibri,Geneva,Arial";
    ctx.fillText('tries : '+ nbTry, 20, 20);
}

function createCube(sol,c1,speed) 
{
    frame=0;
    inJump=0;
    for (i = 0; i < nbObstacles[lvl]; i++) {
        stopX[i]=1;
        stopY[i]=1;
    };
    for (i = 0; i < nbObstacles[lvl]; i++) {
        if (obstacles[lvl][i].pastille!=0)
        {
            obstacles[lvl][i].pastilleActuel=obstacles[lvl][i].pastille;
        }
        if (obstacles[lvl][i].oneShot==0)
        {
            obstacles[lvl][i].posX=obstacles[lvl][i].posX1;
            obstacles[lvl][i].posY=obstacles[lvl][i].posY1;
        }

    }
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
function drawObstacles(obstacles,nb)
{
    for (i = 0; i < nb; i++)
    {

        ctx.fillStyle = c2[lvl];
        ctx.fillRect(obstacles[i].posX,obstacles[i].posY,obstacles[i].width,obstacles[i].height);
       if(obstacles[i].oneShot!=0)
       {
            if (obstacles[i].posX>Math.max(obstacles[i].posX1,obstacles[i].posX2) ||
                    obstacles[i].posX<Math.min(obstacles[i].posX1,obstacles[i].posX2))
               {
                   obstacles[i].pasX=-obstacles[i].pasX;
               }
               if (obstacles[i].posY>Math.max(obstacles[i].posY1,obstacles[i].posY2) ||
                    obstacles[i].posY<Math.min(obstacles[i].posY1,obstacles[i].posY2))
               {
                   obstacles[i].pasY=-obstacles[i].pasY;
               }
        }
        else
        {
             if (obstacles[i].posX>Math.max(obstacles[i].posX1,obstacles[i].posX2) ||
                    obstacles[i].posX<Math.min(obstacles[i].posX1,obstacles[i].posX2))
               {
                   pasX[i]=0;
               }
               if (obstacles[i].posY>Math.max(obstacles[i].posY1,obstacles[i].posY2) ||
                    obstacles[i].posY<Math.min(obstacles[i].posY1,obstacles[i].posY2))
               {
                   stopY[i]=0;
               }

        }

        if (obstacles[i].pastilleActuel==0)
        {
            if(stopX[i]!=0){obstacles[i].posX+=obstacles[i].pasX;}
            if(stopY[i]!=0){obstacles[i].posY+=obstacles[i].pasY;}
        }
        if (obstacles[i].pastilleActuel!=0)
        {
            ctx.beginPath();
            ctx.fillStyle = c2[lvl];
            ctx.arc(obstacles[i].pastilleX, obstacles[i].pastilleY, 5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        
        }
    }
}


function moveCube()
{
    cube.posX+=cube.dx;
    cube.posY+=cube.dy;
    // Gravity
    if (cube.posY<sol[lvl]-20)
    {
        inJump=1;
        cube.dy+=gravity[lvl];
    }
    if (cube.posY>=sol[lvl]-20)
    {
        cube.posY=sol[lvl]-20;
        inJump=0;
        cube.dy=0;
    }

}

function jump()
{
    if (inJump==0)
    {
        inJump=1;
        cube.dy=-speed[lvl]*baseSpeed*2;
    }
    
    
}

function drawCube(c2)
{
    ctx.fillStyle = c2[lvl];
    if (inJump==0)
    {

        ctx.fillRect(cube.posX,cube.posY,20,20);
    }
    if (inJump==1) 
    {
        ctx.fillRect(cube.posX,cube.posY,20,20);
      

    }
}

function testArrive()
{
    if(cube.posX>=width)    
    {
        creation=0;
        lvl=lvl+1;
    }
    if(lvl>=nbLvl)
    {
        //audio.pause();
        gameEnd=0;
        var div = document.getElementById('whereItHappens');
        div.innerHTML = "<br><br><p>Well done, only "+nbTry+" tries !</p>"+
        "<p>Now, enter your pseudo and then click on <code>submit</code></p>"+
        "<form action='pages/score' method='POST'>"+
            "<label  for='inputPseudo'>Pseudo</label>"+
            "<input type='text' name='pseudo' id='inputPseudo' placeholder='Pseudo'><br>"+
            "<input type='hidden' id='inputTries' name='tries' value="+nbTry+"><br>"+
            "<button type='submit' class='btn btn-success'>Submit</button>"+
        "</form>";
    }    
}

function clearCanvas(ctx) 
{
    ctx.clearRect(0, 0, width, height)
}

window.onkeydown = keydownControl;

function keydownControl(e) 
{
    switch (e.keyCode) 
    {
        case 13:
            stopTheGame=Math.abs(stopTheGame - 1);
            play=Math.abs(play - 1);
            if (play) {audio.play();}
            else {audio.pause();}
        break;
        case 32:
            jump();
        break;
    }
    if(gameEnd!=0)
    {
        if (e.preventDefault) 
        {
            e.preventDefault();
            e.stopPropagation();
        } 
        else 
        {   
            e.returnValue = false;
            e.cancelBubble = true;
        }
        return false;
    }
    }


}

window.addEventListener("load", load, true);