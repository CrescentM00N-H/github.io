//IIFE - Immediately Invoked Functional Expression
"use strict";
import { loadHeaderBar } from "./header.js";
import { Router } from "./router.js";
import { loadFooterBar } from "./footer.js";
import { AuthGuard } from "./authguard.js";
import { Contact } from "./contact.js";
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
    function handleEditClick(event, contact, page) {
        event.preventDefault();
        if (!validateForm()) {
            alert("Form is invalid. Check the form");
            return;
        }
        const fullName = document.getElementById("fullName").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;
        contact.fullName = fullName;
        contact.contactNumber = contactNumber;
        contact.emailAddress = emailAddress;
        localStorage.setItem(page, contact.serialize());
        router.navigate("/contact-list");
    }
    function handleAddClick(event) {
        event.preventDefault();
        if (!validateForm()) {
            console.error("Form is invalid. Cannot add contact");
            return;
        }
        const fullName = document.getElementById("fullName").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;
        AddContact(fullName, contactNumber, emailAddress);
        router.navigate("/contact-list");
    }
    function addEventListenerOnce(elementID, event, handler) {
        const element = document.getElementById(elementID);
        if (element) {
            element.removeEventListener(event, handler);
            element.addEventListener(event, handler, { once: true });
        }
        else {
            console.warn(`[WARN] Element with ID '${elementID}' not found`);
        }
    }
    function validateForm() {
        return (validateInput("fullName") &&
            validateInput("contactNumber") &&
            validateInput("emailAddress"));
    }
    const VALIDATION_RULES = {
        fullName: {
            regex: /^[a-zA-Z\s]+$/,
            errorMessage: "Full Name must contain only letters and spaces"
        },
        contactNumber: {
            regex: /^\d{3}-\d{3}-\d{4}$/,
            errorMessage: "Contact Number must be in the format 123-456-7890"
        },
        emailAddress: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errorMessage: "Email Address must be in the format start@company.someurl i.e johndoe@gmail.com"
        }
    };
    function validateInput(fieldID) {
        const field = document.getElementById(fieldID);
        const errorElement = document.getElementById(`${fieldID}-error`);
        const rule = VALIDATION_RULES[fieldID];
        if (!field || !errorElement || !rule) {
            console.warn(`[WARN] Validation rule not found for ${fieldID}`);
            return false;
        }
        if (field.value.trim() === "") {
            errorElement.textContent = rule.errorMessage;
            errorElement.style.display = "block";
            return false;
        }
        if (!rule.regex.test(field.value)) {
            errorElement.textContent = rule.errorMessage;
            errorElement.style.display = "block";
            return false;
        }
        errorElement.textContent = "";
        errorElement.style.display = "none";
        return true;
    }
    function attachValidationListener() {
        console.log("Attaching validation listener to object");
        Object.keys(VALIDATION_RULES).forEach((fieldID) => {
            const field = document.getElementById(fieldID);
            if (!field) {
                console.warn(`[WARNING] Field '${fieldID}' not found. Skipping validation listener`);
                return;
            }
            addEventListenerOnce("contactForm", "submit", (event) => {
                if (!validateForm()) {
                    event.preventDefault();
                }
            });
        });
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        console.log("[DEBUG] AddContact() called");
        if (!validateForm()) {
            alert("Form contains errors. Cannot add contact");
            return;
        }
        let contact = new Contact(fullName, contactNumber, emailAddress);
        const SerializedContact = contact.serialize();
        if (SerializedContact) {
            let key = `contact_${Date.now()}`;
            localStorage.setItem(key, SerializedContact);
        }
        else {
            console.error("[ERROR] Contact serialization failed");
        }
    }
    async function DisplayWeather() {
        const apiKey = "f67c8bf3435ac4efdc3f5ef9d5bf6500";
        const city = "Oshawa";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data from openweathermap.org");
            }
            const data = await response.json();
            console.log("Weather API Response", data);
            const weatherDataElement = document.getElementById("weather-data");
            if (weatherDataElement === null) {
                console.error("[Error)Element not found: weather-data");
                return;
            }
            weatherDataElement.innerHTML = `<strong>City:</strong> ${data.name}<br>
            <strong>Temperature: </strong> ${data.main.temp} <br>
            <strong>Weather: </strong> ${data.weather[0].description} <br>`;
        }
        catch (error) {
            console.error("Error fetching weather data", error);
            document.getElementById("weather-data").innerHTML = "Unable to fetch weather data at the moment";
        }
    }
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage()...");
        const main = document.querySelector("main");
        if (!main) {
            console.error("[ERROR] Main element not found");
            return;
        }
        main.innerHTML = "";
        main.insertAdjacentHTML("beforeend", `<button id="AboutUsBtn" class="btn btn-primary">About Us</button>
            <div id="weather-data">Fetching weather data... </div>
            
            <div id="Weather" class="mt-5">
                <h3>Weather Information</h3>
                <p id="weather-data">Fetching weather data</p>
            </div>

            <p id="mainParagraph" class="mt-3">This is a simple paragraph</p>
            <article class="container">
                <p id="ArticleParagraph" class="mt-3">This is my article paragraph...</p>
            </article>
        `);
        const AboutUsBtn = document.getElementById("AboutUsBtn");
        if (AboutUsBtn) {
            AboutUsBtn.addEventListener("click", () => {
                router.navigate("/about");
            });
        }
        DisplayWeather();
    }
    function DisplayAbout() {
        console.log("Calling DisplayAbout()...");
    }
    function DisplayProducts() {
        console.log("Calling DisplayProducts()...");
    }
    function DisplayServices() {
        console.log("Calling DisplayServices()...");
    }
    function DisplayContact() {
        console.log("Calling DisplayContact()...");
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        if (!sendButton || !subscribeCheckbox) {
            console.error("Send button or subscribe checkbox not found");
            return;
        }
        sendButton.addEventListener("click", function (event) {
            event.preventDefault();
            if (!validateForm()) {
                console.error("Form is invalid. Fix your errors before resubmitting");
                return;
            }
            if (subscribeCheckbox.checked) {
                AddContact(document.getElementById("fullName").value, document.getElementById("contactNumber").value, document.getElementById("emailAddress").value);
            }
            alert("Form submitted successfully");
        });
        const contactListButton = document.getElementById("contactListButton");
        if (contactListButton) {
            contactListButton.addEventListener("click", function (event) {
                event.preventDefault();
                router.navigate("/contact-list");
            });
        }
    }
    function DisplayContactList() {
        console.log("Calling DisplayContactList()...");
        let contactList = document.getElementById("contactList");
        if (!contactList) {
            console.error("[ERROR] Contact List element not found");
            return;
        }
        let data = "";
        let keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key.startsWith("contact_")) {
                let contactData = localStorage.getItem(key);
                if (!contactData) {
                    console.error("[ERROR] Contact data is null");
                    return;
                }
                try {
                    console.log(contactData);
                    let contact = new Contact();
                    contact.deserialize(contactData);
                    data += `<tr>
                    <th scope ="row" class="text-center"> 
                            <td>${contact.fullName}</td> 
                            <td>${contact.contactNumber}</td> 
                            <td>${contact.emailAddress}</td> 
                            <td>
                                <button value="${key}" class="btn btn-warning btn-sm edit">
                                <i class="fa-solid fa-user-pen"></i>Edit
                                </button>                            
                            </td>
                            <td>
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fa-solid fa-user-minus"></i>
                                Delete</button>  
                            </td>
                        </th>
                    </tr>`;
                }
                catch (error) {
                    console.error("Error: Contact data is invalid");
                    return;
                }
            }
        }
        contactList.innerHTML = data;
        const addButton = document.getElementById("addButton");
        if (addButton) {
            addButton.addEventListener("click", function () {
                router.navigate("/edit#add");
            });
        }
        const deleteButtons = document.querySelectorAll("button.delete");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const contactKey = this.value;
                console.log('[DEBUG] Delete button clicked: ', contactKey);
                if (!contactKey.startsWith("contact_")) {
                    console.error("[ERROR] Invalid key format: ", contactKey);
                    return;
                }
                if (confirm("Delete contact? Please confirm")) {
                    localStorage.removeItem(button.value);
                    router.navigate("/contact-list");
                }
            });
        });
        const editButtons = document.querySelectorAll("button.edit");
        editButtons.forEach((button) => {
            button.addEventListener("click", function () {
                router.navigate("/edit#" + this.value);
            });
        });
    }
    function DisplayEditPage() {
        const hashParts = location.hash.split("#");
        const page = hashParts.length > 2 ? hashParts[2] : "";
        console.log(page);
        const editButton = document.getElementById("editButton");
        if (!editButton) {
            console.error("[ERROR] Edit button not found");
            return;
        }
        const cancelButton = document.getElementById("cancelButton");
        const pageTitle = document.querySelector("main > h1");
        if (!pageTitle) {
            console.error("[ERROR] Page title element not found");
            return;
        }
        if (page === "add") {
            pageTitle.textContent = "Add Contact";
            if (editButton) {
                editButton.innerHTML = `<i class="fa-solid fa-user-pen"> Add Contact`;
                editButton.classList.remove("btn-primary");
                editButton.classList.add("btn-success");
                addEventListenerOnce("cancelButton", "click", handleCancelClick);
                addEventListenerOnce("editButton", "click", handleAddClick);
            }
        }
        else {
            console.log("DEBUG: Add page   ", page);
            const contactData = localStorage.getItem(page);
            let contact = new Contact();
            if (contactData) {
                contact.deserialize(contactData);
                console.log(contact);
                console.log(contact + "   " + contactData);
            }
            document.getElementById("fullName").value = contact.fullName;
            document.getElementById("contactNumber").value = contact.contactNumber;
            document.getElementById("emailAddress").value = contact.emailAddress;
            if (editButton) {
                editButton.innerHTML = `<i class="fa-solid fa-user-pen"> Edit Contact`;
                editButton.classList.remove("btn-primary");
                editButton.classList.add("btn-success");
            }
            addEventListenerOnce("editButton", "click", (event) => {
                handleEditClick(event, contact, page);
            });
            addEventListenerOnce("cancelButton", "click", handleCancelClick);
            if (cancelButton) {
                cancelButton.addEventListener("click", (event) => {
                    router.navigate("/contact-list");
                });
            }
        }
    }
    function DisplayLoginPage() {
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
                const response = await fetch("/users.json");
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
    function DisplayRegisterPage() {
        console.log("DisplayRegisterPage called...");
    }
    document.addEventListener("routeLoaded", (event) => {
        const newPath = event.detail;
        console.log("[INFO] Route Loaded: ", newPath);
        handlePageLogic(newPath);
    });
    document.addEventListener("sessionExpired", () => {
        console.warn("[SESSION] Session has expired.");
        router.navigate("/login");
    });
    function handlePageLogic(path) {
        // This is what google told me to do
        document.title = PageTitles[path] || "Untitled Page";
        console.log(` Current page title: ${document.title}`);
        const protectedRoutes = [
            "/contact-list",
            "/edit"
        ];
        if (protectedRoutes.includes(path)) {
            AuthGuard();
        }
        switch (path) {
            case "/":
            case "/home":
                DisplayHomePage();
                break;
            case "/about":
                DisplayAbout();
                break;
            case "/products":
                DisplayProducts();
                break;
            case "/services":
                DisplayServices();
                break;
            case "/contact":
                DisplayContact();
                break;
            case "/contact-list":
                DisplayContactList();
                break;
            case "/edit":
                DisplayEditPage();
                break;
            case "/login":
                DisplayLoginPage();
                break;
            case "/register":
                DisplayRegisterPage();
                break;
            default:
                console.error("No matching path found");
                break;
        }
    }
    async function Start() {
        console.log("Starting...");
        console.log(`Current document title: ${document.title}`);
        // await loadHeaderBar();
        await loadFooterBar();
        const currentPath = location.hash.slice(1) || "/";
        router.loadRoute(currentPath);
    }
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");
        Start();
    });
})();
