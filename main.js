window.onload = function(){
    var config = {
        apiKey: "AIzaSyAElv5wFdDuT0qsY6_HXfMlxoYWfdUXP4g",
      authDomain: "suwonweb.firebaseapp.com",
      databaseURL: "https://suwonweb.firebaseio.com",
      projectId: "suwonweb",
      storageBucket: "suwonweb.appspot.com",
      messagingSenderId: "583960976857",
      appId: "1:583960976857:web:2580e6c0aaa70c59"
      };
      firebase.initializeApp(config);
    
 
      document.getElementById("save").onclick =function(){
        
            var name = document.getElementById("name");
            var content = document.getElementById("content");
            var number = document.getElementById("number");
            var ref = firebase.database().ref("anything");
      
            ref.push().set({
                name : name.value,
                content: content.value,
                number: number.value,
            });
      
            name.value="";
            content.value="";
            number.value="";
        }
    
      
        var refEmp = firebase.database().ref("anything");
    
        refEmp.on('child_added',snap=>{
            var info = document.getElementById("empList");
            const li = document.createElement("tr");
            li.id = snap.key;
            li.innerHTML = 
            '<tr>'+
            '<th>'+snap.child("name").val()+'</th>'+
            '<th>'+snap.child("content").val()+'</th>'+
            '<th>'+snap.child("number").val()+'</th>'+
            '<th>'+"<button class='mdl-button mdl-js-button' onclick='deleteref(this)'>삭제</button>"+'</th>'+'</tr>';
            empList.appendChild(li);
        });
      
        refEmp.on('child_removed', snap=>{
            const liRemoved = document.getElementById(snap.key);
            liRemoved.remove();
        });
     }
      
       function deleteref(o){
      
        var ref = firebase.database().ref("anything/"+ o.parentNode.parentNode.id);
        ref.remove();
    
       }
    
            