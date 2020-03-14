import {generate} from "./generator.mjs";
import {createTurtle} from "./turtle.mjs";

/**
 * Remove all letters which don’t affect the drawing process from the codeword
 * and split it into “tokens” for the further processing
 * @param {String} codeword - L-system code
 * @return {String[]}
 */
function tokenizeCodeword(codeword) {
    return codeword.replace(/[^FB[\]+-]/g, "").match(/([FB[\]+-])\1*/g);
}

function formatCoordinates(x, y) {
    // Unary plus is used to remove insignificant trailing zeros
    return `${+x.toFixed(4)} ${+y.toFixed(4)}`;
}

/**
 * Get the value of the d attribute
 * @param {String[]} tokens - Tokenized codeword
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
 * Get the values of the d attribute for each path element
 * @param {String[]} tokens - Tokenized codeword
 * @param {Object} turtle - Turtle object to work with
 * @return {String[]}
 */
function getMultiPathData(tokens, turtle) {
    let prevCommand; // used to avoid unnecessary repeating of the commands L and M
    let branchLevel = 0;
    let multiPathData = tokens.reduce((accumulator, token) => {
        let pathData = accumulator[branchLevel] || "";
        let tokenLength = token.length;
        switch (token[0]) {
            case "F":
                turtle.translate(tokenLength);
                pathData += (prevCommand === "L" ? " " : "L") + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "L";
                break;
            case "B":
                turtle.translate(tokenLength);
                if (prevCommand === "M") {
                    // As the spec states, “If a moveto is followed by multiple pairs of coordinates,
                    // the subsequent pairs are treated as implicit lineto commands”.
                    // This is not what we want, so delete the preceding moveto command
                    pathData = pathData.slice(0, pathData.lastIndexOf("M"));
                }
                pathData += "M" + formatCoordinates(turtle.x, turtle.y);
                prevCommand = "M";
                break;
            case "+":
                turtle.rotate(tokenLength);
                break;
            case "-":
                turtle.rotate(-tokenLength);
                break;
            case "[":
                branchLevel += tokenLength;
                turtle.pushStack(tokenLength);
                pathData = `${accumulator[branchLevel] || ""}M${formatCoordinates(turtle.x, turtle.y)}`;
                prevCommand = "M";
                break;
            case "]":
                branchLevel -= tokenLength;
                turtle.popStack(tokenLength);
                pathData = `${accumulator[branchLevel] || ""}M${formatCoordinates(turtle.x, turtle.y)}`;
                prevCommand = "M";
                break;
        }
        accumulator[branchLevel] = pathData;
        return accumulator;
    }, ["M" + formatCoordinates(turtle.x, turtle.y)]);
    // Some L-systems can produce branching levels which contain no real draw commands (only moves and rotations).
    // Such L-systems usually don’t have F commands in their axiom nor they have a production for F (example is
    // the Penrose tiling). Having <path> elements with only M commands is meaningless, so filtering them out
    return multiPathData.filter(pathData => pathData.includes("L"));
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
 * Get raw data required for rendering of a multi-path SVG
 * @param {LSParams} lsParams - L-system parameters
 * @return {{multiPathData: String[], minX: Number, minY: Number, width: Number, height: Number}}
 */
export function getMultiPathSVGData(lsParams) {
    let codeword = generate(lsParams);
    let turtle = createTurtle({x: 0, y: 0, ...lsParams});
    let multiPathData = getMultiPathData(tokenizeCodeword(codeword), turtle);
    return {
        multiPathData,
        ...turtle.getDrawingRect()
    };
}

function makeSVGConfig(svgParams, naturalWidth, naturalHeight) {
    return {
        width: svgParams.width || naturalWidth,
        height: svgParams.height || naturalHeight,
        padding: svgParams.padding || 0,
        pathAttributes: {
            // for backward compatibility with v1.1.0, also check fill and stroke as direct props of svgParams
            fill: svgParams.fill || "none",
            stroke: svgParams.stroke || "#000",
            ...svgParams.pathAttributes
        }
    };
}

function makeSVGCode({viewBox, width, height, content}) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(" ")}" height="${height}" width="${width}">${content}</svg>`;
}

function makeAttrString(attrs, index) {
    return Object.entries(attrs).reduce((accumulator, [name, value]) => {
        if (Array.isArray(value)) {
            value = value[Math.min(index, value.length - 1)];
        }
        if (value === undefined) {
            return accumulator;
        }
        value = value.replace(/"/g, "&quot;");
        return `${accumulator} ${name}="${value}"`;
    }, "");
}

/**
 * Get ready-to-render L-system’s SVG code
 * @param {LSParams} lsParams - L-system parameters
 * @param {SVGParams} svgParams - Output SVG parameters
 * @return {String}
 */
export function getSVGCode(lsParams, svgParams) {
    let {pathData, minX, minY, width: naturalWidth, height: naturalHeight} = getSVGData(lsParams);
    let {padding, width, height, pathAttributes} = makeSVGConfig(svgParams, naturalWidth, naturalHeight);
    let pathAttrStr = makeAttrString(pathAttributes, 0);
    return makeSVGCode({
        viewBox: [minX - padding, minY - padding, naturalWidth + 2 * padding, naturalHeight + 2 * padding],
        width,
        height,
        content: `<path d="${pathData}"${pathAttrStr}></path>`
    });
}

/**
 * Get ready-to-render multi-path SVG code for an L-system
 * @param {LSParams} lsParams - L-system parameters
 * @param {SVGParams} svgParams - Output SVG parameters
 * @return {String}
 */
export function getMultiPathSVGCode(lsParams, svgParams) {
    let {multiPathData, minX, minY, width: naturalWidth, height: naturalHeight} = getMultiPathSVGData(lsParams);
    let {padding, width, height, pathAttributes} = makeSVGConfig(svgParams, naturalWidth, naturalHeight);
    let content = multiPathData.reduce((accumulator, pathData, index) => {
        let pathAttrStr = makeAttrString(pathAttributes, index);
        return `${accumulator}<path d="${pathData}"${pathAttrStr}></path>`;
    }, "");
    return makeSVGCode({
        viewBox: [minX - padding, minY - padding, naturalWidth + 2 * padding, naturalHeight + 2 * padding],
        width,
        height,
        content
    });
}
