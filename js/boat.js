class Boat{
  constructor(x,y,width,height,boatPos){
    this.body = Bodies.rectangle(x,y,width,height);
    World.add(world,this.body);
      
    this.width = width;
    this.height = height;
    this.boatPos = boatPos;
    this.image = loadImage("./assets/boat/boat1.png");
  }
  display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image,0,this.boatPos,this.width,this.height);
    pop();
  }

  remove(index){
    setTimeout(() => {
      Matter.World.remove(world, boats[index].body);
      delete boats[index];
  }, 2000);
  }
}