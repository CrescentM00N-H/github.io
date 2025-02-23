"use strict";

/**
 * class for a volunteer opportunity.
 */
class Events {

    /**
     * Constructor for a volunteer opportunity.
     * @param title
     * @param description
     * @param date
     */
    constructor(title = "", description = "", date = new Date()) {
        this._title = title;
        this._description = description;
        this._date = date;
    }

    /**
     * Gets the value of the title
     * @returns {string}
     */
    get title() {
        return this._title;
    }

    /**
     * sets the title value
     * @param value
     */
    set title(value) {
        this._title = value;
    }

    /**
     * gets the description
     * @returns {string}
     */
    get description() {
        return this._description;
    }

    /**
     * sets the description
     * @param value
     */
    set description(value) {
        this._description = value;
    }

    /**
     * gets the date.
     * @returns {Date}
     */
    get date() {
        return this._date;
    }

    /**
     * sets the date.
     * @param value
     */
    set date(value) {
        this._date = value;
    }

    

}
