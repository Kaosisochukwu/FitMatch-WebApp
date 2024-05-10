/**
 * Sets a message to be displayed within a form element, indicating success or error.
 * 
 * @param {HTMLElement} formElement - The HTML form element to which the message belongs.
 * @param {String} type - The type of message, either "success" or "error".
 * @param {String} message - The message content to be displayed.
 */

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

/**
 * Sets a message to be displayed within a form element, indicating error.
 * 
 * @param {HTMLElement} inputElement - The HTML form element to which the message belongs.
 * @param {String} message - The message content to be displayed.
 */


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

/**
 * Sets a message to be displayed within a form element, indicating error.
 * 
 * @param {HTMLElement} inputElement - The HTML form element to which the error should be removed.
 */
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPasswordForm = document.querySelector("#forgotPassword");
    const signupBtn = document.querySelector("#signupButton");
    const landingContainer = document.querySelector("#landingContainer");
    const loginContainer = document.querySelector("#loginContainer");
    const workoutContainer = document.querySelector("#workoutContainer");

    loginContainer.style.display = 'none';
    workoutContainer.style.display = 'none';

    
    
    document.querySelector("#title").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        loginContainer.style.display = 'none';
        workoutContainer.style.display = 'none';
        landingContainer.style.display = ''; 
    });
  

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        workoutContainer.style.display = 'none';
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        workoutContainer.style.display = 'none';
    });

    document.querySelector("#linkLoginPass").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        workoutContainer.style.display = 'none';
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.remove("form--hidden");
        workoutContainer.style.display = 'none';
    });

    signupBtn.addEventListener("click", e => {
        e.preventDefault();
        // Add a delay of 400 milliseconds 
        setTimeout(() => {
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        landingContainer.style.display = 'none';   
        loginContainer.style.display = '';  
        workoutContainer.style.display = 'none';
        }, 400); 
    });

    document.querySelector("#loginList").addEventListener("click", e => {
        e.preventDefault();
        // Add a delay of 400 milliseconds 
        setTimeout(() => {
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        landingContainer.style.display = 'none';   
        loginContainer.style.display = '';  
        workoutContainer.style.display = 'none';
        }, 400); 
    });

    document.querySelector("#getStartedList").addEventListener("click", e => {
        e.preventDefault();
        // Add a delay of 400 milliseconds 
        setTimeout(() => {
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        landingContainer.style.display = 'none';   
        loginContainer.style.display = '';  
        workoutContainer.style.display = 'none';
        }, 400); 
    });




    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be greater than 4 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });


    document.querySelector("#loginContinue").addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent the default click behavior
    
        // Call the createUser function
        await readUser();
    });

    

    document.querySelector("#workoutLink").addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent the default click behavior
        landingContainer.style.display = 'none';
        workoutContainer.style.display = "";
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");  
        loginContainer.style.display = 'none';
        // Call the createUser function
    });
    
});


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
async function createUser() {
    // Get the user details from the input fields
    const user_id = document.querySelector("#signupUsername").value.trim();
    const user_email = document.querySelector("#signupEmail").value.trim();
    const user_pass = document.querySelector("#signupPass").value.trim();
    const user_pass1 = document.querySelector("#signupPass1").value.trim();

    // Check if the user name is empty
    if (user_id === "") {
        alert("Please Enter a user name");
        return;
    }
    // Check if the passwords match
    if (user_pass !== user_pass1) {
        alert("Passwords do not match");
        return;
    }


    try {
        // Send a request to create the user
        const response = await fetch(`${URL}/create?name=${user_id}&email=${user_email}&password=${user_pass}`, {
            method: "POST",
        });

        const responseData =  await response.text();

        document.querySelector("#createAccountMessage").innerHTML = responseData;
        
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle error, show an alert or log it
    }
}


async function readUser(){
    const login_id = document.querySelector("#loginName").value.trim();
    const login_password = document.querySelector("#loginPassword").value.trim();
   
    if (login_id === "") {
        alert("Please Enter a user name or email");
        return;
    }
    // Check if the passwords match
    if (login_password  === "") {
        alert("Please enter Password");
        return;
    }
   

    
    try {
        // Send a request to create the user
        const response = await fetch(`${URL}/read?name=${login_id}&password=${login_password}`, {
            method: "GET",
        });
        const responseData =  await response.text();
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle error, show an alert or log it
    }

}




