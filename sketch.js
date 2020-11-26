var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup
var score = 0;
var survivalScore = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(200, 500, 15, 15);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(300, 590, 600, 20);

  foodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("white");
  //console.log(monkey.y);  
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 518.6) {
      monkey.velocityY = -18;
    }
    survivalScore = Math.ceil(frameCount / getFrameRate());
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score++;
    }
 if(monkey.isTouching(obstacleGroup)){
   gameState = END; 
   
 }
    
    spawnBananas();
    spawnObstacles();


    monkey.velocityY = monkey.velocityY + 0.8;
  }
if(gameState===END){ 
 foodGroup.destroyEach(); 
  obstacleGroup.destroyEach(); 
  monkey.destroy(); 
  textSize(50); 
  text("Game Over",200,400); 
}

  monkey.collide(ground);
  textSize(40);
  text("Score: " + score, 250, 150);
  text("Survival Score: " + survivalScore, 180, 190);


  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(610, random(250, 400), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.15;
    banana.lifetime = 210;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(550, 550, 15, 15);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.16;
    obstacle.lifetime = 210;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }

}