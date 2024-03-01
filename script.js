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
        this.history = [{x : this.x , y:this.y}];
        this.maxLength = Math.floor(Math.random() * 100+ 10);
        this.angle = 0;
    }

    draw(context){
        context.fillRect(this.x , this.y , 10 ,10 );
        context.beginPath();
        context.moveTo(this.history[0].x , this.history[0].y);
        for(let i =0 ; i< this.history.length ; i++){
            context.lineTo(this.history[i].x , this.history[i].y);
        }
        context.stroke();
    }
    update(){
        this.angle += 0.5;
        this.x += this.speedX + Math.sin(this.angle) * 10;
        this.y += this.speedY + Math.cos(this.angle) * 13;
        this.history.push({x: this.x , y:this.y})
        if( this.history.length  > this.maxLength){
            this.history.shift(); // shift method remove one element from the beginning of the array
        }

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