
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0
var ground, groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400,400);
  
  //creating monkey and ground
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;
  console.log(ground.x)
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score=0;
  
}


function draw() {
  
 //creating background
  background("lightBlue")
  
  if(keyDown("space") && monkey.y>=314){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.9;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50)
  
  if(ground.x<0){
    ground.x= ground.width/2
  }
  console.log(monkey.y)
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY=0;
    ground.velocityX=0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground)
  
  spawnobstacles();
  spawnFood();
  
  drawSprites();
}
  function spawnFood(){
  
    if (World.frameCount % 80 == 0) {
    food=createSprite(400,240,20,20)
    food.scale=0.1
    var r=Math.round(random(1,4))
    food.velocityX=-6;
    food.addImage(bananaImage)
    food.lifetime=67
    monkey.depth = food.depth
    monkey.depth = monkey.depth+1
    FoodGroup.add(food)
    }
}
function spawnobstacles(){
   if (World.frameCount % 300 == 0) {
    obstacle=createSprite(400,330,20,20)
    obstacle.scale=0.1
    var r=Math.round(random(1,4))
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage)
    obstacle.lifetime=67
    obstacleGroup.add(obstacle)
}
}