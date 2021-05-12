const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var count = 1;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);
    pig1 = new Pig(800,550)
    pig2 = new Pig(860,550)
    pig3 = new Pig(920,550)
    pig4 = new Pig(980,550)
    pig5 = new Pig(1040,550)
    pig6 = new Pig(830,520)
    pig7 = new Pig(890,520)
    pig8 = new Pig(950,520)
    pig9 = new Pig(850,470)
    pig10 = new Pig(910,470)
    pig11 = new Pig(870,440)
    

    bird = new Bird(200,250);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:250});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("red")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    pig1.display()
    pig1.score()
    pig2.display()
    pig2.score()
    pig3.display()
    pig3.score()
    pig4.display()
    pig4.score()
    pig5.display()
    pig5.score()
    pig6.display()
    pig6.score()
    pig7.display()
    pig7.score()
    pig8.display()
    pig8.score()
    pig9.display()
    pig9.score()
    pig10.display()
    pig10.score()
    pig11.display()
    pig11.score()


    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    

    if(count ==4 ){
        gameState = "end"

    }
    if(gameState=="end"){
        textSize (25)
        text("GameOver", 600,100)

    }
}

function mouseDragged(){
    if (gameState =="onSling"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && count<5){
        count++
        console.log(count)
        Matter.Body.setPosition(bird.body, {x:200 , y:50});
        bird.trajectory=[]
        gameState="onSling"
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}