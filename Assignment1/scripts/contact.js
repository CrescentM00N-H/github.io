"use strict";

/**
 * Represents a Contact with a name, contact number and email address.
 */
class Contact {

    /**
     * Constructs a new Contact instance
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    constructor(fullName = "", contactNumber = "", emailAddress = "") {
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;
    }

    /**
     * Gets the full name of the contact
     * @returns {string}
     */
    get fullName() {
        return this._fullName;
    }

    /**
     * Sets the full name of contact. Validates input to ensure it's a non-empty string.
     * @param value
     */
    set fullName(value) {
        if( typeof value !== "string" || value.trim() === ""){
            throw new Error("Invalid fullName: must be non-empty string");
        }
        this._fullName = value;
    }

    /**
     * Gets the contact number of the contact
     * @returns {string}
     */
    get contactNumber() {
        return this._contactNumber;
    }

    /**
     * Sets the contact number of the contact. validates input to ensure that it matches 10 digit format.
     * @param value
     */
    set contactNumber(value) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // 555-555-5555
        if(!phoneRegex.test(value)){
            throw new Error("Invalid contact number: must be a 10 digit number");
        }
        this._contactNumber = value;
    }

    /**
     * Gets the email address for the contact
     * @returns {string}
     */
    get emailAddress() {
        return this._emailAddress;
    }

    /**
     * Sets the email address of the contact. Validates to ensure that it matches a valid email.
     * @param value
     */
    set emailAddress(value) {
        const emailRegex = /^[^\s@]+@[\s@]+\.[^\s@]+$/
        if(!emailRegex.test(value)){
            throw new Error("Invalid email address: must be a valid email address");
        }
        this._emailAddress = value;
    }

    /**
     * Converts the contact details into a human-readable string.
     * @returns {string}
     */
    toString() {
        return `Full Name: ${this._fullName}\n Contact Number: ${this._contactNumber}\n Email Address: ${this._emailAddress}`;
    }

    /**
     * Serializes the contact details into a string format suitable for storage.
     * @returns {string|null}
     */
    serialize(){
        if(!this._fullName || !this._contactNumber || !this._emailAddress) {
            console.error("One or more of the contact properties are missing or invalid.")
            return null;
        }
        return `${this._fullName}, ${this._contactNumber}, ${this._emailAddress}`;
    }

    /**
     * Deserializes a string (comma-delimited) of contact details and update properties.
     * @param data
     */
    deserialize(data) {
        if(typeof data !== "string" || data.split(",").length !== 3){
            console.error("Invalid Data format for deserializing data.");
            return;
        }
        const propArray = data.split(",");
        this._fullName = propArray[0];
        this._contactNumber = propArray[1];
        this._emailAddress = propArray[2];
    }
}