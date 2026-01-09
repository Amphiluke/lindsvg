import {validate} from "./validator.mjs";
import {LSError} from "./ls-error.mjs";

/** @import {Rules, LSParams} from "./lindsvg.mjs" */

/** @type {Rules} */
let ctrlRules = {
  F: "",
  B: "",
  "+": "+",
  "-": "-",
  "|": "|",
  "!": "!",
  "[": "[",
  "]": "]",
};

/** @type {LSParams} */
let defaults = {
  alpha: 0,
  theta: 0,
  step: 10,
  iterations: 3,
};

/**
 * Remove all the stuff which doesn’t affect the drawing process from the raw generated codeword
 * @param {string} codeword - Raw L-system code
 * @returns {string} - Clean L-system code
 */
function cleanCodeword(codeword) {
  // Remove auxiliary drawing-indifferent letters
  let cleanCodeword = codeword.replace(/[^FB[\]+-|!]/g, "");
  do {
    codeword = cleanCodeword;
    // Remove useless brackets that don’t contain F commands or other brackets (preserving bracket balance!)
    cleanCodeword = cleanCodeword.replace(/\[[^F[\]]*]/g, "");
  } while (cleanCodeword !== codeword);
  return cleanCodeword;
}

/**
 * Generate L-system code
 * @param {LSParams} lsParams - L-system parameters
 * @returns {string} - Clean L-system code
 */
export function generateCodeword(lsParams) {
  let validity = validate(lsParams);
  if (validity !== true) {
    throw new LSError(validity);
  }
  let {axiom: code, iterations} = {...defaults, ...lsParams};
  let rules = {...ctrlRules, ...lsParams.rules};
  for (; iterations > 0; iterations--) {
    code = [...code].reduce((accumulator, letter) => accumulator + (rules[letter] || ""), "");
  }
  return cleanCodeword(code);
}

/**
 * Split a codeword into “tokens” (group equal adjacent commands)
 * @param {string} codeword - L-system code
 * @returns {string[]}
 */
export function tokenizeCodeword(codeword) {
  return codeword.match(/([FB[\]+-|!])\1*/g); // tokenize
}
