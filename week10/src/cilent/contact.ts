
export class Contact {

    private _fullName: string;
    private _contactNumber: string;
    private _emailAddress: string;

    /**
     * Constructor for the Contact class
     * @param {full name of contact} fullName
     * @param {contacts phone number} contactNumber 
     * @param {email address of the contact} emailAddress 
     */
    constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "") {
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;

    }


    /**
     * returns the contacts full name
    */
    get fullName(): string {
        return this._fullName;
    }

    /**
     * sets the full name of the contact
     * @param {full name of the contact} fullName
    */
    set fullName(fullName: string) {
        if (typeof fullName === "string" && fullName.trim() !== "") {
            this._fullName = fullName;
        }
    }

    /**
     * gets phone number of contact
     * @returns the phone number of the contact
    */
    get contactNumber(): string {  
        return this._contactNumber;
    }

    /**
     * sets the phone number of the contact
     * @param {phone number of contact} contactNumber
    */
    set contactNumber(contactNumber: string) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // e.g. 905-985-1234
        if (phoneRegex.test(contactNumber)) {
            this._contactNumber = contactNumber;
        }
        
    }

    /**
     * gets email address of the contact
     * @returns the email address of the contact
    */
    get emailAddress(): string {
        return this._emailAddress;
    }

    /**
     * sets the email address of the contact based on standard email format
     * @param {email address of the contact} emailAddress
    */
    set emailAddress(emailAddress: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // e.g. max@email.com
        
        if (emailRegex.test(emailAddress)) {
            this._emailAddress = emailAddress;
        }
        
    }

    /**
     * Info for contact
     * @returns a string representation of the contact
     */
    toString(): string {
        return `Full Name: ${this.fullName}\n
        Contact Number: ${this.contactNumber}\n
        Email Address: ${this.emailAddress}`;
    }

    /**
     * Serializes the contact object for storage
     * @returns a comma serparated string representation of the contact
     */
    serialize(): string | undefined {
        if (!this._fullName || !this._contactNumber || !this._emailAddress) {
            console.error("Contact is missing at least one required field");
            return;
        }
        return `${this._fullName},${this._contactNumber},${this._emailAddress}`; 
    }

    /**
     * Deserializes the contact object from a comma separated string
     * @param {string} data
    */
    deserialize(data: string) {
        if (data.split(",").length !== 3) {
            console.error("Invalid format for deserialization");
            return;
        }
        const propArray = data.split(",");
        this.emailAddress = propArray[2];
        this.contactNumber = propArray[1];
        this.fullName = propArray[0];
        
        
        
    }
    
}