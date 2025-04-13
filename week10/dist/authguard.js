"use strict";
let sessionTimeout;
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        console.warn("[WARNING] Session timeout reached.");
        sessionStorage.removeItem("user");
        // Dispatches a global event
        window.dispatchEvent(new CustomEvent("sessionExpired"));
    }, 60 * 15 * 1000);
}
document.addEventListener("mousemove", resetSessionTimeout);
document.addEventListener("keypress", resetSessionTimeout);
export function AuthGuard() {
    console.log("[AUTHGUARD] Checking whether user is logged in");
    const user = sessionStorage.getItem("user");
    const protectedRoutes = [
        "/contact-list",
        "/edit"
    ];
    console.log(location.hash.slice(1));
    if (!user && protectedRoutes.includes(location.hash.slice(1))) {
        console.log("[AUTHGUARD] unauthorized access detected. Redirecting to login page.");
        location.hash = "#/login";
        window.dispatchEvent(new CustomEvent("sessionExpired"));
    }
    else {
        resetSessionTimeout();
    }
}
