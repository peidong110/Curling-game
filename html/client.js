function drawCanvas() {
  let ctx = document.getElementById('canvas1').getContext('2d');
  ctx.fillRect(20,20,100,100)
  console.log(ctx);
}
drawCanvas();
