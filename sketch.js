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
var navios = [];
var dadosNavio, spritesheetNavio;
var animacaoNavio = [];
var dadosRespingo, spritesheetRespingo;
var animacaoRespingo = [];

function preload() {
  fundoImg = loadImage("./assets/background.gif");
  torreImg = loadImage("./assets/tower.png");
  dadosNavio = loadJSON("assets/boat/boat.json");
  spritesheetNavio = loadImage("assets/boat/boat.png");
  dadosRespingo = loadJSON("assets/water_splash/water_splash.json");
  spritesheetRespingo = loadImage("assets/water_splash/water_splash.png");
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

  var quadrosNavio = dadosNavio.frames;
  for (var i = 0; i < quadrosNavio.length; i++) {
    var pos = quadrosNavio[i].position;
    var img = spritesheetNavio.get(pos.x, pos.y, pos.w, pos.h);
    animacaoNavio.push(img);
  }

  var waterSplashFrames = dadosRespingo.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = spritesheetRespingo.get(pos.x, pos.y, pos.w, pos.h);
    animacaoRespingo.push(img);
  }

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
    mostrarBala(balas[i],i);
    colisaoComNavios(i);
  }

  canhao.display();

  mostrarNavios();
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
function mostrarBala(bala, indice){
  if(bala){
    bala.display();
    bala.animar();
    if (bala.body.position.x >= width || bala.body.position.y >= height - 50) {
      bala.remover(indice);
    }
  }
}

function mostrarNavios(){
  if (navios.length > 0){

    if (navios[navios.length - 1] === undefined ||
      navios[navios.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      navio = new Navio(width, height - 100, 170, 170, position,animacaoNavio);
  
      navios.push(navio);
    }
    
    for (var i = 0; i < navios.length; i++) {
      if (navios[i]) {
        Matter.Body.setVelocity(navios[i].body, {x: -0.9,y: 0});
        navios[i].display();
        navios[i].animar();
      }
    }
  } else {
    navio = new Navio(width-79, height-60,170,170,-60,animacaoNavio);
    navios.push(navio);
  }
}
function colisaoComNavios(indice) {
  for (var i = 0; i < navios.length; i++) {
    if (balas[indice] !== undefined && navios[i] !== undefined) {
      var colisao = Matter.SAT.collides(balas[indice].body, navios[i].body);

      if (colisao.collided) {
        navios[i].remover(i);
        Matter.World.remove(world, balas[indice].body);
        delete balas[indice];
      }
    }
  }
}
