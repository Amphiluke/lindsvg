import {generateCodeword, tokenizeCodeword} from "./generator.mjs";
import {Turtle} from "./turtle.mjs";

/** @import {LSParams, LSParamsMap, LSVGTemplateFn, LSVGParams} from "./lindsvg.mjs" */

function formatCoordinates(x, y) {
  // Unary plus is used to remove insignificant trailing zeros
  return `${+x.toFixed(4)} ${+y.toFixed(4)}`;
}

/**
 * Delete useless M commands which are followed by other M commands, and those in the end of path data
 * @param {string} pathData - SVG path data
 * @returns {string}
 */
function dropUselessMoves(pathData) {
  return pathData.replace(/(?:M-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?)+(?=M|$)/g, "");
}

/**
 * Get the value of the d attribute
 * @param {string[]} tokens - Tokenized codeword
 * @param {Turtle} turtle - Turtle object to work with
 * @returns {string}
 */
function getPathData(tokens, turtle) {
  let prevCommand; // used to avoid unnecessary repeating of the commands L and M
  let pathData = tokens.reduce((accumulator, token) => {
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
      case "|":
        turtle.reverse(tokenLength);
        break;
      case "!":
        turtle.swapSigns(tokenLength);
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
  return dropUselessMoves(pathData);
}

/**
 * Get the values of the d attribute for each path element
 * @param {string[]} tokens - Tokenized codeword
 * @param {Turtle} turtle - Turtle object to work with
 * @returns {string[]}
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
      case "|":
        turtle.reverse(tokenLength);
        break;
      case "!":
        turtle.swapSigns(tokenLength);
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
  return multiPathData
    .filter(pathData => pathData.includes("L"))
    // also delete useless M commands (including those in the end of path data)
    .map(dropUselessMoves);
}

/**
 * Get raw data required for SVG rendering
 * @param {LSParams} lsParams - L-system parameters
 * @param {object} [options]
 * @param {boolean} [options.isMultiPath=false] - Use separate paths for each branching level or a single joint path (default)
 * @returns {{pathData: string[], minX: number, minY: number, width: number, height: number}}
 */
export function getSVGData(lsParams, {isMultiPath = false} = {}) {
  let codeword = generateCodeword(lsParams);
  let turtle = new Turtle({
    x: lsParams.x ?? 0,
    y: lsParams.y ?? 0,
    alpha: lsParams.alpha ?? 0,
    theta: lsParams.theta,
    step: lsParams.step,
  });
  let tokens = tokenizeCodeword(codeword);
  return {
    pathData: isMultiPath ? getMultiPathData(tokens, turtle) : [getPathData(tokens, turtle)],
    ...turtle.getDrawingRect(),
  };
}

const DEFAULT_PATH_ATTRIBUTES = Object.freeze({fill: "none", stroke: "#000"});

/** @type {LSVGTemplateFn} */
function makeSVGCode({viewBox, width, height, content}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(" ")}" height="${height}" width="${width}">${content}</svg>`;
}

function makeAttrString(attrs, index) {
  return Object.entries(attrs).reduce((accumulator, [name, value]) => {
    if (Array.isArray(value)) {
      value = value[Math.min(index, value.length - 1)];
    }
    if (value === undefined || value.toLowerCase() === "n/a") {
      return accumulator;
    }
    value = value.replace(/"/g, "&quot;");
    return `${accumulator} ${name}="${value}"`;
  }, "");
}

/**
 * Get ready-to-render SVG code for one or few L-systems combined in a single image
 * @param {LSParamsMap} lsParamsMap - L-system key to parameters mapping
 * @param {LSVGParams} [svgParams] - Output SVG parameters
 * @returns {string}
 */
export function getSVGCode(lsParamsMap, svgParams) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = -Number.MAX_SAFE_INTEGER;
  let maxY = -Number.MAX_SAFE_INTEGER;
  let content = "";
  Object.entries(lsParamsMap).forEach(([key, lsParams]) => {
    let pathAttributes = {...DEFAULT_PATH_ATTRIBUTES, ...svgParams?.pathAttributesMap?.[key]};
    let isMultiPath = Object.values(pathAttributes).some((value) => Array.isArray(value));
    let data = getSVGData(lsParams, {isMultiPath});
    minX = Math.min(minX, data.minX);
    minY = Math.min(minY, data.minY);
    maxX = Math.max(maxX, data.minX + data.width);
    maxY = Math.max(maxY, data.minY + data.height);
    content += data.pathData.reduce((accumulator, pathData, index) => {
      let pathAttrStr = makeAttrString(pathAttributes, index);
      return `${accumulator}<path d="${pathData}"${pathAttrStr}></path>`;
    }, "");
  });
  let padding = svgParams?.padding || 0;
  let naturalWidth = maxX - minX;
  let naturalHeight = maxY - minY;
  return (svgParams.templateFn ?? makeSVGCode)({
    viewBox: [minX - padding, minY - padding, naturalWidth + 2 * padding, naturalHeight + 2 * padding],
    width: svgParams?.width || naturalWidth,
    height: svgParams?.height || naturalHeight,
    content,
  });
}
