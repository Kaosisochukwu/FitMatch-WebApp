/**
 * Adds an event listener to the logout button to clear user session and redirect to index.html.
 */
document.getElementById("logoutList").addEventListener("click",(event)=>{
    sessionStorage.setItem("user-info", "");
    sessionStorage.setItem("workoutData", " ");
    window.location.href = "index.html"
});