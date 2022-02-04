const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var backgroundImg, towerImg;
var ground, tower, cannon, ball, boat;
var angle = 20;
var balls = [];
var boats = [];
var boatSpritedata, boatSpritesheet;
var boatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;
var brokenBoatAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;
var waterSplashAnimation = [];
var isGameOver = false;//novo


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");
  waterSplashSpritedata = loadJSON("assets/water_splash/water_splash.json");
  waterSplashSpritesheet = loadImage("assets/water_splash/water_splash.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,ground);

  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower);

  cannon = new Cannon(180,110,130,100,angle);

  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }

  angleMode(DEGREES);
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);

  Engine.update(engine);

  rect(ground.position.x,ground.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(towerImg,tower.position.x,tower.position.y,160,310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
  }

  cannon.display();
  showBoats();

}
function keyPressed(){
  if (keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y+4);
    balls.push(cannonBall);
  }
}
function keyReleased(){
  if (keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}
function showCannonBalls(ball,index){
  if(ball){
    ball.display();
    ball.animate();
    if (ball.body.position.y >= height - 60) {
      ball.remove(index);
    }
    if (ball.body.position.x >= width){
      Matter.World.remove(world, balls[index].body);
      delete balls[index];
    }
  }
}
function showBoats(){
  if (boats.length > 0){

    if (boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      boat = new Boat(width, height - 100, 170, 170, position,boatAnimation);
  
      boats.push(boat);
    }
    
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x: -0.9,y: 0});
        boats[i].display();
        boats[i].animate();

        //novo
        var collision = Matter.SAT.collides(tower, boats[i].body);
        if (collision.collided && !boats[i].isBroken) {
          isGameOver = true;
          gameOver();
        }
      }
    }
  } else {
    boat = new Boat(width-79, height-60,170,170,-60,boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
         if(!boats[i].isBroken && !balls[index].isSink){
          boats[i].remove(i);
          i--;
        }
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
