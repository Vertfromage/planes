let c = a.getContext`2d`
c.w = a.width = innerWidth
c.h = a.height = innerHeight, 
mouse = {
  x: null,
  y: null,
},
hero = {
  x: 100,
  y: 100,
  w: 15,
  h: 50,
  s:2
},
enemy = {
    x: 300,
    y: 300,
    w: 15,
    h: 50,
    s: 1
}

drawJet = (o, color,f) =>
{
  c.save()
  c.translate(o.x, o.y*f)
  c.rotate(o.angle)
  
  c.fillStyle = '#FFF'
  var x = -(o.w/2)
  var y = -(o.h/2)
  
  c.fillRect(o.w/2, -5, 10, 10)
  c.fillRect(-o.w-15, -4, 20, 8)
  c.fillRect(-o.w-15, -8, 3, 16)
  c.fillStyle = color
  c.fillRect(x, y, o.w, o.h)
  c.restore()
}

onMouseMove = (e) => {
  mouse.x = e.clientX 
  mouse.y = e.clientY 
}

a.addEventListener('mousemove', onMouseMove, true)

draw=()=>{
  c.fillStyle = '#000'
  c.fillRect(0, 0, c.w, c.h)

LookAt(hero, mouse.x, mouse.y)
LookAt(enemy, hero.x, hero.y)

c.translate(0,c.h)
c.globalAlpha=0.50
drawJet(hero, '#00F', -1)
drawJet(enemy, '#F00', -1)

c.setTransform(1,0,0,1,0,0)
c.globalAlpha=1
drawJet(hero, '#00F', 1)
drawJet(enemy, '#F00', 1)

move(hero, mouse)
move(enemy, hero)
  
  window.requestAnimationFrame(draw)
}

LookAt = (o, dx, dy)=>
{
  o.angle = Math.atan2(dy - o.y, dx - o.x)
}

move = (o, g) =>{
  if(o.x-g.x>1){
    o.x-=o.s
  }else if(o.x-g.x<-1){
    o.x+=o.s
  }
  if(o.y-g.y>1){
    o.y-=o.s
  }else if(o.y-g.y<-1){
    o.y+=o.s
  }
}

window.requestAnimationFrame(draw)