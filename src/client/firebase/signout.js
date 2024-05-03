document.getElementById("logoutList").addEventListener("click",(event)=>{
    sessionStorage.setItem("user-info", "");
    window.location.href = "index.html"
});