class Boat{
  constructor(x,y,width,height,boatPos,boatAnimation){
    this.body = Bodies.rectangle(x,y,width,height);
    World.add(world,this.body);
      
    this.width = width;
    this.height = height;
    this.boatPos = boatPos;
    this.image = loadImage("./assets/boat/boat1.png");
    this.animation = boatAnimation;
    this.speed = 0.05;
  }

  animate() {
    this.speed += 0.05;
  }

  display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);
    
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index],0,this.boatPos,this.width,this.height);
    pop();
  }

  remove(index){
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete boats[index];
  }, 2000);
  }
}