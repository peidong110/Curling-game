let socket = io("http://" + window.document.location.host)
let canvas1 = document.getElementById("canvas1")
let canvas2 = document.getElementById("canvas2")

function drawCanvas() {

//draw svg background
let container1 = document.getElementById('canvas1')

let ball_svg_s = ''
let ball_svg_l = ''

for (ball of allBalls) {
  ball_svg_s += `<ellipse   rx=${ball_radius-5}  cy=${ball.y} cx=${ball.x} stroke-width="5" stroke="grey" fill=${ball.color} />`
  if (ball.y<200) {
    ball_svg_l += `<ellipse   rx=${(ball_radius-5)*3}  cy=${ball.y*3} cx=${(ball.x-startX)*3} stroke-width="15" stroke="grey" fill="red" />`
  }
}
//draw canvas
//600*600
//200*500
  container1.innerHTML = `<svg id = "svg"xmlns = "http://www.w3.org/2000/svg" width = ${window_width} height = ${window_height}>

  <ellipse   rx="225" id="svg_1" cy="300" cx="300" stroke-width="75" stroke="blue" fill="#fff"/>
  <ellipse   rx="75" id="svg_2" cy="300" cx="300" stroke-width="75" stroke="red" fill="#fff"/>

  <ellipse   rx="75" id="svg_3" cy="100" cx=${startX+100} stroke-width="25" stroke="blue" fill="#fff"/>
  <ellipse   rx="25" id="svg_4" cy="100" cx=${startX+100} stroke-width="25" stroke="red" fill="#fff"/>
  <line  id="svg_5" y2=${startY} x2=${startX} y1="0" x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_6" y2=${startY} x2= ${startX+200} y1=${startY} x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_5" y2=${startY} x2=${startX+200} y1="0" x1=${startX+200} stroke-width="1.5" stroke="#000" fill="none"/>
  ${ball_svg_s}
  ${ball_svg_l}
  </svg>`;
}

$(document).ready(function() {
  drawCanvas()
})
