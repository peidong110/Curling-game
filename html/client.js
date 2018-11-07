let ballBeingMoved;
let tempSpeedX = 0;
let tempSpeedY = 0;


let canvas1 = document.getElementById("canvas1")
let canvas2 = document.getElementById("canvas2")
let balls = [
  {name:'ball1', x:170, y:500, radius:15, speedX:0, speedY:0, color:'yellow'},
  {name:'ball2', x:130, y:90, radius:15, speedX:0, speedY:0, color:'yellow'},
  {name:'ball3', x:77, y:420, radius:15, speedX:0, speedY:0, color:'yellow'},
  {name:'ball4', x:50, y:60, radius:15, speedX:0, speedY:0, color:'red'},
  {name:'ball5', x:18, y:300, radius:15, speedX:0, speedY:0, color:'red'},
  {name:'ball6', x:180, y:570, radius:15, speedX:0, speedY:0, color:'red'}
]

let socket = io("http://" + window.document.location.host)
socket.on('ballMove', function(data) {
  console.log("data: " + data)
  console.log("typeof: " + typeof data)
  let ballData = JSON.parse(data)
  for(ball of balls){
    if(ball.name == ballData.name){
      ball.x = ballData.x
      ball.y = ballData.y
    }
  }
  drawCanvas()
})

function drawCanvas() {
  //draw right canvas2
  var context2 = canvas2.getContext('2d');
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  drawOvalShape(context2, canvas2.width/2, canvas2.height/6, 80, 80);
  context2.fillStyle = '#0000ff';
  context2.fill();
  drawOvalShape(context2, canvas2.width/2, canvas2.height/6, 60, 60);
  context2.fillStyle = '#ffffff';
  context2.fill();
  drawOvalShape(context2, canvas2.width/2, canvas2.height/6, 40, 40);
  context2.fillStyle = '#ff0000';
  context2.fill();
  drawOvalShape(context2, canvas2.width/2, canvas2.height/6, 20, 20);
  context2.fillStyle = '#ffffff';
  context2.fill();

  //draw balls
  for (ball of balls){
    var context2 = canvas2.getContext('2d');
    drawOvalShape(context2, ball.x, ball.y, ball.radius, ball.radius);
    context2.fillStyle = '#999999';
    context2.fill();
    context2.stroke();
    drawOvalShape(context2, ball.x, ball.y, ball.radius-7, ball.radius-7);
    if(ball.color == 'yellow'){
      context2.fillStyle = '#ff0000';
    }
    if(ball.color == 'red'){
      context2.fillStyle = '#ffff00';
    }
    context2.fill();
  }

  //draw left canvas1
  var context1 = canvas1.getContext('2d');
  // drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 240, 240);
  // context1.fillStyle = '#0000ff';
  // context1.fill();
  // drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 180, 180);
  // context1.fillStyle = '#ffffff';
  // context1.fill();
  // drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 120, 120);
  // context1.fillStyle = '#ff0000';
  // context1.fill();
  // drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 60, 60);
  // context1.fillStyle = '#ffffff';
  // context1.fill();
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context1.drawImage(canvas2, 0,0,canvas2.width,canvas2.height/3,0,0,canvas1.width,canvas1.height);
}

function drawOvalShape(context, center_x, center_y, width, height){
  context.beginPath()
  context.ellipse(center_x, center_y, width, height, 90 * Math.PI/180, 0, 2 * Math.PI);
  context.stroke();
}

function getBallAtLocation(mouseX, mouseY){
  for (ball of balls){
    if(mouseX>ball.x-ball.radius && mouseX<ball.x+ball.radius && mouseY>ball.y-ball.radius && mouseY<ball.y+ball.radius){
      console.log('ballBeingMoved: ' + ball.name)
      return ball
    }
  }
}

function handleMouseDown(e) {

  let realPositionX = e.pageX - canvas2.offsetLeft;
  let realPositionY = e.pageY - canvas2.offsetTop;
  console.log("mouse down:" + realPositionX + ", " + realPositionY)

  ballBeingMoved = getBallAtLocation(realPositionX, realPositionY)

  if (ballBeingMoved != null) {
    deltaX = ballBeingMoved.x - realPositionX
    deltaY = ballBeingMoved.y - realPositionY
    //attache mouse move and mouse up handlers
    $("#canvas2").mousemove(handleMouseMove)
    $("#canvas2").mouseup(handleMouseUp)
  }

  // Stop propagation of the event and stop any default
  //  browser action
  e.stopPropagation()
  e.preventDefault()

  drawCanvas()
}

function handleMouseMove(e) {
  console.log("mouse move");
  let origX = ballBeingMoved.x
  let origY = ballBeingMoved.y
  //get mouse location relative to canvas top left
  let realPositionX = e.pageX - canvas2.offsetLeft;
  let realPositionY = e.pageY - canvas2.offsetTop;

  ballBeingMoved.x = realPositionX + deltaX
  ballBeingMoved.y = realPositionY + deltaY

  tempSpeedX = ballBeingMoved.x - origX;
  tempSpeedY = ballBeingMoved.y - origY;

  e.stopPropagation()

  drawCanvas()
}

function handleMouseUp(e) {
  console.log("mouse up")

  ballBeingMoved.speedX = tempSpeedX
  ballBeingMoved.speedY = tempSpeedY

  e.stopPropagation()

  //remove mouse move and mouse up handlers but leave mouse down handler
  $("#canvas2").off("mousemove", handleMouseMove); //remove mouse move handler
  $("#canvas2").off("mouseup", handleMouseUp); //remove mouse up handler

  drawCanvas() //redraw the canvas
}

function handleTimer(){
  for(ball of balls){
    // FIXME: emit too frequent may cause ball glitch
    socket.emit("ballMove",JSON.stringify({name:ball.name, x:ball.x, y:ball.y}))
  }
}

$(document).ready(function() {

  $("#canvas2").mousedown(handleMouseDown)
  timer = setInterval(handleTimer, 100)
  drawCanvas()
})
