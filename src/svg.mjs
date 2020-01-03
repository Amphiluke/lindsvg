import {generate} from "./generator.mjs";
import {createTurtle} from "./turtle.mjs";

/**
 * Remove all letters which don’t affect the drawing process from the codeword
 * @param {String} codeword - L-system code
 * @return {String}
 */
function cleanCodeword(codeword) {
    return codeword.replace(/[^FB[\]+-]/g, "");
}

function formatCoordinates(x, y) {
    // Unary plus is used to remove insignificant trailing zeros
    return `${+x.toFixed(4)} ${+y.toFixed(4)}`;
}

/**
 * Get the value of the d attribute
 * @param {String} codeword - Clean code
 * @param {Object} turtle - Turtle object to work with
 * @return {String}
 */
function getPathData(codeword, turtle) {
    let prevCommand; // used to avoid unnecessary repeating of the commands L and M
    return [...codeword].reduce((accumulator, symbol) => {
        switch (symbol) {
            case "F":
                turtle.translate();
                accumulator += (prevCommand === "L" ? " " : "L") + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "L";
                break;
            case "B":
                turtle.translate();
                accumulator += (prevCommand === "M" ? " " : "M") + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "M";
                break;
            case "+":
                turtle.rotate(1);
                break;
            case "-":
                turtle.rotate(-1);
                break;
            case "[":
                turtle.pushStack();
                break;
            case "]":
                turtle.popStack();
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
    let pathData = getPathData(cleanCodeword(codeword), turtle);
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
    svgParams = {
        width,
        height,
        fill: "none",
        stroke: "#000",
        ...svgParams
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" height="${svgParams.height}" width="${svgParams.width}">
  <path d="${pathData}" fill="${svgParams.fill}" stroke="${svgParams.stroke}"></path>
</svg>`;
}
