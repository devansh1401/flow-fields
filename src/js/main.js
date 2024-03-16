// main.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas size adjustment
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const effect = new Effect(canvas);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}

animate();


// Add event listeners for range inputs
const verticalAnchors = document.getElementById("vertical-anchors");
const horizontalAnchors = document.getElementById("horizontal-anchors");
const particles = document.getElementById("particles");
const lineOpacity = document.getElementById("line-opacity");
const lineColor = document.getElementById("line-color");
const backgroundColor = document.getElementById("background-color");

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

const debouncedInit = debounce(effect.init.bind(effect), 200);

verticalAnchors.addEventListener("input", () => {
  effect.curve = map(verticalAnchors.value, 0, 100, 1, 10);
  debouncedInit();
});

horizontalAnchors.addEventListener("input", () => {
  effect.zoom = map(horizontalAnchors.value, 0, 100, 0.01, 1);
  debouncedInit();
});

particles.addEventListener("input", () => {
  effect.numberOfParticles = particles.value;
  debouncedInit();
});

lineOpacity.addEventListener("input", () => {
  effect.cellsize = map(lineOpacity.value, 0, 100, 5, 50);
  debouncedInit();
});

lineColor.addEventListener("input", () => {
  effect.particles.forEach((particle) => {
    particle.color = lineColor.value;
  });
});

backgroundColor.addEventListener("input", () => {
  canvas.style.backgroundColor = backgroundColor.value;
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  effect.init(); // Reset the effect to its initial state
});

document.getElementById('about').addEventListener('click', () => {
  alert('Flow Fields is a generative art tool created by Devansh.');
});

document.getElementById('github').addEventListener('click', () => {
  window.open('https://github.com/your-github-repo', '_blank');
});

// Full-screen mode
const fullscreenBtn = document.getElementById('fullscreen');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch(err => {
      alert(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.init();
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.init();
  }
});


// Utility function
function map(value, min1, max1, min2, max2) {
  return ((value - min1) / (max1 - min1)) * (max2 - min2) + min2;
}