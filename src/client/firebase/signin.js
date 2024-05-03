//IGNORE THIS IS THE SignIn AUTHORISATION FILE WITH FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR852lJqljQ5zmX71e8H0GAyVIN2BfWj8",
  authDomain: "fitmatch-login-database.firebaseapp.com",
  projectId: "fitmatch-login-database",
  storageBucket: "fitmatch-login-database.appspot.com",
  messagingSenderId: "44114654569",
  appId: "1:44114654569:web:b0cf652a429886780c79f8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//get all sign up inputs


const signupBtn = document.getElementById("loginContinue");

signupBtn.addEventListener("click", (event) =>{
event.preventDefault();
const email = document.getElementById("loginName").value;
const password = document.getElementById("loginPassword").value;
const alertBar = document.getElementById("loginMessage");

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    sessionStorage.setItem("user-info", JSON.stringify({
            user: user.uid
    }))
    
    // ...
    alertBar.textContent = "Successfully Logged In"
    setTimeout(() => {
      }, 1400);
    window.location.href = "index.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alertBar.textContent = "Incorrect Email or Password"
  });
});


document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("user-info")) {
      // User is logged in, show workout link
      document.getElementById("workoutLink").classList.remove("hidden");
      document.getElementById("logoutList").classList.remove("hidden");
      document.getElementById("loginList").classList.add("hidden");
      document.getElementById("getStartedList").classList.add("hidden");
      document.getElementById("signupButton").classList.add("hidden");
  } else {
      // User is not logged in, hide workout link and show login link
      document.getElementById("workoutLink").classList.add("hidden");
      document.getElementById("logoutList").classList.add("hidden");
      document.getElementById("loginList").classList.remove("hidden");
      document.getElementById("getStartedList").classList.remove("hidden");
      document.getElementById("signupButton").classList.remove("hidden");
  }
});
