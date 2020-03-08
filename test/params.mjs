export let singlePathLSParams = {
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

export let multiPathLSParams = {
    axiom: "F",
    rules: {
        F: "FF+[+F-F-F]-[-F+F+F]"
    },
    alpha: 90 * Math.PI / 180,
    theta: 22.5 * Math.PI / 180,
    iterations: 5,
    step: 8
};

export let lsInvalidParams = {
    axiom: "X F",
    rules: {
        F: "FF1",
        X: "F[+X]F[-X]+X?"
    },
    alpha: (90 * Math.PI / 180).toString(),
    theta: Infinity,
    iterations: 7.1,
    step: -2
};

export let singlePathSVGParams = {
    width: 600,
    height: 600,
    padding: 10,
    pathAttributes: {
        // fill: "skyblue",
        stroke: "#69983a"
    }
};

export let multiPathSVGParams = {
    width: 600,
    height: 600,
    padding: 10,
    pathAttributes: {
        stroke: ["#41441a", "#55621c", "#557938", "#69983a", "#838834", "#d3bc5f"],
        "stroke-width": ["6", "3", "2", "1"]
    }
};
