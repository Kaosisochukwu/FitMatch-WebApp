//IGNORE THIS IS THE SignIn AUTHORISATION FILE WITH FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/**
 * Initialize Firebase with the provided configuration.
 * @param {object} firebaseConfig - Firebase configuration object.
 * @returns {object} Firebase app instance.
 */
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

/**
 * Signs in the user with the provided email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {HTMLElement} alertBar - The HTML element to display the sign-in status message.
 */

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    sessionStorage.setItem("user-info", JSON.stringify({
            user: user.uid
    }))
     getUser(user.uid)
                .then((data) => {
                  window.alert("HIIII" + data.user.text);
                 sessionStorage.setItem("workoutData", data.user.text);
                 console.log('User data:', data);
                    alertBar.textContent = "Successfully Logged In";
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1400);
                })
                .catch((error) => {
                    console.error('Error:', error.message);
                    alert('Failed to get user. Please try again.');
                });
        })
        .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alertBar.textContent = "Incorrect Email or Password"
  });
});


/**
 * Executes when the DOM content is loaded.
 * Checks if the user is logged in and adjusts UI accordingly.
 */

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



const URL = "http://localhost:3260"; // URL of our server

/**
 * Creates a user asynchronously.
 * This function sends a POST request to the server to create a new user with the provided user name.
 * It first retrieves the user name from an input field with the id 'signupUsername'.
 * If the user name is empty, it displays an alert asking the user to enter a user name.
 * After sending the request, it updates the innerHTML of an element with the class 'form__input-error-message' with the response data.
 * @returns {Promise<void>} A promise that resolves once the user creation process is complete.
 */
async function getUser(user_id) {
    // Get the user details from the input fields
   
       try{
        // Send a request to create the user
        
        const response = await fetch(`/get?user_id=${user_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (!response.ok) {
        throw new Error('Failed to get user from db');
    }

 
    return await response.json();
        // Log the user data to the console
        
      } catch (error) {
        // Display error message if an error occurs
        console.error('Error:', error.message);
        alert('Failed to get user. Please try again.');
    }
}