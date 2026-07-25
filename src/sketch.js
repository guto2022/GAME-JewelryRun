var path, boy, cash, diamonds, jewelery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jeweleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jeweleryG, swordGroup;

//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;
var gameSpeed = 0;

function preload(){
  pathImg = loadImage("assets/road.png");
  boyImg = loadAnimation("assets/runner1.png","assets/runner2.png");
  cashImg = loadImage("assets/cash.png");
  diamondsImg = loadImage("assets/diamonds.png");
  jeweleryImg = loadImage("assets/jewel.png");
  swordImg = loadImage("assets/sword.png");
  endImg =loadAnimation("assets/fimdeJogo.png");
}

function setup(){
  
  //crie uma tela
  createCanvas(windowWidth, windowHeight);

  //plano de fundo se movendo
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //crie o menino correndo
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  //Botão para recomeçar o jogo ao perder
  restartButton = createButton("Recomeçar");
  restartButton.position(width / 2 - 55, height / 2 + 130);
  restartButton.size(110, 38);
  restartButton.style("font-size", "16px");
  restartButton.mousePressed(restartGame);
  restartButton.hide();
    
  cashG=new Group();
  diamondsG=new Group();
  jeweleryG=new Group();
  swordGroup=new Group();

}

function draw() {
  if(gameState===PLAY){
    background(0);
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    gameSpeed = treasureCollection / 500;

    path.velocityY = 4 + gameSpeed;
    cashG.setVelocityYEach(4 + gameSpeed);
    diamondsG.setVelocityYEach(4 + gameSpeed);
    jeweleryG.setVelocityYEach(4 + gameSpeed);
    swordGroup.setVelocityYEach(4 + gameSpeed);

    //código para reiniciar o plano de fundo
    if(path.y > height ){
      path.y = height/2;
    }
  
    createCash();
    createDiamonds();
    createJewelery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jeweleryG.isTouching(boy)) {
      jeweleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jeweleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jeweleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        //Aparece o botão de recomeçar
        restartButton.show();
      }
    }
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Tesouro: "+ treasureCollection, width-150, 30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4 + gameSpeed;
  cash.lifetime = 250;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4 + gameSpeed;
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
}
}

function createJewelery() {
  if (World.frameCount % 410 == 0) {
  var jewelery = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  jewelery.addImage(jeweleryImg);
  jewelery.scale=0.13;
  jewelery.velocityY = 4 + gameSpeed;
  jewelery.lifetime = 250;
  jeweleryG.add(jewelery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4 + gameSpeed;
  sword.lifetime = 250;
  swordGroup.add(sword);
  }
}

function restartGame() {
  gameState = PLAY;
  treasureCollection = 0;
  gameSpeed = 0;

  cashG.destroyEach();
  diamondsG.destroyEach();
  jeweleryG.destroyEach();
  swordGroup.destroyEach();

  path.y = height / 2;
  path.velocityY = 4 + gameSpeed;

  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.x = width / 2;
  boy.y = height - 20;

  restartButton.hide();
}