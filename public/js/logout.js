document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".logoutBtn");
   
    buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        localStorage.removeItem("skillloop_user");
        localStorage.removeItem("skillloop_token");
        document.cookie = "skillloop_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "index.html";
        });
    });
});
