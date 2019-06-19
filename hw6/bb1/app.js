/* Filename: app.js
   Javascript for Game 1 Homework
*/

//alert("ok");
//console.log("ok");
window.onload=init;

function init(){

    var button = document.getElementsByClassName("button");
    var circle = document.getElementById("circle");
  
    var top=10;
    var left=8;
    var per = 2;
  
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click',function(e){
  
            var position = e.currentTarget.value;
  
            switch(position){
                case "up": top-=per; break;
                case "down": top+=per; break;
                case "left": left-=per; break;
                case "right": left+=per; break;
            }
  
            circle.style.top = top+'%';
            circle.style.left = left+'%';
        });
    }
  
  }