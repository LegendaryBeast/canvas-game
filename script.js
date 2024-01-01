function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}
const canvas = document.querySelector(".canvas");
let c;
let spawnInterval;
let animeid;
let score = 0;
let midx = canvas.width / 2;
let midy = canvas.height / 2;
let projectiles = [];
let enemies = [];
class player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const friction = 0.98;

  class Particle {
    constructor(x , y , radius , color , velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
        this.alpha=1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle= this.color
        c.fill()
        c.restore()
    }

    update(){
    	  this.draw()
        this.velocity.x*=friction
        this.velocity.y*=friction
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
        this.alpha-=0.01
    }
  }


class Projectile {
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
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

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
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
let p;
function startagain() {
  c = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  midx = canvas.width / 2;
  midy = canvas.height / 2;
  p = new player(midx, midy, 30);
  
  projectiles = []
  enemies = []
  particles = []
  
  score = 0;
  sw.classList.add("invisible");
  animate();
  spwanEnemies();
}
function spwanEnemies() {
  spawnInterval = setInterval(() => {
    const radius = Math.random() * (30 - 6) + 6;
    let x;
    let y;
    if (Math.random() > 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const angle = Math.atan2(midy - y, midx - x);

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, velocity));
  }, 1000);
}

function animate() {
  animeid = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  p.draw();

  particles.forEach((particle,index)=>{
      if(particle.alpha<=0){
        particles.splice(index,1)
      }
      else
        particle.update()
    })
  
  projectiles.forEach((projectile) => {
    projectile.update();
  });

  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];
    enemy.update();
    const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
    if (dist - enemy.radius - p.radius < 1) {
      cancelAnimationFrame(animeid);
      clearInterval(spawnInterval);
      sw.classList.remove("invisible");
      start.innerHTML = "reStart";
      sw.innerHTML = `<div><button class="start">START</button></div><p>YOUR SCORE IS : ${score}`;
      start = document.querySelector(".start");
      start.addEventListener("click", () => {
        startagain();
      });
    }
    projectiles.forEach((projectile, guliIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );
      if (distance - enemy.radius - projectile.radius < 1) {
        score++;
        sc.innerHTML = `<span>Score: ${score}</span>`;
        for(let i=0;i<enemy.radius*3;i++){
            particles.push(new Particle(projectile.x , projectile.y,Math.random()*3,enemy.color,{
              x:(Math.random()-0.5)*(Math.random()*8),
              y:(Math.random()-0.5)*(Math.random()*8)
            }))
        }
        if(enemy.radius -10 > 10){
            gsap.to(enemy,{
              radius : enemy.radius - 10
            })
            setTimeout(()=>{
              projectiles.splice(guliIndex,1)
            },0)
          }
          else{
          setTimeout(()=>{
          enemies.splice(index,1)
          projectiles.splice(guliIndex,1)
          },0)
        }
      }
    });
  }
}

window.addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );

  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, velocity)
  );
});
const sc = document.querySelector(".score");
let start = document.querySelector(".start");
const can = document.querySelector(".can");
const sw = document.querySelector(".switch");
start.addEventListener("click", () => {
  startagain();
});
