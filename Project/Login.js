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

//Let's get all buttons we need.

const txtEmail = document.getElementById("txtEmail");
const txtPass = document.getElementById("txtPass");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("bbbb");
const loginForm = document.getElementById("loginForm");


btnLogout.addEventListener("click", e=>{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
});

btnLogin.addEventListener("click", e=>{
  console.log("user is signed in....");
  
    const email = txtEmail.value;
    const pass = txtPass.value;

    if(email == ""){
      alert("이메일을 입력하세요");
      txtEmail.focus();
      return ;
    }
    else if(pass == ""){
      alert("비밀번호를 입력하세요");
      txtPass.focus();
      return ;
    }
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
     
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...


    });
   

  });



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("user is signed in....");
    } else {
      // User is signed out.
      // ...
      console.log("user is signed out....");
    }
  });

btnSignUp.addEventListener("click", e=>{
  
  const auth = firebase.auth();
  const email = txtEmail.value;
  const pass = txtPass.value;

    if(txtEmail.value == ""){
      alert("이메일을 입력하세요");
      txtEmail.focus();
      return ;
    }
    else if(txtPass.value == ""){
      alert("비밀번호를 입력하세요");
      txtPass.focus();
      return ;
    }
  const promise = auth.createUserWithEmailAndPassword(email,pass);

  promise.catch(e => {console.log(e.message)});
  alert("회원가입 되었습니다.");
  window.location.reload();
  
});

/*firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    btnLogout.classList.remove('hide');
    loginForm.classList.add('hide');
    btnLogin.classList.add('hide');
    btnSignUp.classList.add('hide');
    console.log(firebaseUser);
  }
  else{
    btnLogout.classList.add('hide');
    loginForm.classList.remove('hide');
    btnLogin.classList.remove('hide');
    btnSignUp.classList.remove('hide');
  }
});*/

function pageMove(){
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      alert("로그인 되었습니다.");
      window.location.href="main.html";
    }
    else{
      console.log('Not Logged In');
    }
  });
}