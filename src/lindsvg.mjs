/**
 * L-system production rule map Letter -> Rule
 * @typedef {Object<string, string>} Rules
 */

/**
 * L-system parameters
 * @typedef {object} LSParams
 * @property {string} axiom - The initial code
 * @property {Rules} rules - Productions map
 * @property {number} alpha - Initial angle in radians
 * @property {number} theta - Angle increment in radians
 * @property {number} step - The length of a “turtle” step
 * @property {number} iterations - Total number of iterations used to generate the resulting L-system
 */

/**
 * Output SVG parameters
 * @typedef {object} SVGParams
 * @property {number} [width] - Desired SVG width
 * @property {number} [height] - Desired SVG height
 * @property {number} [padding] - Additional space to extend the viewBox
 * @property {Object<string, string | string[]>} [pathAttributes] - Name to value map for the <path> element attributes
 */


export * from "./svg.mjs";
