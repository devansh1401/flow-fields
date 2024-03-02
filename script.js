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
        this.speedX ;
        this.speedY ;
        this.speedmodifier = Math.floor(Math.random() * 5 +1 );
        this.history = [{x : this.x , y:this.y}];
        this.maxLength = Math.floor(Math.random()*200 +10);
        this.angle = 0;
        this.timer  = this.maxLength * 2;
    }

    draw(context){
       // context.fillRect(this.x , this.y , 10 ,10 );
        context.beginPath();
        context.moveTo(this.history[0].x , this.history[0].y);
        for(let i =0 ; i< this.history.length ; i++){
            context.lineTo(this.history[i].x , this.history[i].y);
        }
        context.stroke();
    }
    update(){
        this.timer--;
        if(this.timer >= 1){
            let x = Math.floor(this.x / this.effect.cellsize);
            let y = Math.floor(this.y / this.effect.cellsize);
            let index = y * this.effect.cols + x ;
            this.angle= this.effect.flowfields[index];
        
    
            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x +=this.speedX * this.speedmodifier;
            this.y +=this.speedY* this.speedmodifier;
    
            this.history.push({x: this.x , y:this.y})
            if( this.history.length > this.maxLength){
                this.history.shift();     // array shift method remves one lement fromt the beginning of the array
            }
        }  else if (this.history.length > 1){
            this.history.shift(); 
        }  else{
            this.reset();
        }
      

    }
       reset(){
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);

        this.history = [{x : this.x , y:this.y}];
        this.timer = this.maxLength * 2;
       }
}

class Effect{
    constructor(width , height){
        this.width = width;
        this.height = height;
        this.particles = []
        this.numberOfParticles = 300;
        this.cellsize = 20;
        this.rows;
        this.cols;
        this.flowfields = [];
        this.curve = 0.3;
        this.zoom = 0.15;
        this.init();
    }

    init(){
        //creating flow fields using 'perlin noice'
        this.rows = Math.floor(this.height / this.cellsize);
        this.cols = Math.floor(this.width / this.cellsize);
        this.flowfields = [];
        for(let y =0 ; y < this.rows; y++ ){
            for( let x  = 0 ; x < this.cols ; x++){
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowfields.push(angle);
            }
        }
    console.log(this.flowfields);

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