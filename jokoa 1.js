document.addEventListener('keydown', function(evento){
    if(evento.keyCode ==32){
        
        console.log("salta");

        if(nivel.muerto==false){
            if(mario.saltando==false){

                saltar();
             }
    
            
        }
         else{
            nivel.velocidad=9;
            sol.velocidad=1;
            tubo.x = ancho+ 100;
            sol.x=ancho+100;
           
            nivel.marcador=0;

            nivel.muerto=false;
         


        }
    }
    
});

var imgMario, imgTube, imgFondo;
function cargaImagenes(){
    imgMario =new Image();
    imgTubo =new Image();
    imgFondo =new Image();
    imgSol =new Image();

    imgMario.src="img/mario.png.png";
    imgTubo.src="img/tubo.png";
    imgFondo.src="img/fondo.png";
    imgSol.src="img/sol.png";
    
   

}

var ancho = 700;
var alto =300;
var canvas,ctx;


function inizializa(){
canvas =document.getElementById("canvas");
ctx = canvas.getContext("2d");
cargaImagenes();

}

function borracanvas(){
    canvas.width = ancho;
    canvas.height = alto;
    
}
var suelo=158;
var mario = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel ={velocidad:9, marcador:0, muerto:false};
var tubo= {x: ancho + 100 , y: suelo+20, velocidad:5};
var sol ={x:400, y:60, velocidad:1 };
var fondog= {x:0, y:0};




function dibujaMario(){
    ctx.drawImage(imgMario,0,0,256,256,100,mario.y,70,70);

}



function dibujaTubo(){
    ctx.drawImage(imgTubo,0,0,1343,1651,tubo.x,tubo.y,50,50);

}

function logicaTubo(){
    if(tubo.x < -100){
        tubo.x = ancho+ 100;
        nivel.marcador++;
        nivel.velocidad++;

    }
    else{
        tubo.x -=nivel.velocidad;
    }


}

function dibujaFondo(){
    ctx.drawImage(imgFondo,0,0,1024,512,0,0,700,300);

}

function dibujaSol(){
    ctx.drawImage(imgSol,0,0,512,512,sol.x,sol.y,60,60);

}

function logicaSol(){
    if(sol.x < -100){
        sol.x = ancho+ 100;

    }
    else{
        sol.x -=sol.velocidad;
    }


}


function saltar(){
    mario.saltando = true;
    mario.vy=mario.salto;

}
//................mario.......................



function gravedad(){
    if (mario.saltando == true){

        if(mario.y - mario.vy - mario.gravedad > suelo){
            mario.saltando =false;
            mario.vy =0;
            mario.y=suelo;

        }
        else{
            mario.vy-=mario.gravedad;
            mario.y-= mario.vy;

        }

    
        
        
    }


}

function colision(){
    if(tubo.x >= 100 && tubo.x <=170){
        if(mario.y >= 138){
            nivel.muerto=true;
            nivel.velocidad = 0;
            sol.velocidad=0;
        }

    }

}

function puntuacion(){

    ctx.font="30px impact";
    ctx.fillStyle='#55555';
    ctx.fillText(`${nivel.marcador}`,600,50);

    if(nivel.muerto ==true){
        ctx.font = "60px impact";
        ctx.fillText(`YOU LOSE`,240,150);
    }
    
}

var FPS= 50;

setInterval(function(){
    principal();
},1000/FPS);


function principal(){
    borracanvas();
    gravedad();
    colision();
    logicaTubo();
    logicaSol();
    dibujaFondo();
    dibujaTubo();
    dibujaSol();
    dibujaMario();
    puntuacion();
  

}