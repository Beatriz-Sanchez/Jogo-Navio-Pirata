class CannonBall {
  constructor(x,y){
    var options = {
      isStatic:true
    };
    this.r = 15;
    this.body = Bodies.circle(x,y,this.r,options);
    World.add(world,this.body);
    this.image = loadImage("./assets/cannonball.png");
  }
  display(){
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image,pos.x,pos.y,this.r*2,this.r*2);
    pop();
  }
  shoot () { 
    var newAngle = cannon.angle*PI/180-0.5;
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.4);
    Matter.Body.setStatic(this.body,false);
    Matter.Body.setVelocity(this.body,{
      x: velocity.x * 180/PI,
      y: velocity.y * 180/PI
    });
  }

  remove(index){
    Matter.Body.setVelocity(balls[index].body, {x:0,y:0});
    setTimeout(() => {
      Matter.World.remove(world, balls[index].body);
      delete balls[index];
  }, 1000);
  }
}