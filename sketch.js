const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var tela;
var solo;

function preload() {
 
}

function setup() {
  tela = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  var solo_options = {
    isStatic: true
  };
  solo = Bodies.rectangle(0,height-1,width*2,1,solo_options);
  World.add(world,ground);
}

function draw() {
  background(189);

  Engine.update(engine);
}
