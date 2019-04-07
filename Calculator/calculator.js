window.onload = function(){

  document.querySelector("#b_add").onclick=function(){
     compute('+');
  }
  document.querySelector("#b_sub").onclick=function(){
      compute('-');
   }
   document.querySelector("#b_div").onclick=function(){
      compute('/');
   }
   document.querySelector("#b_mult").onclick=function(){
      compute('*');
   };

   document.querySelector("#numberOnly").onkeypress=function(ev){
    //0 - 48 to 9 - 57
    if(!ev)
    ev = window.event;  //to make sure you have an event


    console.log(ev.keyCode);
    if(ev.keyCode<48 || ev.keyCode >57)
    ev.preventDefault();
}
  
}

function compute(op){
  let a = document.querySelector("#n1");
  let b = document.querySelector("#n2");

  let c = 0;
  switch(op){
      case '+': c = (parseInt(a.value) + parseInt(b.value));
      break;
      case '-': c = (parseInt(a.value) - parseInt(b.value));
      break;
      case '*': c = (parseInt(a.value) * parseInt(b.value));
      break;
      case '/': c = (parseInt(a.value) / parseInt(b.value));
      break;
      default: break;
  }

  document.querySelector("#output").innerHTML = c;
}