import { Contact } from "./contact";
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
function validateForm() {
    return (validateInput("fullName") &&
        validateInput("contactNumber") &&
        validateInput("emailAddress"));
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
