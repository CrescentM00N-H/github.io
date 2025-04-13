//IIFE - Immediately Invoked Functional Expression
"use strict";
import { loadHeaderBar } from "./header";
import { Router } from "./router";
const PageTitles = {
    "/": "Home",
    "/home": "Home",
    "/about": "About Us",
    "/products": "Products",
    "/services": "Services",
    "/contact": "Contact Us",
    "/contact-list": "Contact List",
    "/edit": "Edit Contact",
    "/login": "Login",
    "/register": "Register",
    "/404": "Page Not Found"
};
const routes = {
    "/": "views/pages/home.html",
    "/home": "views/pages/home.html",
    "/about": "views/pages/about.html",
    "/products": "views/pages/products.html",
    "/services": "views/pages/services.html",
    "/contact": "views/pages/contact.html",
    "/contact-list": "views/pages/contact-list.html",
    "/edit": "views/pages/edit.html",
    "/login": "views/pages/login.html",
    "/register": "views/pages/register.html",
    "/404": "views/pages/404.html"
};
const router = new Router(routes);
(function () {
    function handleCancelClick() {
        router.navigate("/contact-list");
    }
    function DisplayWeather() {
        console.log("Displaying weather...");
    }
    function validateForm() {
        return true;
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        console.log("Adding contact:", fullName, contactNumber, emailAddress);
    }
    function handleAddClick() {
        console.log("Handling add click...");
    }
    function handleEditClick(event, contact, page) {
        console.log("Handling edit click for:", contact, page);
    }
    function addEventListenerOnce(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            const wrappedHandler = (e) => {
                handler(e);
                element.removeEventListener(event, wrappedHandler);
            };
            element.addEventListener(event, wrappedHandler);
        }
    }
    async function DisplayLoginPage() {
        console.log("DisplayLoginPage called...");
        if (sessionStorage.getItem("user")) {
            router.navigate("/contact-list");
            return;
        }
        const messageArea = document.getElementById("messageArea");
        const loginButton = document.getElementById("loginButton");
        const cancelButton = document.getElementById("cancelButton");
        const loginForm = document.getElementById("loginForm");
        if (!messageArea) {
            console.error("[ERROR] Message Area not found");
            return;
        }
        messageArea.style.display = "none";
        if (!loginButton) {
            console.error("Login Button not found");
            return;
        }
        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            try {
                let response = await fetch('http://localhost:3000/users');
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const jsonData = await response.json();
                const users = jsonData.users;
                console.log(users);
                if (!Array.isArray(users)) {
                    throw new Error(`Unable to load users.`);
                }
                let success = false;
                let authenticateUser = null;
                for (const user of users) {
                    if (user.username === username && user.password === password) {
                        success = true;
                        authenticateUser = user;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", JSON.stringify({
                        DisplayName: authenticateUser.displayName,
                        EmailAddress: authenticateUser.emailAddress,
                        Username: authenticateUser.username,
                    }));
                    messageArea.classList.remove("alert", "alert-danger");
                    messageArea.style.display = "none";
                    loadHeaderBar().then(() => {
                        router.navigate("/contact-list");
                    });
                }
                else {
                    if (messageArea) {
                        messageArea.classList.add("alert", "alert-danger");
                        messageArea.textContent = "Invalid user or password, please try again.";
                    }
                    else {
                        console.error("Message area element not found.");
                    }
                    messageArea.style.display = "block";
                    document.getElementById("username").focus();
                    document.getElementById("username").select();
                }
            }
            catch (error) {
                console.error("Login failed.", error);
            }
        });
        if (cancelButton && loginForm) {
            cancelButton.addEventListener("click", (event) => {
                loginForm.reset();
                router.navigate("/");
            });
        }
        else {
            console.warn("[WARNING] Cancel button or login form not found.");
        }
    }
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");
    });
})();
