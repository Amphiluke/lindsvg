/*!
lindsvg v1.0.0
https://github.com/Amphiluke/lindsvg#readme
(c) 2020 Amphiluke
*/
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
    let errors = new Map();
    Object.entries(rules).forEach(([letter, rule]) => {
        let result = checkLetter(letter, letterMsg);
        if (result === true) {
            result = checkRule(rule, ruleMsg);
        }
        if (result !== true) {
            errors.set(letter, result);
        }
    });
    return errors.size ? errors : true;
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
    let errors = new Map();
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
            errors.set(param, result);
        }
    });
    return errors.size ? errors : true;
}

function formatErrors(errors) {
    return [...errors].reduce((accumulator, [param, error]) => {
        if (error instanceof Map) {
            return `${accumulator}\n${param}:${formatErrors(error).replace(/\n/g, "\n  ")}`;
        }
        return `${accumulator}\n${param}: ${error}`;
    }, "");
}

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
 * Generate L-system code
 * @param {LSParams} lsParams - L-system parameters
 * @return {String}
 */
function generate(lsParams) {
    let validity = validate(lsParams);
    if (validity !== true) {
        throw new Error(formatErrors(validity));
    }
    let {axiom: code, iterations} = {...defaults, ...lsParams};
    let rules = {...ctrlRules, ...lsParams.rules};
    for (; iterations > 0; iterations--) {
        code = [...code].reduce((accumulator, letter) => accumulator + (rules[letter] || ""), "");
    }
    return code;
}

let proto = {
    translate() {
        this.x += this.step * Math.cos(this.alpha);
        this.y += this.step * Math.sin(this.alpha);
        this.minX = Math.min(this.minX, this.x);
        this.maxX = Math.max(this.maxX, this.x);
        this.minY = Math.min(this.minY, this.y);
        this.maxY = Math.max(this.maxY, this.y);
    },
    rotate(factor) {
        this.alpha += factor * this.theta;
    },
    pushStack() {
        this.stack.push({x: this.x, y: this.y, alpha: this.alpha});
    },
    popStack() {
        ({x: this.x, y: this.y, alpha: this.alpha} = this.stack.pop());
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
function getSVGData(lsParams) {
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
function getSVGCode(lsParams, svgParams) {
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

export { getSVGCode, getSVGData };
