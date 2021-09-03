//loading the player, track, and boundaries
var player;
var playerMoving; 
var track;
var trackImg;
var boundary1;
var boundary2;
var edges;
//Loading the sprites, images, and groups
var bomb, coin, energyDrink ;
var drinkImg , coinImg, bombImg;
var bombG, drinkG, coinG ;
//game over image
var gameOverImg;
var restartImg;
//Game states
var PLAY = 1;
var END = 0;
var gameState = 1;

var score, highScore;

function preload(){
  //pre-load images
  playerMoving = loadAnimation("Runner-1.png", "Runner-2.png");
  trackImg = loadImage("path.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  drinkImg = loadImage("energyDrink.png");
  restartImg = loadImage("Restart.png");
  gameOverImg = loadImage("gameOver.png");
}
 
function setup(){
  createCanvas(500,570);
  //create sprites here
  track = createSprite(200,200,800,800);
  track.addImage(trackImg);
  edges = createEdgeSprites();
  boundary1 = createSprite(0, 200, 50, 600);
  boundary1.visible = false;
  boundary2 = createSprite(400, 200, 50, 600);
  boundary2.visible = false;
  player = createSprite(100,500,20,50);
  player.addAnimation("running", playerMoving);
  player.scale = 0.075;
  player.y = 470
  gameOverImg.scale = 1.5;

  bombG = new Group();
  coinG = new Group();
  drinkG = new Group();

  score = 0;
  highScore = 0;
  restart = createSprite (250, 350);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.2;
  restart.debug = true;
}

function draw() {
  
  if (gameState == PLAY) {
    background(0);
    player.velocityX = 0;
    console.log(player.x);
    //player.x = World.mouseX;
    player.collide(boundary1);
    player.collide(boundary2);
    track.velocityY = 3;
    if (track.y > 400) {
      track.y = track.height/3;
    }
    player.collide(edges[3]);

    if (keyDown("right")) {
       player.velocityX = 7;
    }

    if (keyDown("left")) {
      player.velocityX = -7;
   }

    createBomb();
    createCoin();
    createDrink();

    if (highScore < score || highScore === score) {
       highScore = score;   
    }

    if (coinG.isTouching(player)) {
       coinG.destroyEach();
      score = score + 10;
    }
    else if (drinkG.isTouching(player)) {
      drinkG.destroyEach();
      score = score + 20;
      speedBrust();
    }
    else if (bombG.isTouching(player)) {
      gameState = END;
     }
    }

    if (gameState == END) {

      player.addAnimation("running",gameOverImg);
      player.scale = 0.9;
      player.x = 250;
      player.y = 285;
      restart.visible = true;
      drinkG.destroyEach();
      //drinkG.setVelocityYEach(0);
      bombG.destroyEach();
      //bombG.setVelocityYEach(0);
      coinG.destroyEach();
     // coinG.setVelocityYEach(0);
      track.velocityY = 0;
     
      if (mousePressedOver(restart)) {
        console.log("mouse pressed");
         reset();
      }


    }

  stroke(0);
  fill(255);
  text("Score:" + score, 400, 20,);
  
  stroke(0);
  fill(255);
  text("High Score:" + highScore, 400, 35,);


  drawSprites();

}

  function createDrink() {
  if (World.frameCount %220 == 0) {
  var drink = createSprite(Math.round(random(170, 330)), 40, 10, 10);
  drink.addImage(drinkImg);
  drink.scale = 0.12;
  drink.velocityY = 4;
  drink.lifetime = 125;
  drinkG.add(drink);
  } 
}

function createCoin() {
  if (World.frameCount%150 == 0) {
    var coin = createSprite(Math.round(random(170, 330)), 40, 10, 10);
    coin.addImage(coinImg);
    coin.scale = 0.3;
    coin.velocityY = 4;
    coin.lifetime = 125;
    coinG.add(coin);
  }
}

function createBomb() {
  if (World.frameCount%  360 == 0 ) {
    var bomb = createSprite(Math.round(random(170,330)), 40, 10, 10);
    bomb.addImage(bombImg);
    bomb.scale = 0.12;
    bomb.velocityY = 4;
    bomb.lifetime = 125;
    bombG.add(bomb);
  }

}

function speedBrust() {
player.velocityX = 35;
if (player.isTouching(coinG) || player.isTouching(bombG)) {
   player.velocityX = 7;

 }
}

function reset() {
  gameState = PLAY;
  restart.visible = false ;
  bombG.destroyEach();
  coinG.destroyEach();
  drinkG.destroyEach();
  score = 0;
  player.addAnimation("running", playerMoving);
  player.scale = 0.075;
  player.y = 470
}


/*function reset() {
  gameState = PLAY;
  restart.visible = false ;
  player.changeAnimation("running", playerMoving);
  bombG.destroyEach();
  coinG.destroyEach();
  drinkG.destroyEach();
  score = 0;
}*/