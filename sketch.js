const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var ground;

function preload() {
 
}

function setup() {
  canvas = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  var ground_options = {
    isStatic: true
  };
  ground = Bodies.rectangle(0,height-1,width*2,1,ground_options);
  World.add(world,ground);
}

function draw() {
  background(189);

  Engine.update(engine);

  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,width*2,1);
}
