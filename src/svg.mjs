import {generate} from "./generator.mjs";
import {createTurtle} from "./turtle.mjs";

/**
 * Remove all letters which don’t affect the drawing process from the codeword
 * and split it into “tokens” for the further processing
 * @param {String} codeword - L-system code
 * @return {Array<String>}
 */
function tokenizeCodeword(codeword) {
    return codeword.match(/([FB[\]+-])\1*/g);
}

function formatCoordinates(x, y) {
    // Unary plus is used to remove insignificant trailing zeros
    return `${+x.toFixed(4)} ${+y.toFixed(4)}`;
}

/**
 * Get the value of the d attribute
 * @param {Array<String>} tokens - Tokenized codeword
 * @param {Object} turtle - Turtle object to work with
 * @return {String}
 */
function getPathData(tokens, turtle) {
    let prevCommand; // used to avoid unnecessary repeating of the commands L and M
    return tokens.reduce((accumulator, token) => {
        let tokenLength = token.length;
        switch (token[0]) {
            case "F":
                turtle.translate(tokenLength);
                accumulator += (prevCommand === "L" ? " " : "L") + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "L";
                break;
            case "B":
                turtle.translate(tokenLength);
                if (prevCommand === "M") {
                    // As the spec states, “If a moveto is followed by multiple pairs of coordinates,
                    // the subsequent pairs are treated as implicit lineto commands”.
                    // This is not what we want, so delete the preceding moveto command
                    accumulator = accumulator.slice(0, accumulator.lastIndexOf("M"));
                }
                accumulator += "M" + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "M";
                break;
            case "+":
                turtle.rotate(tokenLength);
                break;
            case "-":
                turtle.rotate(-tokenLength);
                break;
            case "[":
                turtle.pushStack(tokenLength);
                break;
            case "]":
                turtle.popStack(tokenLength);
                accumulator += `M${formatCoordinates(turtle.x, turtle.y)}`;
                prevCommand = "M";
                break;
        }
        return accumulator;
    }, "M" + formatCoordinates(turtle.x, turtle.y));
}

/**
 * Get raw data required for SVG rendering
 * @param {LSParams} lsParams - L-system parameters
 * @return {{pathData: String, minX: Number, minY: Number, width: Number, height: Number}}
 */
export function getSVGData(lsParams) {
    let codeword = generate(lsParams);
    let turtle = createTurtle({x: 0, y: 0, ...lsParams});
    let pathData = getPathData(tokenizeCodeword(codeword), turtle);
    return {
        pathData,
        ...turtle.getDrawingRect()
    };
}

/**
 * Get ready-to-render L-system’s SVG code
 * @param {LSParams} lsParams - L-system parameters
 * @param {SVGParams} svgParams - Output SVG parameters
 * @return {String}
 */
export function getSVGCode(lsParams, svgParams) {
    let {pathData, minX, minY, width, height} = getSVGData(lsParams);
    let svgConfig = {
        width: svgParams.width || width,
        height: svgParams.height || height,
        padding: svgParams.padding || 0,
        pathAttributes: {
            // for backward compatibility with v1.1.0, also check fill and stroke as direct props of svgParams
            fill: svgParams.fill || "none",
            stroke: svgParams.stroke || "#000",
            ...svgParams.pathAttributes
        }
    };
    let {padding} = svgConfig;
    let pathAttrStr = Object.entries(svgConfig.pathAttributes).reduce((accumulator, [name, value]) => {
        value = value.replace(/"/g, "&quot;");
        return `${accumulator} ${name}="${value}"`;
    }, "");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - padding} ${minY - padding} ${width + 2 * padding} ${height + 2 * padding}" height="${svgConfig.height}" width="${svgConfig.width}">
  <path d="${pathData}"${pathAttrStr}></path>
</svg>`;
}
