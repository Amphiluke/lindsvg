/**
 * L-system production rule key (letter)
 * @typedef {"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |  "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"} LSLetter
 */

/**
 * L-system production rule map Letter -> Rule
 * @typedef {{[letter in LSLetter]?: string}} Rules
 */

/**
 * Name to value map for the <path> element attributes
 * @typedef {{[attr: string]: string | string[]}} SVGPathAttributes
 */

/**
 * Name to value map for the <path> element attributes in an SVG with multiple L-systems combined
 * @typedef {{[key: string]: SVGPathAttributes}} ComboSVGPathAttributes
 */

/**
 * L-system parameters
 * @typedef {object} LSParams
 * @property {string} axiom - The initial code
 * @property {Rules} rules - Productions map
 * @property {number} [x] - Turtle’s initial horizontal coordinate
 * @property {number} [y] - Turtle’s initial vertical coordinate
 * @property {number} [alpha] - Initial angle in radians
 * @property {number} theta - Angle increment in radians
 * @property {number} step - Turtle’s step length
 * @property {number} iterations - Total number of iterations used to generate the resulting L-system
 */

/**
 * Output SVG parameters
 * @template {SVGPathAttributes | ComboSVGPathAttributes} [P=SVGPathAttributes]
 * @typedef {object} SVGParams
 * @property {number} [width] - Desired SVG width
 * @property {number} [height] - Desired SVG height
 * @property {number} [padding] - Additional space to extend the viewBox
 * @property {P} [pathAttributes] - Name to value map for the <path> element attributes
 */


export * from "./svg.mjs";
