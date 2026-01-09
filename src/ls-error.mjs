export class LSError extends Error {
  #lsErrors;

  /**
   * LSError constructor
   * @param {object} errors - Error map “parameter->message(s)”
   * @constructor
   */
  constructor(errors) {
    let message = JSON.stringify(errors, null, 2);
    super(message);
    this.#lsErrors = structuredClone(errors);
  }

  /**
   * Get raw object representation of the errors
   * @returns {object}
   */
  toJSON() {
    return structuredClone(this.#lsErrors);
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString
Object.defineProperty(LSError.prototype, "name", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: "LSError",
});
