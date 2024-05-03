//IGNORE THIS IS THE Forgot AUTHORISATION FILE WITH FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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


const forgotBtn = document.getElementById("forgotSubmit");

forgotBtn.addEventListener("click", (event) =>{
event.preventDefault();
const email = document.getElementById("forgotPasswordEmail").value;
const alertBar = document.getElementById("forgotPasswordMessage");
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Signed up 
    // ...
    alertBar.textContent = "A password link has been sent to your email"
    setTimeout(() => {
      }, 1);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alertBar.textContent = "Invalid Email"
  });
});
