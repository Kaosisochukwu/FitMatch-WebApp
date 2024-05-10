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





