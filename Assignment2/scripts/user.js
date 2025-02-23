(function(main){
    class User{

        constructor(displayName = "", emailAddress = "", username = "", password = "" ){
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        get displayName() {
            return this.DisplayName;
        }

        set displayName(value) {
            this.DisplayName = value;
        }

        get emailAddress() {
            return this.EmailAddress;
        }

        set emailAddress(value) {
            this.EmailAddress = value;
        }

        get username(){
            return this.Username;
        }

        set username(value){
            this.Username = value;
        }

        toString(){
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUser Name: ${this.Username}`
        }

        toJSON(){
            return{
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password
            }
        }

        fromJSON(json){
            this.DisplayName = json.DisplayName;
            this.EmailAddress = json.EmailAddress;
            this.Username = json.Username;
            this.Password = json.Password;
        }

        serialize() {
            if (!this.DisplayName || !this.EmailAddress || !this.Username || !this.Password) {
                console.error("One or more of the user properties are missing or invalid.")
                return null;
            }
            return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
        }

        /**
         * Deserializes a string (comma-delimited) of contact details and update properties.
         * @param data
         */
        deserialize(data) {
            if (typeof data !== "string" || data.split(",").length !== 4) {
                console.error("Invalid Data format for deserializing data.");
                return;
            }
            const propArray = data.split(",");
            this.DisplayName = propArray[0];
            this.EmailAddress = propArray[1];
            this.Username = propArray[2];
            this.Password = propArray[3];
        }

    }

    main.User = User;
})(main || (main = {}));
