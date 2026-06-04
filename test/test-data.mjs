export let singlePathData = {
  lsParamsMap: [
    {
      axiom: "X",
      rules: {
        F: "FF",
        X: "F[+X]F[-X]+X"
      },
      alpha: 90 * Math.PI / 180,
      theta: 20 * Math.PI / 180,
      iterations: 7,
      step: 2,
    },
  ],
  svgParams: {
    width: 360,
    height: 535,
    padding: 10,
    pathAttributesMap: [
      {
        stroke: "#69983a",
      },
    ],
  },
  checksum: "747008aea80649853b59a297694e7f3cba104d960c8e83ef03f6aea1e0641436",
};

export let multiPathData = {
  lsParamsMap: {
    tree: {
      axiom: "FFF+FFFF-FF+FF-[-Y][+Y][!Z!][+Z]",
      rules: {
        F: "F",
        Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
        Z: "FF-F+F+F[FY][-Y]+F+F++Y"
      },
      alpha: 90 * Math.PI / 180,
      theta: 10 * Math.PI / 180,
      iterations: 7,
      step: 5,
    },
  },
  svgParams: {
    width: 420,
    height: 325,
    padding: 10,
    pathAttributesMap: {
      tree: {
        stroke: ["#514d3a", "#514d3a", "#514d2a", "#55771c", "#55771c", "#44621c",
          "rgba(131, 163, 90, 0.5)", "rgba(164, 184, 102, 0.5)", "rgba(192, 200, 97, 0.5)"],
        "stroke-width": ["11", "5", "3", "1"],
        "stroke-linecap": ["square", "square", "round"],
        transform: ["skewY(-35)", "n/a"],
      },
    },
  },
  checksum: "91e44f29e91b1b6e2d31323489a95b4e2e681586cdcb305665cbf5cde6f3e750",
};

export let comboData = {
  lsParamsMap: {
    yellowGreen: {
      axiom: "FX",
      rules: {
        F: "F",
        X: "X+YF+",
        Y: "-FX-Y",
      },
      theta: Math.PI / 2,
      iterations: 14,
      step: 3.5,
    },
    forestGreen: {
      axiom: "FX",
      rules: {
        F: "F",
        X: "X+YF+",
        Y: "-FX-Y",
      },
      y: -448,
      alpha: Math.PI,
      theta: Math.PI / 2,
      iterations: 14,
      step: 3.5,
    },
  },
  svgParams: {
    padding: 15,
    pathAttributesMap: {
      yellowGreen: {
        stroke: "YellowGreen",
      },
      forestGreen: {
        stroke: "ForestGreen",
      },
    },
  },
  checksum: "aec90fe9d863cf90b0bb23631adf4bb083dac1b5f7416f2c2d9115ec2340fa83",
};

export let invalidData = {
  lsParamsMap: [
    {
      axiom: "X F",
      rules: {
        F: "FF1",
        X: "F[+X]F[-X]+X?"
      },
      x: {valueOf: () => 17},
      y: Number.NaN,
      alpha: (90 * Math.PI / 180).toString(),
      theta: Number.POSITIVE_INFINITY,
      iterations: 7.1,
      step: -2,
    },
  ],
};
