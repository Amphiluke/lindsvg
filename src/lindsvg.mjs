/**
 * L-system production rule map Letter -> Rule
 * @typedef {Object} Rules
 */

/**
 * L-system parameters
 * @typedef {Object} LSParams
 * @property {String} axiom - The initial code
 * @property {Rules} rules - Productions map
 * @property {Number} alpha - Initial angle in radians
 * @property {Number} theta - Angle increment in radians
 * @property {Number} step - The length of a “turtle” step
 * @property {Number} iterations - Total number of iterations used to generate the resulting L-system
 */

/**
 * Output SVG parameters
 * @typedef {Object} SVGParams
 * @property {Number} [width] - Desired SVG width
 * @property {Number} [height] - Desired SVG height
 * @property {String} [fill="none"] - Value of the “fill” attribute on the “path” element
 * @property {String} [stroke="#000"] - Value of the “stroke” attribute on the “path” element
 */


export {getSVGData, getSVGCode} from "./svg.mjs";
