//IGNORE THIS IS THE REGSITER AUTHORISATION FILE WITH FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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


const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPass").value;
const passwordCheck = document.getElementById("signupPass1").value;
const signupBtn = document.getElementById("signupContinue");


/**
 * Sends a registration request with provided email and password to Firebase.
 * @param {string} email - The email address used for registration.
 * @param {string} password - The password used for registration.
 * @param {HTMLElement} alertBar - The HTML element to display the registration status message.
 */


signupBtn.addEventListener("click", (event) =>{
  event.preventDefault();
const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPass").value;
const checkPassword = document.getElementById("signupPass1").value;
const alertBar = document.getElementById("createAccountMessage");
if(!validateEmail(email)){
  document.getElementById("emailError").innerHTML = "Invalid Email";
  return;
}
if(!validatePassword(password)){
  document.getElementById("passwordError").innerHTML = "Password length should be greater than 6 characters";
  return;
}

if (password !== checkPassword) {
  document.getElementById("passwordMatchError").innerHTML = "Passwords do not match";
  return;
}

  // Register user with Firebase

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    alertBar.textContent = "Account Successfully Created"
    createUser(user.uid);
    setTimeout(() => {
      }, 1400);
    window.location.href = "index.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alertBar.textContent = "User Already Exists"
  });
});

/**
 * Validates the format of an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email address is valid, false otherwise.
 */

function validateEmail(email){
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return (expression.test(email) === true);
}

/**
 * Validates the length of a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password length is greater than 6 characters, false otherwise.
 */

function validatePassword(password){
  return (password.length > 6);
}







/*Server Side Scripting*/

const URL = "http://localhost:3260"; // URL of our server

/**
 * Creates a user asynchronously.
 * This function sends a POST request to the server to create a new user with the provided user name.
 * It first retrieves the user name from an input field with the id 'signupUsername'.
 * If the user name is empty, it displays an alert asking the user to enter a user name.
 * After sending the request, it updates the innerHTML of an element with the class 'form__input-error-message' with the response data.
 * @returns {Promise<void>} A promise that resolves once the user creation process is complete.
 */
async function createUser(user) {
    // Get the user details from the input fields
     

        // Send a request to create the user
  
        const response = await fetch('/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user })
      });

   
}


