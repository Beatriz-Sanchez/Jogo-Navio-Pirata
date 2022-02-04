class CannonBall {
  constructor(x,y){
    var options = {
      isStatic:true
    };
    this.r = 15;
    this.body = Bodies.circle(x,y,this.r,options);
    World.add(world,this.body);
    this.image = loadImage("./assets/cannonball.png");
    this.speed = 0.05;
    this.animation = [this.image];
    this.isSink = false;
  }
  animate() {
    this.speed += 0.05;
  }
  display(){
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);
    push();
    imageMode(CENTER);
    image(this.animation[index],pos.x,pos.y,this.r*2,this.r*2);
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
    this.isSink=true;
    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.r = 50;
    Matter.Body.setVelocity(this.body, {x:0,y:0});
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete balls[index];
  }, 1000);
  }
}