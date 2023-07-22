/*!
lindsvg v1.3.2
https://amphiluke.github.io/lindsvg/
(c) 2023 Amphiluke
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lindsvg = {}));
})(this, (function (exports) { 'use strict';

    let messages = {
        AXIOM: "Axiom may only contain the following characters: A..Z,+,-,[,]",
        RULE: "Production rules may only contain the following characters: A..Z,+,-,[,]",
        LETTER: "Allowed alphabet letters are: A..Z",
        ALPHA: "The “alpha” parameter must be a finite number",
        THETA: "The “theta” parameter must be a finite number",
        STEP: "The “step” parameter must be a positive finite number",
        COUNT: "The number of iterations must be integer and finite",
        NUMBER: "A valid finite number expected"
    };

    let letterRE = /^[A-Z]$/;
    function checkLetter(letter, msg = messages.LETTER) {
        return letterRE.test(letter) || msg;
    }

    let ruleRE = /^[A-Z+\-[\]]*$/;
    function checkRule(rule, msg = messages.RULE) {
        return ruleRE.test(rule) || msg;
    }

    function checkRules(rules, letterMsg, ruleMsg) {
        let errors = Object.create(null);
        Object.entries(rules).forEach(([letter, rule]) => {
            let result = checkLetter(letter, letterMsg);
            if (result === true) {
                result = checkRule(rule, ruleMsg);
            }
            if (result !== true) {
                errors[letter] = result;
            }
        });
        return Object.keys(errors).length ? errors : true;
    }

    function checkStep(step, msg = messages.STEP) {
        return (Number.isFinite(step) && step > 0) || msg;
    }

    function checkIterations(iterations, msg = messages.COUNT) {
        return (Number.isInteger(iterations) && iterations > 0) || msg;
    }

    function checkAngle(angle, msg = messages.NUMBER) {
        return Number.isFinite(angle) || msg;
    }

    function validate(lsParams) {
        let errors = Object.create(null);
        Object.entries(lsParams).forEach(([param, value]) => {
            let result = true;
            switch (param) {
                case "axiom":
                    result = checkRule(value, messages.AXIOM);
                    break;
                case "rules":
                    result = checkRules(value);
                    break;
                case "alpha":
                case "theta":
                    result = checkAngle(value, messages[param.toUpperCase()]);
                    break;
                case "step":
                    result = checkStep(value);
                    break;
                case "iterations":
                    result = checkIterations(value);
                    break;
            }
            if (result !== true) {
                errors[param] = result;
            }
        });
        return Object.keys(errors).length ? errors : true;
    }

    class LSError extends Error {
        /**
         * LSError constructor
         * @param {Object} errors - Error map “parameter->message(s)”
         * @constructor
         */
        constructor(errors) {
            let message = JSON.stringify(errors, null, 2);
            super(message);
            // Using JSON.parse for deep cloning
            Object.defineProperty(this, "lsErrors", {value: JSON.parse(message)});
        }

        /**
         * Get raw object representation of the errors
         * @return {Object}
         */
        toJSON() {
            return JSON.parse(JSON.stringify(this.lsErrors));
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString
    Object.defineProperty(LSError.prototype, "name", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: "LSError"
    });

    /** @type {Rules} */
    let ctrlRules = {
        F: "",
        B: "",
        "+": "+",
        "-": "-",
        "[": "[",
        "]": "]"
    };

    /** @type {LSParams} */
    let defaults = {
        alpha: 0,
        theta: 0,
        step: 10,
        iterations: 3
    };

    /**
     * Remove all the stuff which doesn’t affect the drawing process from the raw generated codeword
     * @param {String} codeword - Raw L-system code
     * @return {String} - Clean L-system code
     */
    function cleanCodeword(codeword) {
        // Remove auxiliary drawing-indifferent letters
        let cleanCodeword = codeword.replace(/[^FB[\]+-]/g, "");
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
     * @return {String} - Clean L-system code
     */
    function generateCodeword(lsParams) {
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
     * @param {String} codeword - L-system code
     * @return {String[]}
     */
    function tokenizeCodeword(codeword) {
        return codeword.match(/([FB[\]+-])\1*/g); // tokenize
    }

    let proto = {
        translate(stepCount = 1) {
            this.x += stepCount * this.step * Math.cos(this.alpha);
            this.y += stepCount * this.step * Math.sin(this.alpha);
            this.minX = Math.min(this.minX, this.x);
            this.maxX = Math.max(this.maxX, this.x);
            this.minY = Math.min(this.minY, this.y);
            this.maxY = Math.max(this.maxY, this.y);
        },
        rotate(factor) {
            this.alpha += factor * this.theta;
        },
        pushStack(repeatCount = 1) {
            for (; repeatCount > 0; repeatCount--) {
                this.stack.push({x: this.x, y: this.y, alpha: this.alpha});
            }
        },
        popStack(repeatCount) {
            for (; repeatCount > 0; repeatCount--) {
                ({x: this.x, y: this.y, alpha: this.alpha} = this.stack.pop());
            }
        },
        getDrawingRect() {
            let minX = Math.floor(this.minX);
            let minY = Math.floor(this.minY);
            let maxX = Math.ceil(this.maxX);
            let maxY = Math.ceil(this.maxY);
            return {minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY};
        }
    };

    function createTurtle({x, y, step, alpha, theta}) {
        let turtle = Object.create(proto);
        turtle.stack = [];
        turtle.x = turtle.minX = turtle.maxX = x;
        turtle.y = turtle.minY = turtle.maxY = y;
        turtle.step = step;
        turtle.alpha = -alpha; // negate since Y axis is inverted
        turtle.theta = theta;
        return turtle;
    }

    function formatCoordinates(x, y) {
        // Unary plus is used to remove insignificant trailing zeros
        return `${+x.toFixed(4)} ${+y.toFixed(4)}`;
    }

    /**
     * Delete useless M commands which are followed by other M commands, and those in the end of path data
     * @param {String} pathData - SVG path data
     * @return {String}
     */
    function dropUselessMoves(pathData) {
        return pathData.replace(/(?:M-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?)+(?=M|$)/g, "");
    }

    /**
     * Get the value of the d attribute
     * @param {String[]} tokens - Tokenized codeword
     * @param {Object} turtle - Turtle object to work with
     * @return {String}
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
        return multiPathData
            .filter(pathData => pathData.includes("L"))
            // also delete useless M commands (including those in the end of path data)
            .map(dropUselessMoves);
    }

    /**
     * Get raw data required for SVG rendering
     * @param {LSParams} lsParams - L-system parameters
     * @return {{pathData: String, minX: Number, minY: Number, width: Number, height: Number}}
     */
    function getSVGData(lsParams) {
        let codeword = generateCodeword(lsParams);
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
    function getMultiPathSVGData(lsParams) {
        let codeword = generateCodeword(lsParams);
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
    function getSVGCode(lsParams, svgParams) {
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
    function getMultiPathSVGCode(lsParams, svgParams) {
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

    exports.getMultiPathSVGCode = getMultiPathSVGCode;
    exports.getMultiPathSVGData = getMultiPathSVGData;
    exports.getSVGCode = getSVGCode;
    exports.getSVGData = getSVGData;

}));
