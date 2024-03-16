class Effect {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = 2000;
      this.cellsize = 20;
      this.rows;
      this.cols;
      this.flowfields = [];
      this.curve = 2;
      this.zoom = 0.12;
      this.debug = false;
      this.init();
  
      window.addEventListener("keydown", (e) => {
        if (e.key === "d") this.debug = !this.debug;
      });
  
      window.addEventListener("resize", (e) => {
        //   console.log(e.target.innerWidth , e.target.innerHeight);
        this.resize(e.target.innerWidth, e.target.innerHeight);
      });
    }
  
    init() {
      //creating flow fields using 'perlin noise'
      this.rows = Math.floor(this.height / this.cellsize);
      this.cols = Math.floor(this.width / this.cellsize);
      this.flowfields = [];
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          let angle =
            (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
          this.flowfields.push(angle);
        }
      }
      // console.log(this.flowfields);
  
      // creating particles
      for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this));
      }
    }
  
    drawGrid(context) {
      context.save();
      context.strokeStyle = "red";
      context.lineWidth = 0.3;
      for (let c = 0; c < this.cols; c++) {
        context.beginPath();
        context.moveTo(this.cellsize * c, 0);
        context.lineTo(this.cellsize * c, this.height);
        context.stroke();
      }
      for (let r = 0; r < this.rows; r++) {
        context.beginPath();
        context.moveTo(0, this.cellsize * r);
        context.lineTo(this.width, this.cellsize * r);
        context.stroke();
      }
      context.restore();
    }
    resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }
    render(context) {
      if (this.debug) this.drawGrid(context);
      this.particles.forEach((Particle) => {
        Particle.draw(context);
        Particle.update();
      });
    }
  }