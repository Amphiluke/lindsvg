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
 * @property {Number} [padding=0] - Additional space to extend the viewBox
 * @property {Object} [pathAttributes={fill:"none",stroke:"#000"}] - Name to value map for the “path” element attributes
 */


export {getSVGData, getSVGCode} from "./svg.mjs";
