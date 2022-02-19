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
leftGeese.src = './img/geese-fly.gif';
const bkgrdImage = new Image();
const aim = new Image();
aim.src = './img/crosshairs-2.png';
const frontDuck = new Image();
frontDuck.src = './img/duckfront.png';
const beagleRet = new Image();
beagleRet.src = '/img/beagle.gif';
const rightDuck = new Image()
rightDuck.src = './img/mallardsflying.png';
const gamePlay = new Image();
gamePlay.src = '/img/mainGame.JPG';
const startUp = new Image();
startUp.src = '/img/startup.jpeg';

// grabbing reference to certain items in the html through javaScript
const startButton = document.querySelector('.start-up button');
const mainMenu = document.querySelector('.start-up');
const gameContainer = document.querySelector('.gameplay'); 
// creating a point on the x axis  
let x = 50;
//score set to 0 so you can manipulate later on 
let score = 0;
debug.innerText = `score: ${score}`;
// creating a variable for frames per second and setting it equal to 60 
const FPS = 60;
// this is a global object that keeps track of mouse position 
const mouse = {
    x: 0,
    y: 0
}
// grabs a rectangle based on the canvas giving information about the size and position of an element 
const canvasRect = canvas.getBoundingClientRect();
const stageDucks = [];

// when the player moves the mouse on the canvas then updates the mouse x && y 
canvas.addEventListener('mousemove', e => {
    // position of the mouse on the canvas 
    mouse.x = e.clientX - canvasRect.left;
    mouse.y = e.clientY - canvasRect.top;
    //Wherever the mouse is on the screen the crosshair will be in the same position 
    crossHair.x = mouse.x;
    crossHair.y = mouse.y;
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
        //saving the default state within the funtion 
        context.save();
        context.translate(this.x, this.y);
        //set the draw color of my canvas to my color
        context.fillStyle = this.color;
         // checking the image then drawing it
        if(this.img){
            //draw the image to the canvas
            context.drawImage(this.img, -this.width * .5, -this.height * .5, this.width, this.height);
        }
        else if(!this.isDuck){
            context.fillRect(-this.width * .5, -this.height * .5, this.width, this.height);
        } else {
            //starting a new path on the canvas 
            context.beginPath();
            //Drawing a O on the canvas 
            context.arc(-this.width * .5, -this.height * .5, this.width, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        //being able to restore the funtion after invoked 
        context.restore();
    }
    //movre function 
    move(){
        //conditions if the direction is this.direction then the position is x or y plus or minus the speed 
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
    
    //relative coliding function can be used for finding the position
    // of objects once clicked or hovered over multiple things 
    isCollding(obj){
        //Object on the x or y axis being noticed 
        return this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.height + this.y > obj.y;
    }
}

class CrossHair extends DrawObject{
    speed = 3;
    img = aim;
    isDuck = true;
    width = 45;
    height= 45;
    click(){
        //callback function that occurs one time for each element in an array in order going up. 
        stageDucks.forEach((duckAround, i) => { 
            //applying the function to "this" (global object)
            DrawObject.prototype.move.apply(this);

            if(this.isCollding(duckAround) && this !== duckAround){
                // ramdom moving ducks around the canvas(screen)
                duckAround.x = Math.random() * canvas.width;
                duckAround.y = Math.random() * canvas.height;
                //removing the ducks once clicked to not re-appear
                stageDucks.splice(i, 1);
                //increasing score by one if a duck is clicked on 
                score++;
                if(score > 9){
                    alert("Not bad look like some has dinner for a few nights");
                    document.location.reload();
                    // clearInterval(interval);
                    }
                
            // }else if{(this.isCollding(flyingDuck) && this !== flyingDuck)
            //     flyingDuck.x = Math.random() * canvas.width;
            //     stageDucks.splice(i, 1);
            //     score++; 
            // }
                //Showing the score on the screen 
                debug.innerText = `score: ${score}`;
            }
        })
    }
}

class DuckAround extends DrawObject{
    //initializing the instance of DrawObject 
    constructor(){
    super()
        // ducks appreaing randomly on the x and y axis with line 137 and 138 
        this.x = Math.random()* canvas.width;
        this.y = Math.random()* canvas.height;
        this.height = 20;
        this.width = 20;
    }

    move(){
        //speed at which the ducks flying at you appear 
        this.height += 1.0;
        this.width +=1.0;
        // how big the ducks appear before they fly away 
        if(this.height > 120){
            stageDucks.splice(stageDucks.indexOf(this), 1)
        }
   }
    img = frontDuck
    isDuck = true;
    width = 90;
    height = 85;
    x = 500;
    y = 400;
}
// use the DrawObject funtion to create a flyingGeese class 
class FlyingGeese extends DrawObject{
    img = leftGeese;
    x = 850;
    y = 100;
    width = 100;
    height = 100;
    direction = 1; 
    //rate of speed the geese fly across the screen 
    move(){
        this.x -=1.8 *this.direction;
    }
}

class RightDuck extends DrawObject{
    img = rightDuck;
    x = -150;
    y = 200;
    width = 100;
    height = 100;
    direction = -1;
    // the rate of speed at which the ducks are flying across 
    move(){
        this.x -= 2.2* this.direction;
    }

}

const rightMallard = new RightDuck();
const flyingGeese = new FlyingGeese();
const crossHair = new CrossHair();
const duckAround = new DuckAround();

// listen for input if condition is met then make crosshair follow
// window.addEventListener('keydown', e => {
//     console.log(e);
//     e.preventDefault();
//     if(e.key == 'ArrowRight'){
//         crossHair.right = true;
//     }
//     if(e.key == 'ArrowLeft'){
//         crossHair.left = true;
//     }
//     if(e.key == 'ArrowUp'){
//         crossHair.up = true;
//     }
//     if(e.key == 'ArrowDown'){
//         crossHair.down = true;
//     }
// });

//Listen for a keypress not pressed  if the condition is met 
// window.addEventListener('keyup', e => {
//     console.log(e);
//     e.preventDefault();
//     if(e.key == 'ArrowRight'){
//         crossHair.right = false;
//     }
//     if(e.key == 'ArrowLeft'){
//         crossHair.left = false;
//     }
//     if(e.key == 'ArrowUp'){
//         crossHair.up = false;
//     }
//     if(e.key == 'ArrowDown'){
//         crossHair.down = false;
//     }
//     stageDucks.push(new Duck)
// });

// when canvas is clicked invoke crossHair click
canvas.addEventListener('click', () => {
    crossHair.click()
})

// setting a cariable to the initial amount of ducks to appear 
let duckSpawn = 0;
// creating a variable to the max amount of ducks to appear 
let maxDuckspawn = 20;
let duckAmount = 25
//pushing objects into stageDucks 
stageDucks.push(crossHair, duckAround, rightMallard, flyingGeese)


function draw(){
    // clears the screen so we can play again
    context.clearRect(0, 0, canvas.width, canvas.height)
    //Executing the draw function one time per object
    stageDucks.forEach(obj => obj.draw());
    // mainMenu.draw()
    duckSpawn++
    //Condition if the duckSpawn is greater than or equal maxDuckSpawn 
    //and the amount of ducks is greater than 0
    if(duckSpawn >= maxDuckspawn && duckAmount > 0){
        stageDucks.push(new DuckAround)
        duckSpawn = 0
        duckAmount -- 
        
    }    
    setTimeout(draw, 1100 / FPS);
}    
//Event listener for the startup page so once clicked it becomes "hidden" and the gameContainer screen is no longer "hidden"
startButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    
    draw();
});    





