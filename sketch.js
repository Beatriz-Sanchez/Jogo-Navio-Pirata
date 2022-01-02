const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas;

function preload() {
 
}

function setup() {
  canvas = createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;
}

function draw() {
  background(189);

  Engine.update(engine);
}
