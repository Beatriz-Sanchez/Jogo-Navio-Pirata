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

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
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

  boat = new Boat(width-79, height-60,170,170,-80);

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
    showCannonBalls(balls[i]);
  }

  cannon.display();

  Matter.Body.setVelocity(boat.body, {x:-0.9,y:0});
  boat.display();
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
function showCannonBalls(ball){
  if(ball){
      ball.display();
  }
}
