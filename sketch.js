const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var obstaclesGroup;
var bat;
var score;
var gameState;
var backgroundImage;
var batImage;
function preload(){
    batImage = loadImage("bat.png");
    backgroundImage = loadImage("backgroundImage.png");
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;
    bat = createSprite(200,200,35,35);
    //bat.debug = true;
    bat.addImage(batImage);
    ground = createSprite(800,windowHeight,1000,20);
    ground.x = ground.width /2;
    ground.velocityX = -6;
    ground.visible = false;
    gameState = "waiting";
    score = 0;

    obstaclesGroup = new Group();    


    Engine.run(engine);
}
function draw(){
    background(backgroundImage);
    textSize(30);
    fill("Black");
    text("Score: "+score,windowWidth-1500,windowHeight-700);
    if(keyDown(CONTROL)){
        text("Controls:",windowWidth/2-500,windowHeight/2-200);
        text("Space - jump",windowWidth/2-500,windowHeight/2-100);
        text("Control - Controls",windowWidth/2-500,windowHeight/2);
    }
    if(gameState === "waiting"){
        text("Click control for the controls to start!",windowWidth/2,windowHeight/2);
        if(keyDown("Space")){
            gameState = "play";
        }
    }
    if(gameState === "play"){
        if(keyDown("Space")){
            bat.velocityY = -7;
        }
        score = score+1;
        if(obstaclesGroup.isTouching(bat)){
            gameState = "end";
        }
        bat.velocityY = bat.velocityY + 0.8;
        bat.collide(ground);
        if (ground.x < 0){
            ground.x = ground.width/2;
        }
    
        createObstacles();
    }
    if(gameState === "end"){
        bat.x = 200;
        bat.y = 200;
        obstaclesGroup.setVelocityEach(0,0);
        ground.velocityX =0;
        obstaclesGroup.setLifetimeEach(-1);
        textSize(30);
        text("Game over! Click space to restart",windowWidth/2,windowHeight/2);
        if(keyDown("Space")){
            obstaclesGroup.destroyEach();
            ground.velocityX = -6;
            score = 0;
            gameState = "play";
        }
    }

    drawSprites();
}
function createObstacles(){
    if(frameCount % 60 === 0) {
        var obstacle = createSprite(windowWidth-20,windowHeight,100,windowHeight-200);
        obstacle.shapeColor = "green";
        
        //obstacle.debug = true;
        obstacle.y = obstacle.y-Math.round(random(1,80));
        obstacle.velocityX = -6;
        
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
      }
      if(frameCount % 60 === 0) {
        var obstacle = createSprite(windowWidth-20,windowHeight-windowHeight+50,100,windowHeight-200);
        obstacle.shapeColor = "green";

        //obstacle.debug = true;
        obstacle.velocityX = -6;
        obstacle.y = obstacle.y-Math.round(random(1,80));
        
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
      }
}
