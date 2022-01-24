const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var fundoImg, torreImg;
var solo, torre, canhao, bala, navio;
//angulo inicial do canhão
var angulo = 20;
//matriz das balas
var balas = [];

function preload() {
  fundoImg = loadImage("./assets/background.gif");
  torreImg = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  //criando solo e torre
  var options = {
    isStatic: true
  };
  solo = Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,solo);
  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);

  canhao = new Canhao(180,110,130,100,angulo);

  navio = new Navio(width-79, height-60,170,170,-80);

  angleMode(DEGREES);
}

function draw() {
  image(fundoImg, 0, 0, 1200, 600);

  Engine.update(engine);

  //desenhando o solo
  rect(solo.position.x,solo.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(torreImg,torre.position.x,torre.position.y,160,310);
  pop();

  //mostrando as balas de canhão
  for (var i = 0; i < balas.length; i++) {
    mostrarBala(balas[i]);
  }

  canhao.display();

  Matter.Body.setVelocity(navio.body, {x: -0.9,y:0});

  navio.display();
}

//se a tecla para baixo for apertada, uma bola é criada
function keyPressed(){
  if (keyCode === DOWN_ARROW){
    var bala = new Bala(canhao.x, canhao.y+4);
    balas.push(bala);
  }
}

//se a tecla para baixo for solta uma bola é atirada
function keyReleased(){
  if (keyCode === DOWN_ARROW){
    balas[balas.length - 1].atirar();
  }
}

//função para mostrar cada bala
function mostrarBala(bala){
  if(bala){
      bala.display();
  }
}
