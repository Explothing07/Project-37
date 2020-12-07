var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var highScore;

var PLAY;
var END;
var gameState;

var gameOverImage;
var restartImage;

var gameOver
var restart

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-10, displayHeight-10);
  
  trex = createSprite(displayWidth/4,displayHeight/3,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2,displayHeight/2,displayWidth,20);
  
  invisibleGround = createSprite(displayHeight/2,ground.y+4,1000000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  highScore = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  var displayEnd = (displayWidth/2)-100;
  gameOver = createSprite(displayEnd,displayHeight/3,10,10);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 1/2;
  gameOver.visible = false;
  
  restart = createSprite(gameOver.x,gameOver.y+50,15,15);
  restart.addImage("restart",restartImage);
  restart.scale = 1/2;
  restart.visible = false;
}

function draw() {
  background(180);

  camera.x = trex.x;
  camera.y = trex.y;
  
  if(gameState === PLAY){

  gameOver.x = trex.x;
  restart.x = trex.x;

  ground.addImage("ground",groundImage);
  ground.x = trex.x;

  trex.velocityX = 4;
  
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")&&trex.y>=invisibleGround.y-40) {
    trex.velocityY = -12;
  }
    
  spawnObstacles();
  spawnClouds();
    
  if(obstaclesGroup.isTouching(trex)){
     gameState=END
  }
  
  }else
  if(gameState === END){
    
  trex.changeAnimation("collided");
    
  trex.velocityX = 0;
    
  ground.velocityX = 0;
  
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
    
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    
  gameOver.visible = true;
  restart.visible = true;
    
  if(mousePressedOver(restart)){
    reset();
  }
  }
  
  text("Score: "+ score, trex.x,displayHeight/12);
  text("Highscore: "+highScore,trex.x,displayHeight/10);
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);

  drawSprites();
}

function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  if(highScore<=score){
    highScore = score;
  }
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(trex.x+displayWidth/2,ground.x-60,40,10);
    cloud.y = Math.round(random(ground.y-200,ground.y-160));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1000;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x+displayWidth/2,ground.y-10,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 1000;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}