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

export let customTplData = {
  lsParamsMap: {
    "L-system “Square”": {
      axiom: "F+F+F+F",
      rules: {
        F: "FF+F+F+F+FF",
      },
      theta: Math.PI / 2,
      step: 5,
      iterations: 4,
    },
  },
  svgParams: {
    width: 407,
    height: 407,
    padding: 2,
    pathAttributesMap: {
      "L-system “Square”": {
        stroke: "url(#diagonal-gradient)",
      },
    },
    templateFn: ({viewBox, width, height, content}) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(" ")}" height="${height}" width="${width}">
        <defs>
          <linearGradient id="diagonal-gradient" gradientTransform="rotate(45 0.5 0.5)">
            <stop offset="0%" stop-color="red" />
            <stop offset="50%" stop-color="gold" />
            <stop offset="100%" stop-color="red" />
          </linearGradient>
        </defs>
        ${content}
      </svg>`,
  },
  checksum: "91fa1266aa78c90f6392beb147c46c6baadef746abee2946999bf5c329a7a1dd",
};

export let tplReuseData = {
  lsParamsMap: {
    Terdragon: {
      axiom: "F",
      rules: {
        F: "F+F-F",
      },
      alpha: Math.PI / 2,
      theta: Math.PI * 2 / 3,
      step: 5,
      iterations: 8,
    },
  },
  svgParams: {
    padding: 2,
    pathAttributesMap: {
      Terdragon: {
        id: "terdragon",
        stroke: "n/a", // allows defining stroke on <use>
      },
    },
    templateFn: ({viewBox, width, height, content}) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox[0]} ${viewBox[1] - 170} ${viewBox[2]} ${viewBox[3] + 340}" height="${height + 170 * 3}" width="${width}">
        <defs>${content}</defs>
        <use href="#terdragon" stroke="maroon" transform="rotate(60)" x="350.65" y="202.5" />
        <use href="#terdragon" stroke="red" />
        <use href="#terdragon" stroke="gold" transform="rotate(60)" />
      </svg>`,
  },
  checksum: "2ec7ff074677cfd08105d16ac0b6e7f158ba9ad9d484d724e03b93087b7c742f",
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
