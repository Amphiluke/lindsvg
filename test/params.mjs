export let lsParams = {
    // axiom: "F++F++F",
    // rules: {
    //     F: "F-F++F-F"
    // },
    // alpha: 0,
    // theta: 60 * Math.PI / 180,
    // iterations: 5,
    // step: 5

    // axiom: "F",
    // rules: {
    //     F: "F[+FF][-FF]F[-F][+F]F"
    // },
    // alpha: 90 * Math.PI / 180,
    // theta: 35 * Math.PI / 180,
    // iterations: 4,
    // step: 6

    axiom: "X",
    rules: {
        F: "FF",
        X: "F[+X]F[-X]+X"
    },
    alpha: 90 * Math.PI / 180,
    theta: 20 * Math.PI / 180,
    iterations: 7,
    step: 2
};

export let svgParams = {
    width: 600,
    height: 600,
    // fill: "skyblue",
    stroke: "green"
};
