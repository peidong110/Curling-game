let socket = io("http://" + window.document.location.host)
let canvas1 = document.getElementById("canvas1")
let canvas2 = document.getElementById("canvas2")

function drawCanvas() {
  //draw left canvas1
  var cav1 = canvas1.getContext('2d');
  cav1.setLineDash([])
  cav1.beginPath();
  cav1.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
  cav1.stroke();
}

// $(document).ready(function() {
//   drawCanvas()
// })

drawCanvas()
