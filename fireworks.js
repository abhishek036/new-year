/* ==========================================================
   CUSTOM FIREWORKS ENGINE
   Robust, dependency-free Canvas Fireworks
   ========================================================== */

(function () {
  // Configuration
  const CONFIG = {
    particleCount: 100, // Reduced slightly for performance
    rocketSpeed: 10, // Slightly slower for better visibility
    gravity: 0.1,
    friction: 0.95,
    colors: [
      '#ff0043', '#14fc56', '#1e7fff', '#e60aff',
      '#ffbf36', '#ffffff', '#00D2FF', '#FF6B9D'
    ]
  };

  let canvas, ctx;
  let fireworks = [];
  let particles = [];
  let animationId;
  let isRunning = false;
  let width, height;

  // Cracker Sound Effect (main celebration sound)
  const crackerSound = new Audio('Crackers - Sound Effect (Free No Copyright Sounds) [sY4nah4Babs].opus');
  let crackerSoundPlaying = false;

  // Preload sound
  try {
    crackerSound.load();
  } catch (e) { console.warn("Sound preload error", e); }


  // Helper: Random
  const random = (min, max) => Math.random() * (max - min) + min;

  // Class: Firework (Rocket)
  class Firework {
    constructor(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
      this.distanceTraveled = 0;
      this.coordinates = [];
      this.coordinateCount = 4; // Longer trail
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = CONFIG.rocketSpeed;
      this.acceleration = 1.02; // Slower acceleration
      this.brightness = random(50, 70);
      this.targetRadius = 1;
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      this.speed *= this.acceleration;

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      this.distanceTraveled = Math.sqrt(Math.pow(this.x - this.sx, 2) + Math.pow(this.y - this.sy, 2));

      // Reached target?
      if (this.distanceTraveled >= this.distanceToTarget) {
        console.log("💥 Rocket Exploded!");
        createParticles(this.tx, this.ty);
        fireworks.splice(index, 1);
        // Sound is handled globally in startFireworks
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw() {
      ctx.beginPath();
      // Draw tail
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${random(0, 360)}, 100%, 70%)`; // Brighter tail
      ctx.lineWidth = 4; // Thicker tail
      ctx.stroke();

      // Draw head
      ctx.beginPath();
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF';
      ctx.fill();
    }
  }

  // Class: Particle (Explosion)
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 6;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = random(0, Math.PI * 2);
      this.speed = random(2, 12); // Faster explosion
      this.friction = CONFIG.friction;
      this.gravity = CONFIG.gravity;
      this.hue = random(0, 360);
      this.brightness = random(50, 80);
      this.alpha = 1;
      this.decay = random(0.01, 0.02); // Slower fade (longer life)
      this.color = CONFIG.colors[Math.floor(random(0, CONFIG.colors.length))];
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.lineWidth = 3; // Thicker explosion particles
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function createParticles(x, y) {
    let particleCount = CONFIG.particleCount;
    while (particleCount--) {
      particles.push(new Particle(x, y));
    }
  }

  // Cracker sound plays once when fireworks start
  function playCrackerSound() {
    if (!crackerSoundPlaying) {
      crackerSoundPlaying = true;
      crackerSound.currentTime = 0;
      crackerSound.volume = 0.7;
      crackerSound.play().catch(e => console.warn('Audio play error:', e));
    }
  }

  function stopCrackerSound() {
    crackerSound.pause();
    crackerSound.currentTime = 0;
    crackerSoundPlaying = false;
  }

  function loop() {
    if (!isRunning) return;
    requestAnimationFrame(loop);

    // Fade effect for trails
    // Using source-over with semi-transparent black works better for consistent visibility than destination-out in some cases
    // But destination-out is standard for trails on transparent canvas.
    // Let's stick to destination-out but be careful
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Slower fade = longer trails
    ctx.fillRect(0, 0, width, height);

    // Switch back to source-over for clearer drawing (vs lighter)
    ctx.globalCompositeOperation = 'source-over';

    // Auto-launch random fireworks
    if (random(0, 100) < 4) {
      launchRandomFirework();
    }

    // Draw Fireworks
    let i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    // Draw Particles
    let j = particles.length;
    while (j--) {
      particles[j].draw();
      particles[j].update(j);
    }
  }

  function launchRandomFirework() {
    // Launch from bottom area
    const sx = width / 2 + random(-300, 300);
    const sy = height;
    // Target upper area
    const tx = random(width * 0.1, width * 0.9);
    const ty = random(height * 0.1, height * 0.5);

    console.log(`🚀 Launching Rocket: ${Math.round(sx)},${Math.round(sy)} -> ${Math.round(tx)},${Math.round(ty)}`);
    fireworks.push(new Firework(sx, sy, tx, ty));
    // Sound is handled globally
  }

  // API
  window.startFireworks = function () {
    console.log("🎆 STARTING FIREWORKS ENGINE 🎆");
    canvas = document.getElementById('fireworks-canvas');
    if (!canvas) {
      console.error("❌ Fireworks Canvas NOT FOUND!");
      return;
    }
    canvas.style.display = 'block'; // Force display check

    ctx = canvas.getContext('2d');
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Handle Resize
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    fireworks = [];
    particles = [];
    isRunning = true;

    // Play cracker sound for the celebration
    playCrackerSound();

    loop();

    // Initial Volley
    launchRandomFirework();
    setTimeout(launchRandomFirework, 400);
    setTimeout(launchRandomFirework, 800);
    setTimeout(launchRandomFirework, 1200);
  };

  window.stopFireworks = function () {
    console.log("🛑 STOPPING FIREWORKS");
    isRunning = false;
    stopCrackerSound();
    if (ctx && width && height) {
      ctx.clearRect(0, 0, width, height);
    }
  };

  window.launchRocket = function () {
    if (isRunning) launchRandomFirework();
  };

})();
