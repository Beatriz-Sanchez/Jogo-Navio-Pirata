class Canhao {
  constructor(x,y,largura,altura,angulo){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.angulo = angulo;
    this.canhao_img = loadImage("./assets/canon.png");
    this.canhao_base = loadImage("./assets/cannonBase.png");
  }
  display(){
    //cano do canhão
    push();
    imageMode(CENTER);
    image(this.canhao_img,this.x, this.y, this.largura,this.altura);
    pop();

    //corpo do canhão
    image(this.canhao_base,70,20,200,200);
  }
}