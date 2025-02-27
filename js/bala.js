class Bala {
  constructor(x,y){
    var options = {
      isStatic:true
    };
    this.r = 30;
    this.body = Bodies.circle(x,y,this.r,options);
    World.add(world,this.body);
    this.image = loadImage("./assets/cannonball.png");
  }
  display(){
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image,pos.x,pos.y,this.r,this.r);
    pop();
  }
}