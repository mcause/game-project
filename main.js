//RAM = Random Access Memory = variables 
// CPU = Central Processing Unit = logic execution
// GPU = Graphics Processing Unit = logic for images and image manipulation 
//FPS = Frames Per Second = how fast our game runs 

const debug = document.querySelector('.debug');
const canvas = document.querySelector('canvas');
// get the functions for 2d rendering on our class 
const context = canvas.getContext('2d');
// adding pictures to javascript so i am able to draw them on the canvas 
const leftGeese = new Image();
leftGeese.src = './img/geese-fly.gif'
const bkgrdImage = new Image();
const aim = new Image();
aim.src = './img/crosshairs-2.png'
const frontDuck = new Image();
frontDuck.src = './img/duckfront.png'
const beagleRet = new Image();
beagleRet.src = '/img/beagle.gif'
const gamePlay = new Image();
gamePlay.src = '/img/mainGame.JPG'
const startUp = new Image();
startUp.src = '/img/startup.jpeg'

const startButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const gameContainer = document.querySelector('.gameplay'); 
// creating a point on the x axis  
let x = 50;
//score set to 0 so you can manipulate later on 
let score = 0;
debug.innerText = `score: ${score}`;
const FPS = 60;
// this is a global object that keeps track of mouse position 
const mouse = {
    x: 0,
    y: 0
}
// grabs a rectangle based on the canvas 
const canvasRect = canvas.getBoundingClientRect();
const stageDucks = []

// when the player moves the mouse on the canvas then updates the mouse x && y 
canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX - canvasRect.left;
    mouse.y = e.clientY - canvasRect.top;
    crossHair.x = mouse.x
    crossHair.y = mouse.y 
})
//relative draw object 
class DrawObject{
    x = 50;
    y = 50;
    width = 50;
    height = 100;
    draw() {
        // if my character can move then move 
        this.move();
        context.save()
        context.translate(this.x, this.y);
        //set the draw color of my canvas to my color
        context.fillStyle = this.color;
         // checking the image then drawing it
        if(this.img){
            context.drawImage(this.img, 0, 0, this.width, this.height)
        }
        else if(!this.isCircle){
            //draw a rectangle 
            context.fillRect(0, 0, this.width, this.height);
        } else {
            context.beginPath();
            context.arc(0, 0, this.width, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        context.restore()
    }
    
    move(){
        if(this.right){
            this.x += this.speed;
        }
        if(this.left){
            this.x -= this.speed;
        }
        if(this.up){
            this.y -= this.speed;
        }
        if(this.down){
            this.y += this.speed;
        }
    }
    
    //relative coliding function can be used for multiple things 
    isCollding(obj){
        return this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.height + this.y > obj.y
    }
}

class CrossHair extends DrawObject{
    speed = 3;
    img = aim;
    isCircle = true;
    width =45;
    height= 45;
    move(){
        stageDucks.forEach((duckAround, i) => { 
            DrawObject.prototype.move.apply(this);
            if(this.isCollding(duckAround) && this !== duckAround){
                // ramdom moving ducks around the canvas(screen)
                duckAround.x = Math.random() * canvas.width;
                duckAround.y = Math.random() * canvas.height;
                stageDucks.splice(i, 1);
                score++;
            // }else if(this.isCollding(flyingDuck) && this !== flyingDuck){
            //     flyingDuck.x = Math.random() * canvas.width;
            //     stageDucks.splice(i, 1);
            //     score++; 
            // }

                debug.innerText = `score: ${score}`;
            }
        })
    }
}

class DuckAround extends DrawObject{
    constructor(){
        super()
        this.x = Math.random()* canvas.width
        this.y = Math.random()* canvas.height
        this.height = 20;
        this.width = 20;
    }
    move(){
        this.height += 1.5;
        this.width +=1.5;
        if(this.height > 105){
            stageDucks.splice(stageDucks.indexOf(this), 1)
        }
   }
    img = frontDuck
    isCircle = true;
    width = 90;
    height = 85;
    x = 500;
    y = 400;
}
// use the DrawObject funtion to create a flyingDuck class 
class FlyingDuck extends DrawObject{
    img = leftGeese
    x = 850 
    width = 100
    height = 100
    direction = 1; 
    move(){
        this.x -=2.2*this.direction
    }
}

const flyingDuck = new FlyingDuck();
const crossHair = new CrossHair();
const retrieverDog = new DrawObject();
retrieverDog.y = 20;
retrieverDog.x = 50;
// retrieverDog.color = yellow;
const duckAround = new DuckAround();

// listen for input if condition is met then make crosshair follow
window.addEventListener('keydown', e => {
    console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        crossHair.right = true;
    }
    if(e.key == 'ArrowLeft'){
        crossHair.left = true;
    }
    if(e.key == 'ArrowUp'){
        crossHair.up = true;
    }
    if(e.key == 'ArrowDown'){
        crossHair.down = true;
    }
});

//Listen for a keypress not pressed  if the condition is met 
window.addEventListener('keyup', e => {
    console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        crossHair.right = false;
    }
    if(e.key == 'ArrowLeft'){
        crossHair.left = false;
    }
    if(e.key == 'ArrowUp'){
        crossHair.up = false;
    }
    if(e.key == 'ArrowDown'){
        crossHair.down = false;
    }
    stageDucks.push(new Duck)
});

// setting a cariable to the initial amount of ducks to appear 
let duckSpawnCount = 0;
// creating a variable to the max amount of ducks to appear 
let maxDuckspawnCount = 20;

//pushing objects into stageDucks 
stageDucks.push(crossHair, retrieverDog, duckAround, flyingDuck)

// function that draws my images to the screen 
function draw(){
    // clears the screen so we can play again
    context.clearRect(0, 0, canvas.width, canvas.height)
    //Drawing each object that is within stageDucks to the canvas 
    stageDucks.forEach(obj => obj.draw());
    // mainMenu.draw()
    duckSpawnCount++
    if(duckSpawnCount >= maxDuckspawnCount){
        stageDucks.push(new DuckAround)
        duckSpawnCount = 0
    }
    setTimeout(draw, 1000 / FPS);
}

// startButton.addEventListener('click', () => {
//     mainMenu.classList.add('hidden');
//     gameContainer.classList.remove('hidden');
    
// });

draw();
