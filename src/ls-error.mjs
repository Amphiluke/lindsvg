class LSError extends Error {
    /**
     * LSError constructor
     * @param {Object} errors - Error map “parameter->message(s)”
     * @constructor
     */
    constructor(errors) {
        let message = JSON.stringify(errors, null, 2);
        super(message);
        // Using JSON.parse for deep cloning
        Object.defineProperty(this, "lsErrors", {value: JSON.parse(message)});
    }

    /**
     * Get raw object representation of the errors
     * @return {Object}
     */
    toJSON() {
        return JSON.parse(JSON.stringify(this.lsErrors));
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString
Object.defineProperty(LSError.prototype, "name", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: "LSError"
});

export {LSError};
