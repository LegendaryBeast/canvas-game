const canvas = document.
querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width=innerWidth
canvas.height=innerHeight

class player{
    constructor(x,y,radius,color){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x , y , radius , color , velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle= this.color
        c.fill()
    }

    update(){
    	this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}

class Enemy {
    constructor(x , y , radius , color , velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle= this.color
        c.fill()
    }

    update(){
    	this.draw(0
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}

const x = canvas.width/2
const y = canvas.height/2

const player= new player(x,y,30,'red')


const projectiles = []
const enemies=[]

function spwanEnemies() {
	setInterval(()=>{
		const x=100
		const y=100
		const radius = 30
		const color  = 'green'
		const velocity={
			x:1,
			y:1
}
		enemies.push(new Enemy( x , y , radius , color , velocity))
},1000)
}

function animate(){
    requestAnimationFrame(animate)

    c.clearRect(0,0,canvas.width , canvas.height)
    player.draw()
    
    projectiles.forEach((projectile)=>{
    projectile.update()
    })
    
    enimies.forEach((enemy)=>{
		enemy.update()
	})
}

window.addEventListener('click',(event)=> {
	const angle = Math.atan2(event.clientY-canvas.height/2 ,
     event.clientX-canvas.width/2)

	const velocity {
		x : Math.cos(angle)*5,
		y : Math.sin(angle)*5
}
	projectiles.push(new Projectile(canvas.width/2, 
    canvas.height/2, 
    5, 
    'blue', 
    velocity)
)
})

animate()

spwanEnemies()