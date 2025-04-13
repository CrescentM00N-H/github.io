"use strict";

export async function loadHeaderBar() {
    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
            const header = document.querySelector('header');
            if (!header) {
                console.error("header element not found.");
                return;
            }
            console.log("Loading header bar...");

            header.innerHTML = data;

            
        })
        .then(() => {
            console.log("Header loaded successfully.");
            updateActiveLink();
            VerifyLogin();
        })
        .catch(error => { console.error("Unable to load header.", error); });
}

export function updateActiveLink() {
    const currentPath = location.hash.slice(1);
    console.log(`[INFO] current path: ${currentPath}`);
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach((link) => {
        const linkPath = link.getAttribute('href');
        if (!linkPath) {
            console.warn("[WARNING] linkPath is null");
            return;
        }

        // Create cleaned versions of paths for comparison
        const cleanedLinkPath = linkPath.replace('#', '');
        const cleanedCurrentPath = currentPath || '/'; // Default to '/' if empty
        
        // console.log(`Comparing current: ${cleanedCurrentPath} with link: ${cleanedLinkPath}`);
        
        if (cleanedLinkPath === cleanedCurrentPath) {
            // console.log(`[INFO] Link matches current path: ${linkPath}`);
            link.classList.add('active');
            link.classList.add('text-decoration-underline');
        } else {
            // console.log(`[INFO] Link does not match current path: ${linkPath}`);
            link.classList.remove('active');
            link.classList.remove('text-decoration-underline');
        }
    });
}

function handleLogout(event: Event) {
    event.preventDefault();

    sessionStorage.removeItem("user");
    console.log("User logged out");

    loadHeaderBar().then(() => {
        location.hash = "/";
    });
}

function VerifyLogin() {
    const loginNav = document.getElementById("loginNav") as HTMLAnchorElement;

    if (!loginNav) {
        console.warn("[WARNING] loginNav element not found, skipping verifyLogin().");
        return;
    }

    const userSession = sessionStorage.getItem("user");
    if (userSession) {
        loginNav.innerHTML = `<i class="fa-solid fa-sign-out-alt"></i> Logout`;
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", handleLogout);
    } else {
        loginNav.innerHTML = `<i class="fa-solid fa-sign-in-alt"></i> Login`;
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", () => {
            location.hash = "/login";
        });
    }
}
