
class Particle {
    constructor(effect) {
      this.effect = effect;
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
      this.speedX;
      this.speedY;
      this.speedmodifier = Math.floor(Math.random() * 5 + 1);
      this.history = [{ x: this.x, y: this.y }];
      this.maxLength = Math.floor(Math.random() * 200 + 10);
      this.angle = 0;
      this.timer = this.maxLength * 2;
      this.colors = ["#4c026b", "#730d9e", "#9622c7", "#b44ae0"];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  
    draw(context) {
      // context.fillRect(this.x , this.y , 10 ,10 );
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.strokeStyle = this.color;
      context.stroke();
    }
    update() {
      this.timer--;
      if (this.timer >= 1) {
        let x = Math.floor(this.x / this.effect.cellsize);
        let y = Math.floor(this.y / this.effect.cellsize);
        let index = y * this.effect.cols + x;
        this.angle = this.effect.flowfields[index];
  
        this.speedX = Math.cos(this.angle);
        this.speedY = Math.sin(this.angle);
        this.x += this.speedX * this.speedmodifier;
        this.y += this.speedY * this.speedmodifier;
  
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift(); // array shift method removes one element from the beginning of the array
        }
      } else if (this.history.length > 1) {
        this.history.shift();
      } else {
        this.reset();
      }
    }
  
    reset() {
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
  
      this.history = [{ x: this.x, y: this.y }];
      this.timer = this.maxLength * 2;
    }
  }