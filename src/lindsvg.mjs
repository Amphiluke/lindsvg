/**
 * L-system production rule key (letter)
 * @typedef {"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |  "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"} LSLetter
 */

/**
 * L-system production rule map Letter -> Rule
 * @typedef {{[letter in LSLetter]?: string}} LSRules
 */

/**
 * L-system parameters
 * @typedef {object} LSParams
 * @property {string} axiom - The initial code
 * @property {LSRules} rules - Productions map
 * @property {number} [x] - Turtle’s initial horizontal coordinate
 * @property {number} [y] - Turtle’s initial vertical coordinate
 * @property {number} [alpha] - Initial angle in radians
 * @property {number} theta - Angle increment in radians
 * @property {number} step - Turtle’s step length
 * @property {number} iterations - Total number of iterations used to generate the resulting L-system
 */

/**
 * Mapping of L-system key (name or identifier) to the L-system parameters
 * @typedef {{[key: string]: LSParams}} LSParamsMap
 */

/**
 * Name to value map for the <path> element attributes
 * @typedef {{[attr: string]: string | string[]}} LSVGPathAttributes
 */

/**
 * Mapping of L-system key (name or identifier) to the <path> element attributes for the L-system’s SVG
 * @typedef {{[key: string]: LSVGPathAttributes}} LSVGPathAttributesMap
 */

/**
 * Output SVG parameters
 * @typedef {object} LSVGParams
 * @property {number} [width] - Desired SVG width
 * @property {number} [height] - Desired SVG height
 * @property {number} [padding] - Additional space to extend the viewBox
 * @property {LSVGPathAttributesMap} [pathAttributesMap] - Mapping of L-system key to the <path> element attributes
 */


export * from "./svg.mjs";
