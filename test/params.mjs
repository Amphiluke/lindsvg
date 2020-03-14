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
    axiom: "FFF+FFFF-FF+FF-[-Y][+Y][Z][+Z]",
    rules: {
        F: "F",
        Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
        Z: "FF-F+F+F[FY][-Y]+F+F++Y"
    },
    alpha: 90 * Math.PI / 180,
    theta: 10 * Math.PI / 180,
    iterations: 7,
    step: 5
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
    width: 360,
    height: 535,
    padding: 10,
    pathAttributes: {
        // fill: "skyblue",
        stroke: "#69983a"
    }
};

export let multiPathSVGParams = {
    width: 420,
    height: 325,
    padding: 10,
    pathAttributes: {
        stroke: ["#514d3a", "#514d3a", "#514d2a", "#55771c", "#55771c", "#44621c",
            "rgba(131, 163, 90, 0.5)", "rgba(164, 184, 102, 0.5)", "rgba(192, 200, 97, 0.5)"],
        "stroke-width": ["11", "5", "3", "1"],
        "stroke-linecap": ["square", "square", "round"],
        transform: ["skewY(-35)", ""]
    }
};
