let {getSVGCode} = require("../dist/lindsvg.js");

let lsParams = {
    axiom: "F",
    rules: {
        F: "F[+FF][-FF]F[-F][+F]F"
    },
    alpha: 90 * Math.PI / 180,
    theta: 35 * Math.PI / 180,
    iterations: 4,
    step: 6
};

let svgParams = {
    width: 600,
    height: 600,
    fill: "skyblue",
    stroke: "green"
};

console.log(getSVGCode(lsParams, svgParams));
