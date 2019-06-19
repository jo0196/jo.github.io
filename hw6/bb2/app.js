/* Filename: app.js
   Javascript for Game 2 Homework
*/

//alert("ok");
//console.log("ok");


window.onload = init;

function init() {
  

  var canvas = document.getElementById("game_area");
  var ctx = canvas.getContext("2d");
  var x = canvas.width/2;
  var y = canvas.height-30;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI*2);
    ctx.fillStyle = "#77f";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    clickButton();
  }

  function clickButton(){
    document.getElementById("up").onclick=function(){
      move(1)
    };
    document.getElementById("down").onclick=function(){
      move(2)
    };
    document.getElementById("left").onclick=function(){
      move(3)
    };
    document.getElementById("right").onclick=function(){
      move(4)
    };
  }

  
  function move(op){
    switch(op){
      case 1: y = y - 10
          break;
      case 2: y = y + 10
          break;
      case 3: x = x - 10
          break;
      case 4: x = x + 10
          break;
    }
  }
  setInterval(draw, 10);
}
