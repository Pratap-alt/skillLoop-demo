document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("skillloop_user");
        localStorage.removeItem("skillloop_token");

        document.cookie = "skillloop_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
        window.location.href = "login.html";
    });
});
