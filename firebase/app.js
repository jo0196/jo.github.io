
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAElv5wFdDuT0qsY6_HXfMlxoYWfdUXP4g",
    authDomain: "suwonweb.firebaseapp.com",
    databaseURL: "https://suwonweb.firebaseio.com",
    projectId: "suwonweb",
    storageBucket: "suwonweb.appspot.com",
    messagingSenderId: "583960976857",
    appId: "1:583960976857:web:2580e6c0aaa70c59"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var athletes=null;

window.onload=init();



function init(){

  athletes=firebase.database().ref("athletes");

    document.querySelector("#button_save")
    .addEventListener('click',()=>{
        let ln=document.querySelector("#lastname").value;
        let fn=document.querySelector("#firstname").value;
        let sport=document.querySelector("#sports").value;


        ln=ln.trim();
        fn=fn.trim();
        sport=sport.trim();

        let msg=document.querySelector("#msg");
        if(ln===""||fn===""||sport===""){
          msg.classList.remove("success");
          msg.classList.add("error");
          msg.innerHTML="can't be added...  Fill in the blanks."
          return;
        }


        athletes.push().set({
                  lastname:ln,
                  firstname:fn,
                  sport:sport
                });

                msg.classList.remove("error");
                msg.classList.add("success");
                msg.innerHTML="ADD New Athletes";
    });

    listeners();
}

function listeners(){

  athletes.on("child_added",function(snap){
    var alist=document.querySelector("#mylist");
    const li=document.createElement("li");
    li.innerHTML=snap.child("lastname").val()+", "+
    snap.child("firstname").val()+", "+
    snap.child("sport").val()+"   "+
    "<a href='#' onclick='remove();'>Delete</a>";
    li.id=snap.key;
    alist.appendChild(li);
  });
}

function remove(e){
  let id;
  if(!e) e=window.event;
  e.preventDefault();
  //console.log(e.target.parentNode.id);

  id=e.target.parentNode.id;

  athletes.child(id).remove();
  e.target.parentNode.remove();
}