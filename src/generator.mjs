import {validate} from "./validator.mjs";
import {LSError} from "./ls-error.mjs";

/** @type {Rules} */
let ctrlRules = {
    F: "",
    B: "",
    "+": "+",
    "-": "-",
    "[": "[",
    "]": "]"
};

/** @type {LSParams} */
let defaults = {
    alpha: 0,
    theta: 0,
    step: 10,
    iterations: 3
};

/**
 * Generate L-system code
 * @param {LSParams} lsParams - L-system parameters
 * @return {String}
 */
export function generate(lsParams) {
    let validity = validate(lsParams);
    if (validity !== true) {
        throw new LSError(validity);
    }
    let {axiom: code, iterations} = {...defaults, ...lsParams};
    let rules = {...ctrlRules, ...lsParams.rules};
    for (; iterations > 0; iterations--) {
        code = [...code].reduce((accumulator, letter) => accumulator + (rules[letter] || ""), "");
    }
    return code;
}
