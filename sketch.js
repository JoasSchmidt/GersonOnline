const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var chao;
var corda;
var fruta;
var link,link2;

var Gerson, GersonImg, GersonIdle, GersonEat, GersonSad;
var fundo;
var Melancia;
var botao;

var vento,comer,triste,vaiCair,tutstuts;
var gear3;
var calado;
var corda2;
var botao2;
var corda3, botao3, link3;

function preload(){
  GersonImg = loadImage("images/rabbit1.png")
  fundo = loadImage("images/background.png")
  Melancia = loadImage("images/melon.png")
  GersonIdle = loadAnimation("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png")
  GersonSad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  GersonEat = loadAnimation("images/eat.png","images/eat2.png","images/eat3.png","images/eat4.png","images/rabbit1.png")
  GersonEat.looping = false
  GersonSad.looping = false
  vento = loadSound("sounds/air.wav")
  comer = loadSound("sounds/eating_sound.mp3")
  triste = loadSound("sounds/sad.wav")
  vaiCair = loadSound("sounds/rope_cut.mp3")
  tutstuts = loadSound("sounds/sound1.mp3")
}

function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  var options = {
    isStatic: true
  }

  chao = Bodies.rectangle(250,690,500,20,options);
  World.add(world,chao);

  corda=new Rope(8,{x:250,y:30})
  
  fruta = Bodies.circle(250,300,25,{density:0.0005})
  Composite.add(corda.body,fruta)

  link = new Link(corda,fruta)
  

  GersonIdle.frameDelay = 15
  GersonEat.frameDelay = 20
  GersonSad.frameDelay = 20



  Gerson = createSprite(400,600)
  Gerson.addAnimation("Piscaivus",GersonIdle)
  Gerson.addAnimation("Comaivus",GersonEat)
  Gerson.addAnimation("F",GersonSad)
  Gerson.scale = 0.3
  

  botao = createImg("images/cut_button.png")
  botao.size(50,50)
  botao.position(230,20)
  botao.mouseClicked(drop)

  gear3 = createImg("images/balloon.png")
  gear3.size(150,100)
  gear3.position(15,300)
  gear3.mouseClicked(suspiro)

  calado = createImg("images/mute.png")
  calado.size(50,50)
  calado.position(10,640)
  calado.mouseClicked(shiu)
  tutstuts.play()
  tutstuts.setVolume(0.3)
  
  corda2 = new Rope(6,{x:20,y:30})
  link2 = new Link(corda2,fruta)

  botao2 = createImg("images/cut_button.png")
  botao2.size(50,50)
  botao2.position(20,20)
  botao2.mouseClicked(drop2)

  corda3 = new Rope(6,{x:85,y:630})
  link3 = new Link(corda3,fruta)
  
  botao3 = createImg("images/cut_button.png")
  botao3.size(50,50)
  botao3.position(85,630)
  botao3.mouseClicked(drop3)
}

function draw(){
  background(50);
  Engine.update(engine);

 image(fundo,0,0,500,700)
  
 

  corda.show()
  imageMode(CENTER)
  
  if(fruta!=null){
  imageMode(CENTER)
  image(Melancia,fruta.position.x,fruta.position.y,60,60)
  }


  if(fruta!=null&&fruta.position.y>=650){
    Gerson.changeAnimation("F")
    triste.play()
    fruta=null
  }
  








  if(colision(fruta,Gerson)===true){
    Gerson.changeAnimation("Comaivus")
    comer.play()
  }

 
   corda2.show()
   corda3.show()

  drawSprites()
}

function drop(){
  corda.break()
  link.break()
  vaiCair.play()
}



function colision(body,sprite){
  if(fruta!=null){
    var D = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(D<=80){
      World.remove(world,fruta)
      fruta=null
      return true
    }
    else{
      return false
    }
  }
}

function suspiro(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.02,y:0})
  vento.play()
}

function shiu(){
  if(tutstuts.isPlaying()){
    tutstuts.pause()
  }
  else{
    tutstuts.play()
  }
}

function drop2(){
  corda2.break()
  link2.break()
  vaiCair.play()
}

function drop3(){
  corda3.break()
  link3.break()
  vaiCair.play()
}