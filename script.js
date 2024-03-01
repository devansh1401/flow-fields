const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // ctx contains all 2d methods of drawing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx);
// canvas settings
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';

// ctx.lineWidth = 20;
// ctx.lineCap = "round";

// ctx.arc(100, 300 , 50 , 0 , Math.PI*2); // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
// ctx.fill();

// ctx.beginPath();
// ctx.moveTo(50, 50); // Move to (50, 50) without drawing
// ctx.lineTo(150, 50); // Draw a line from (50, 50) to (150, 50) 
// ctx.stroke(); // Render the line

class Particle{
    constructor(effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
    }

    draw(context){
        context.fillRect(this.x , this.y , 10 ,10 );
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

}

class Effect{
    constructor(width , height){
        this.width = width;
        this.height = height;
        this.particles = []
        this.numberOfParticles = 50;
        this.init();
    }

    init(){
        // creating particles 
        for(let i =0 ; i< this.numberOfParticles ; i++){
            this.particles.push( new Particle(this));
        }
       
    }
    render(context){
        this.particles.forEach(Particle => {
            Particle.draw(context);
            Particle.update();
        });
    }

}

const effect = new Effect(canvas.width , canvas.height);
console.log(effect);

function animate(){
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(animate);  
}

animate();