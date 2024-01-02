const canvasElement = document.querySelector(".canvas");
const scoreElement = document.querySelector(".score");
const switchElement = document.querySelector(".switch");
const pauseDiv = document.querySelector(".PAUSE");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".tham");
let scoreDisplay;
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  if (parseInt(color.slice(1, 3), 16) <= 6) return getRandomColor();
  return color;
}

let c;
let spawnInterval;
let animeid;
let score = -1;
let midx = canvasElement.width / 2;
let midy = canvasElement.height / 2;

let projectiles = [];
let enemies = [];
let particles = [];
let pauseFLAG = 1;
//Player class
class player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "white";
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const friction = 0.98;
let p;

//particle class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x += this.velocity.x * pauseFLAG;
    this.y += this.velocity.y * pauseFLAG;
    this.alpha -= 0.01;
  }
}

//projectile class
class Projectile {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "white";
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * pauseFLAG;
    this.y += this.velocity.y * pauseFLAG;
  }
}

//enemy class
class Enemy {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * pauseFLAG;
    this.y += this.velocity.y * pauseFLAG;
  }
}

//Randomly spwan enemies
function spwanEnemies() {
  spawnInterval = setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10;
    let x;
    let y;
    if (Math.random() > 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvasElement.width + radius;
      y = Math.random() * canvasElement.height;
    } else {
      x = Math.random() * canvasElement.width;
      y = Math.random() < 0.5 ? 0 - radius : canvasElement.height + radius;
    }

    const angle = Math.atan2(midy - y, midx - x);

    const velocity = {
      x: Math.cos(angle) * 1.6,
      y: Math.sin(angle) * 1.6,
    };

    enemies.push(new Enemy(x, y, radius, velocity));
  }, 1000);
}

//animate over canvas
function animate() {
  animeid = requestAnimationFrame(animate);
  c.fillStyle = "rgb(0,0,0,0.1)";
  c.fillRect(0, 0, canvasElement.width, canvasElement.height);
  p.draw();

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else particle.update();
  });

  projectiles.forEach((projectile, index) => {
    projectile.update();
    //Garbage guli collecting
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.y + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvasElement.weight ||
      projectile.y - projectile.radius > canvasElement.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      });
    }
  });

  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];
    enemy.update();

    const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
    if (dist - enemy.radius - p.radius < 1) {
      cancelAnimationFrame(animeid);
      clearInterval(spawnInterval);
      switchElement.classList.toggle("hidden");
      canvasElement.classList.toggle("hidden");
      pauseDiv.classList.toggle("hidden");
      startButton.innerHTML = "Restart";
      scoreElement.innerHTML = `<span>GAME OVER</span>`;
      scoreDisplay = document.createElement("p");
      scoreDisplay.innerHTML = `YOUR SCORE IS : ${score}`;
      switchElement.appendChild(scoreDisplay);
    }

    projectiles.forEach((projectile, guliIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );

      // when guli hit enemy
      if (distance - enemy.radius - projectile.radius < 1) {
        for (let i = 0; i < enemy.radius * 3; i++) {
          //creating new particle
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 3,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 8),
                y: (Math.random() - 0.5) * (Math.random() * 8),
              }
            )
          );
        }
        //after collusion enemy soto kora
        if (enemy.radius - 10 > 10) {
          score += 50;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(guliIndex, 1);
          }, 0);
        } else {
          score += 100;
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(guliIndex, 1);
          }, 0);
        }
        scoreElement.innerHTML = `<span>Score: ${score}</span>`;
      }
    });
  }
}

//when user click in screen
window.addEventListener("click", (event) => {
  if (pauseFLAG) {
    const angle = Math.atan2(
      event.clientY - canvasElement.height / 2,
      event.clientX - canvasElement.width / 2
    );
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };

    projectiles.push(
      new Projectile(
        canvasElement.width / 2,
        canvasElement.height / 2,
        5,
        velocity
      )
    );
  }
});

function startagain() {
  pauseDiv.classList.toggle("hidden");
  switchElement.classList.toggle("hidden");
  canvasElement.classList.toggle("hidden");

  c = canvasElement.getContext("2d");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  midx = canvasElement.width / 2;
  midy = canvasElement.height / 2;

  p = new player(midx, midy, 10);

  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  pauseFLAG = 1;
  scoreElement.innerHTML = `<span>KILL EM KITTY</span>`;
  animate();
  spwanEnemies();
}

startButton.addEventListener("click", () => {
  if (score >= 0) scoreDisplay.remove();
  startagain();
});
pauseButton.addEventListener("click", () => {
  if (pauseFLAG) {
    pauseFLAG = 0;
    clearInterval(spawnInterval);
    pauseButton.innerHTML = `RESUME`;
  } else {
    pauseFLAG = 1;
    spwanEnemies();
    pauseButton.innerHTML = `PAUSE`;
  }
});
