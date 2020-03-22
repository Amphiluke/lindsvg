# lindsvg

**lindsvg** (pronounced /ˈlɪnds ˈviː ˈdʒiː/), Lindenmayer System \[Scalable\] Vector Graphics

Simple dependency-free module used to generate SVG images of deterministic L-systems.

![Generated SVG tree](https://amphiluke.github.io/l-systems/img/tree.svg)

## Installation

### In an npm project

Installing the module is as simple as:

```
npm install lindsvg
```

Now you may get it in your scripts as usual: `require("lindsvg")`, or `import * as lindsvg from "lindsvg"` if you use such bundlers as webpack or rollup.

### In a browser

lindsvg is available in UMD format which allows you using it either with AMD/CJS compatible module loaders or in global namespace (`window.lindsvg`). You may get the module sources from such CDNs as jsDelivr or unpkg:

```html
<script src="https://cdn.jsdelivr.net/npm/lindsvg/dist/lindsvg.min.js"></script>
```

If you rather prefer using ES modules in a browser, just choose the “esm” bundle:

```html
<script type="module">
    import * as lindsvg from "https://cdn.jsdelivr.net/npm/lindsvg/dist/lindsvg.esm.min.js";
    // ...
</script>
```

## API &amp; examples

The module exports two pairs of methods.

1. The methods returning ready-to-render L-system’s SVG code as a string:
    * `getSVGCode(lsParams[, svgParams])`;
    * `getMultiPathSVGCode(lsParams[, svgParams])`;
2. The methods returning raw data that you may use to construct the SVG code yourself:
    * `getSVGData(lsParams)`;
    * `getMultiPathSVGData(lsParams)`.

The “multi-path” methods (`getMultiPathSVGCode` and `getMultiPathSVGData`) differ from the “normal” methods (`getSVGCode` and `getSVGData`) in that they provide the ability for advanced stylisation of _branched_ L-systems. SVG images created using these “multi-path” methods contain several `<path>` elements, each one for a specific branching level, so they can be stylised differently (color, line width, etc.)

All methods expect L-system parameters object as their first argument. These parameters are explained through the comments in the snippet below. Additionally, the methods `getSVGCode` and `getMultiPathSVGCode` may be passed an _optional_ parameter to alter the output SVG settings (refer the comments in the snippet below).

### Using “single-path” methods

```javascript
let {getSVGCode, getSVGData} = require("lindsvg");

// L-system parameters
let lsParams = {
    axiom: "A---A",      // The initial codeword (axiom)
    rules: {             // L-system production rules
        F: "F",          // Move forward a step with drawing a line
        B: "B",          // Move forward a step without drawing a line
        A: "B-F+Z+F-BA", // Auxiliary rules...
        Z: "F-FF-F--[--Z]F-FF-F--F-FF-F--"
    },
    alpha: 0,            // Initial angle in radians
    theta: Math.PI / 3,  // Angle increment in radians
    step: 15,            // The length of a “turtle” step
    iterations: 7        // Total number of iterations
};

// Output SVG parameters (all of them are optional)
let svgParams = {
    width: 600,       // Desired SVG element width
    height: 600,      // Desired SVG element height
    padding: 5,       // Additional space to extend the viewBox
    pathAttributes: { // Name to value map for the <path> element attributes
        stroke: "green",
        "stroke-width": "2"
    }
};

// Get ready-to-render L-system’s SVG code as a string...
let svgCode = getSVGCode(lsParams, svgParams);

// ...or get raw data required for manual SVG assemblage
let {pathData, minX, minY, width, height} = getSVGData(lsParams);
```

An object returned by `getSVGData` contains [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) needed to draw the L-system, and also the drawing boundaries that are essential for the `viewBox` attribute.

### Using “multi-path” methods

Using “multi-path” methods (`getMultiPathSVGCode` and `getMultiPathSVGData`) allows you to specify different path attributes for every `<path>` element separately, which may make branched L-systems (like plants) look “more naturally”.

For example, the image of a tree [demonstrated above](#lindsvg) was generated using the following options:

```javascript
let {getMultiPathSVGCode, getMultiPathSVGData} = require("lindsvg");

// L-system parameters
let lsParams = {
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

// Output SVG parameters
let svgParams = {
    width: 420,
    height: 325,
    padding: 10,
    pathAttributes: {
        stroke: ["#514d3a", "#514d3a", "#514d2a", "#55771c", "#55771c", "#44621c",
            "rgba(131, 163, 90, 0.5)", "rgba(164, 184, 102, 0.5)", "rgba(192, 200, 97, 0.5)"],
        "stroke-width": ["11", "5", "3", "1"], // the rest items are equal to the last one
        "stroke-linecap": ["square", "square", "round"],
        transform: ["skewY(-35)", ""]
    }
};

// Get ready-to-render L-system’s SVG code as a string...
let svgCode = getMultiPathSVGCode(lsParams, svgParams);

// ...or get raw data required for manual SVG assemblage
let {multiPathData, minX, minY, width, height} = getMultiPathSVGData(lsParams);
```

If an attribute array contains less elements than the maximum branching depth (e.g. see `stroke-width` in the example above), the missing items are considered equal to the last one. So you don’t need to repeat the same value in the end of the list.

The property `multiPathData` in the object returned by `getMultiPathSVGData` is a _list_ of path data for every `<path>` element. The list is sorted in the order of increasing branch level (the deeper the branch the higher the index in the array).

### Error handling

In case of invalid input L-system parameters, the methods throw a custom exception. You may use it to get a detailed explanation of which parameter(s) failed to pass validation, and format the message as you wish.

```javascript
let {getSVGCode} = require("lindsvg");
let yaml = require("js-yaml");

try {
    console.log(getSVGCode(lsParams, svgParams));
} catch (error) {
    // Log the original message
    console.error(error);
    if (error.name === "LSError") {
        // Get a JSON representation of the error list and format it as YAML
        let errorJSON = error.toJSON();
        console.log(yaml.dump(errorJSON, {indent: 4}));
    }
}
```

## Compatibility note

lindsvg utilizes the ECMAScript 2018 syntax. If you want to use the module in environments that do not support ES 2018, please transpile the sources with babel or whatever for your needs.

## Demos

Please, check out [this collection](https://codepen.io/collection/DVzqWb) on CodePen to get a few live examples of using lindsvg.
