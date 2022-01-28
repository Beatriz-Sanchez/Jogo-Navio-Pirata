class Navio{
  constructor(x,y,largura,altura,navioPos){
    this.body = Bodies.rectangle(x,y,largura,altura);
    World.add(world,this.body);
      
    this.largura = largura;
    this.altura = altura;
    this.navioPos = navioPos;
    this.imagem = loadImage("./assets/boat/boat1.png");
  }
  display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.imagem,0,this.navioPos,this.largura,this.altura);
    pop();
  }

  remover(indice){
    setTimeout(() => {
      Matter.World.remove(world, navios[indice].body);
      delete navios[indice];
  }, 2000);
  }
}