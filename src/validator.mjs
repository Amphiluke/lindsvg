/** @import {LSParams} from "./lindsvg.mjs" */

const ERROR_ILLEGAL_CHAR = "ERROR_ILLEGAL_CHAR";
const ERROR_NUMBER = "ERROR_NUMBER";
const ERROR_POSITIVE_NUMBER = "ERROR_POSITIVE_NUMBER";
const ERROR_POSITIVE_INTEGER = "ERROR_POSITIVE_INTEGER";

let letterRE = /^[A-Z]$/;
let ruleRE = /^[A-Z+\-|![\]]*$/;

export function validate(/** @type {LSParams} */lsParams) {
  let errors = Object.create(null);
  Object.entries(lsParams).forEach(([param, value]) => {
    let result = true;
    switch (param) {
      case "axiom":
        result = ruleRE.test(value) || ERROR_ILLEGAL_CHAR;
        break;
      case "rules": {
        let errors = Object.create(null);
        Object.entries(value).forEach(([letter, rule]) => {
          let result = letterRE.test(letter) || ERROR_ILLEGAL_CHAR;
          if (result === true) {
            result = ruleRE.test(rule) || ERROR_ILLEGAL_CHAR;
          }
          if (result !== true) {
            errors[letter] = result;
          }
        });
        result = Object.keys(errors).length ? errors : true;
        break;
      }
      case "x":
      case "y":
      case "alpha":
      case "theta":
        result = Number.isFinite(value) || ERROR_NUMBER;
        break;
      case "step":
        result = (Number.isFinite(value) && value > 0) || ERROR_POSITIVE_NUMBER;
        break;
      case "iterations":
        result = (Number.isInteger(value) && value > 0) || ERROR_POSITIVE_INTEGER;
        break;
    }
    if (result !== true) {
      errors[param] = result;
    }
  });
  return Object.keys(errors).length ? errors : true;
}
