let socket = io("http://" + window.document.location.host)
let canvas1 = document.getElementById("canvas1")
let canvas2 = document.getElementById("canvas2")

function drawCanvas() {
  //draw left canvas1
  var context1 = canvas1.getContext('2d');
  drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 240, 240);
  context1.fillStyle = '#0000ff';
  context1.fill();
  drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 180, 180);
  context1.fillStyle = '#ffffff';
  context1.fill();
  drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 120, 120);
  context1.fillStyle = '#ff0000';
  context1.fill();
  drawOvalShape(context1, canvas1.width/2, canvas1.height/2, 60, 60);
  context1.fillStyle = '#ffffff';
  context1.fill();
  //draw right canvas2
  var context2 = canvas2.getContext('2d');
  context2.drawImage(canvas1, 0,0,canvas1.width,canvas1.height,0,0,canvas2.width,canvas2.height/3);
}

function drawOvalShape(context, center_x, center_y, width, height){
  context.beginPath()
  context.ellipse(center_x, center_y, width, height, 90 * Math.PI/180, 0, 2 * Math.PI);
  context.stroke();
}

drawCanvas()
