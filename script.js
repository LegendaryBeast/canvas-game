// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
//   return color;
// }
// const canvas = document.querySelector(".canvas");
// let c;
// let spawnInterval;
// let animeid;
// let score = 0;
// let midx = canvas.width / 2;
// let midy = canvas.height / 2;
// let projectiles = [];
// let enemies = [];
// class player {
//   constructor(x, y, radius) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = getRandomColor();
//   }
//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.fillStyle = this.color;
//     c.fill();
//   }
// }

// class Projectile {
//   constructor(x, y, radius, velocity) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = getRandomColor();
//     this.velocity = velocity;
//   }

//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.fillStyle = this.color;
//     c.fill();
//   }

//   update() {
//     this.draw();
//     this.x = this.x + this.velocity.x;
//     this.y = this.y + this.velocity.y;
//   }
// }

// class Enemy {
//   constructor(x, y, radius, velocity) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = getRandomColor();
//     this.velocity = velocity;
//   }

//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.fillStyle = this.color;
//     c.fill();
//   }
//   update() {
//     this.draw();
//     this.x = this.x + this.velocity.x;
//     this.y = this.y + this.velocity.y;
//   }
// }
// let p;
// function startagain() {
//   c = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   midx = canvas.width / 2;
//   midy = canvas.height / 2;
//   p = new player(midx, midy, 30);
//   projectiles = [];
//   enemies = [];
//   score = 0;
//   sw.classList.add("invisible");
//   animate();
//   spwanEnemies();
// }
// function spwanEnemies() {
//   spawnInterval = setInterval(() => {
//     const radius = Math.random() * (30 - 6) + 6;
//     let x;
//     let y;
//     if (Math.random() > 0.5) {
//       x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
//       y = Math.random() * canvas.height;
//     } else {
//       x = Math.random() * canvas.width;
//       y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
//     }

//     const angle = Math.atan2(midy - y, midx - x);

//     const velocity = {
//       x: Math.cos(angle),
//       y: Math.sin(angle),
//     };
//     enemies.push(new Enemy(x, y, radius, velocity));
//   }, 1000);
// }

// function animate() {
//   animeid = requestAnimationFrame(animate);
//   c.fillStyle = "rgba(0,0,0,0.3)";
//   c.fillRect(0, 0, canvas.width, canvas.height);
//   p.draw();
//   projectiles.forEach((projectile) => {
//     projectile.update();
//   });

//   for (let index = 0; index < enemies.length; index++) {
//     const enemy = enemies[index];
//     enemy.update();
//     const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
//     if (dist - enemy.radius - p.radius < 1) {
//       cancelAnimationFrame(animeid);
//       clearInterval(spawnInterval);
//       sw.classList.remove("invisible");
//       start.innerHTML = "reStart";
//       sw.innerHTML = `<div><button class="start">START</button></div><p>YOUR SCORE IS : ${score}`;
//       start = document.querySelector(".start");
//       start.addEventListener("click", () => {
//         startagain();
//       });
//     }
//     projectiles.forEach((projectile, guliIndex) => {
//       const distance = Math.hypot(
//         projectile.x - enemy.x,
//         projectile.y - enemy.y
//       );
//       if (distance - enemy.radius - projectile.radius < 1) {
//         score++;
//         sc.innerHTML = `<span>Score: ${score}</span>`;
//         setTimeout(() => {
//           enemies.splice(index, 1);
//           projectiles.splice(guliIndex, 1);
//         }, 0);
//       }
//     });
//   }
// }

// window.addEventListener("click", (event) => {
//   const angle = Math.atan2(
//     event.clientY - canvas.height / 2,
//     event.clientX - canvas.width / 2
//   );

//   const velocity = {
//     x: Math.cos(angle) * 5,
//     y: Math.sin(angle) * 5,
//   };
//   projectiles.push(
//     new Projectile(canvas.width / 2, canvas.height / 2, 5, velocity)
//   );
// });
// const sc = document.querySelector(".score");
// let start = document.querySelector(".start");
// const can = document.querySelector(".can");
// const sw = document.querySelector(".switch");
// start.addEventListener("click", () => {
//   startagain();
// });

const canvasElement = document.querySelector(".canvas");
const scoreElement = document.querySelector(".score");
const switchElement = document.querySelector(".switch");
const startButton = document.querySelector(".start");
let scoreDisplay;
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
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
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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

      startButton.innerHTML = "Restart";

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
        scoreElement.innerHTML = `<span>Score: ${score}</span>`;
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
	  score+=100;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(guliIndex, 1);
          }, 0);
        } else {
	  score+=250;
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(guliIndex, 1);
          }, 0);
        }
      }
    });
  }
}

//when user click in screen 
window.addEventListener("click", (event) => {
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
});

function startagain() {
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

  animate();
  spwanEnemies();
}

startButton.addEventListener("click", () => {
  if (score >= 0) scoreDisplay.remove();
  startagain();
});
