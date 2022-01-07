class Cannon {
  constructor(x,y,width,height,angle){
    this.x = x;
    this.y = y;
    this. width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_img = loadImage("./assets/canon.png");
    this.cannon_base = loadImage("./assets/cannonBase.png");
  }
  display(){
    //cano do canhão
    push();
    imageMode(CENTER);
    image(this.cannon_img,this.x, this.y, this.width,this.height);
    pop();

    //corpo do canhão
    image(this.cannon_base,70,20,200,200);
  }
}