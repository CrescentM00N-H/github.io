"use strict";


export class User {

    private _displayName: string;
    private _emailAddress: string;
    private _username: string;
    private _password: string;

    // Constructor for the User class
    constructor(displayName: string = "", emailAddress: string = "", username: string = "", password: string = "") {

        this._displayName = displayName;
        this._emailAddress = emailAddress;
        this._username = username;
        this._password = password;
    }

    get displayName(): string
    {
        return this._displayName;
    }

    get emailAddress(): string
    {
        return this._emailAddress;
    }

    get username(): string
    {
        return this._username;
    }

    set displayName(displayName: string)
    {
        this._displayName = displayName;
    }

    set emailAddress(emailAddress: string)
    {
        this._emailAddress = emailAddress;
    }
    set username(username: string)
    {
        this._username = username;
    }

    // Basic to string method
    toString(): string
    {
        return `Display Name: ${this._displayName}\nEmail Address: ${this._emailAddress}
        \nUserName: ${this._username}`;
    }

    // Serializes the data to comma separated value strings
    serialize(): string | null{
        if(this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
            return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
        }
        console.error("Unable to serialize");
        return null;
    }

    // Deserializes the data from comma separated value strings
    deserialize(data: string){
        let propertyArray = data.split(',');
        this._displayName = propertyArray[0];
        this._emailAddress = propertyArray[1];
        this._username = propertyArray[2];
    }

    // Converts to JSON format
    toJSON(): Record<string, string>
    {
        return {
            DisplayName: this._displayName,
            EmailAddress: this._emailAddress,
            Username: this._username,
            Password: this._password
        }
    }

    // Converts from JSON format
    fromJSON(data: {DisplayName: string, EmailAddress: string, Username: string, Password: string})
    {
        this._displayName = data.DisplayName;
        this._emailAddress = data.EmailAddress;
        this._username = data.Username;
        this._password = data.Password;
    }
}
