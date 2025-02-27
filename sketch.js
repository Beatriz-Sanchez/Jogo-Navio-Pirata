const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var fundoImg, torreImg;
var solo, torre, canhao, bala;
var angulo = 20;

function preload() {
  fundoImg = loadImage("./assets/background.gif");
  torreImg = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  };
  solo = Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,solo);

  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);

  canhao = new Canhao(180,110,130,100,angulo);
  bala = new Bala(canhao.x,canhao.y);
}

function draw() {
  image(fundoImg, 0, 0, 1200, 600);

  Engine.update(engine);

  rect(solo.position.x,solo.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(torreImg,torre.position.x,torre.position.y,160,310);
  pop();

  canhao.display();
  bala.display();
}
