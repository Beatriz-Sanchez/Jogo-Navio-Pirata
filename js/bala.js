class Bala {
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
  atirar() { 
    var novoAngulo = canhao.angulo*PI/180-0.5;
    var velocidade = p5.Vector.fromAngle(novoAngulo);
    velocidade.mult(0.4);
    Matter.Body.setStatic(this.body,false);
    Matter.Body.setVelocity(this.body,{
      x: velocidade.x * 180/PI,
      y: velocidade.y * 180/PI
    });
  }
}