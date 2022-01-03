
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine;
var world;
var bg,bgimg;
var rocket,rocketimg;
var bullet;
var starimg,star;
var line;
var score=0;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameOver;
var reset;
var gameOverimg,resetimg;

function preload(){
bgimg = loadImage("bg.png");
rocketimg = loadImage("rocket.png.png");
starimg = loadImage("star.png");
resetimg = loadImage("restart.png");
gameOverimg = loadImage("gameOver.png")

}

function setup() {
	createCanvas(windowWidth,windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
 bg = createSprite(165,485,1,1);
 bg.addImage(bgimg);
 bg.scale = 1.3;

 rocket = createSprite(600,500,20,50);
 rocket.addImage(rocketimg);
 rocket.scale = 0.09;

 gameOver = createSprite(650,200);
 gameOver.addImage(gameOverimg);
 gameOver.scale = 0.8;
 gameOver.visible=false;

 reset = createSprite(650,250);
 reset.addImage(resetimg);
 reset.scale = 0.6;
 reset.visible=false;

 starGroup = new Group();
 
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  if(gamestate==PLAY){
    if(keyDown("right_arrow")){
    rocket.x=rocket.x+10
    }
  
    if(keyDown("left_arrow")){
    rocket.x=rocket.x-10
    }
  
    if(starGroup.isTouching(rocket)){
    for(var i=0;i<starGroup.length;i++){
  
      if(starGroup[i].isTouching(rocket)){
      starGroup[i].destroy();
      score=score+1
      }
    }
    }
    points();
    Line();
  
  }


  
  if(starGroup.isTouching(line)){
      for(var i=0;i<starGroup.length;i++){
       if(starGroup[i].isTouching(line)){
        gamestate=END;
       }
      }
  }
  
    if(gamestate == END){
      gameOver.visible = true;
      reset.visible = true;
      starGroup.setVelocityYEach(0);
    }

    if(mousePressedOver(reset)){
    restart();
    }
  
  drawSprites();
  Score();
}

function restart(){
  gamestate=PLAY;
  reset.visible=false;
  gameOver.visible=false;
  starGroup.destroyEach();
  score=0;
}
function points(){
  if(frameCount%40===0){
    star = createSprite(random(100,1100),random(100,100),40,40)
    star.addImage(starimg)
    star.scale=0.05;
    star.velocityY=3;
    star.lifetime = 400;
    starGroup.add(star);
  }

}



function Score(){
  if(rocket.isTouching(starGroup)){
  score+=1;
  }
  textSize(30);
  fill("black");
  text("score : "+ score,200,50);
}

function Line(){
  line = createSprite(10,650,2900,50);
}

