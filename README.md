# lindsvg

**lindsvg** (pronounced /ˈlɪnds ˈviː ˈdʒiː/), Lindenmayer System \[Scalable\] Vector Graphics

Simple dependency-free module used to generate SVG images of deterministic L-systems.

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

The module exports two methods:

* `getSVGCode(lsParams[, svgParams])`: returns ready-to-render L-system’s SVG code as a string;
* `getSVGData(lsParams)`: returns raw data that you may use to construct the SVG code yourself.

Both methods expect L-system parameters object as their first argument. These parameters are explained through the comments in the snippet below. Additionally, the method `getSVGCode` may be passed an _optional_ parameter to alter the output SVG settings (refer the comments in the snippet below).

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
    width: 600,     // Desired SVG element width
    height: 600,    // Desired SVG element height
    padding: 5,     // Additional space to extend the viewBox
    fill: "none",   // Value of the “fill” attribute on the “path” element
    stroke: "green" // Value of the “stroke” attribute on the “path” element
};

// Get ready-to-render L-system’s SVG code as a string
let svgCode = getSVGCode(lsParams, svgParams);

// Get raw data required for SVG rendering
let {pathData, minX, minY, width, height} = getSVGData(lsParams);
```

An object returned by `getSVGData` contains [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) needed to draw the L-system, and also the drawing boundaries that are essential for the `viewBox` attribute.

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

### Compatibility note

lindsvg utilizes the ECMAScript 2018 syntax. If you want to use the module in environments that do not support ES 2018, please transpile the sources with babel or whatever for your needs.
