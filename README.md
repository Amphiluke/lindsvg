# lindsvg

**lindsvg** (pronounced /ˈlɪnds ˈviː ˈdʒiː/), Lindenmayer System \[Scalable\] Vector Graphics

Simple dependency-free module used to generate SVG images of deterministic L-systems.

![Generated SVG tree](https://amphiluke.github.io/l-systems/img/autumn-tree.svg)

## Installation

### In an npm project

Installing the module is as simple as:

```
npm install lindsvg
```

Now you may get it in your scripts as usual: `require("lindsvg")`, or `import * as lindsvg from "lindsvg"`.

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
import {getSVGCode, getSVGData} from "lindsvg";

// L-system parameters
let lsParams = {
  axiom: "A---A",    // The initial codeword (axiom)
  rules: {           // L-system production rules
    F: "F",          // Move forward a step with drawing a line
    B: "B",          // Move forward a step without drawing a line
    A: "B-F+Z+F-BA", // Auxiliary rules...
    Z: "F-FF-F--[--Z]F-FF-F--F-FF-F--",
  },
  alpha: 0,           // Initial angle in radians
  theta: Math.PI / 3, // Angle increment in radians
  step: 15,           // The length of a “turtle” step
  iterations: 7,      // Total number of iterations
};

// Output SVG parameters (all of them are optional)
let svgParams = {
  width: 600,       // Desired SVG element width
  height: 600,      // Desired SVG element height
  padding: 5,       // Additional space to extend the viewBox
  pathAttributes: { // Name to value map for the <path> element attributes
    stroke: "green",
    "stroke-width": "2",
  },
};

// Get ready-to-render L-system’s SVG code as a string...
let svgCode = getSVGCode(lsParams, svgParams);

// ...or get raw data required for manual SVG assemblage
let {pathData, minX, minY, width, height} = getSVGData(lsParams);
```

An object returned by `getSVGData` contains [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) needed to draw the L-system, as well as the drawing boundaries that are essential for the `viewBox` attribute.

### Using “multi-path” methods

Using “multi-path” methods (`getMultiPathSVGCode` and `getMultiPathSVGData`) allows you to specify different path attributes for every `<path>` element separately, which may make branched L-systems (like plants) look “more naturally”.

For example, to generate the tree [demonstrated above](#lindsvg) (all but foliage) the following options were used:

```javascript
import {getMultiPathSVGCode, getMultiPathSVGData} from "lindsvg";

// L-system parameters
let lsParams = {
  axiom: "F-FFF-F+F+X",
  rules: {
    F: "F",
    X: "FFF-[-F+F[Y]-[X]]+[+F+F[X]-[X]]",
    Y: "FF-[-F+F]+[+F+FY]",
  },
  alpha: 90 * Math.PI / 180,
  theta: 14 * Math.PI / 180,
  iterations: 6,
  step: 12,
};

// Output SVG parameters
let svgParams = {
  width: 565,
  height: 445,
  padding: 10,
  pathAttributes: {
    stroke: "#514d3a",
    "stroke-width": ["16", "11", "9", "7", "6", "5", "3", "2", "1"],
    "stroke-linecap": ["square", "round" /* the rest items are equal to the last one */],
  },
};

// Get ready-to-render L-system’s SVG code as a string...
let svgCode = getMultiPathSVGCode(lsParams, svgParams);

// ...or get raw data required for manual SVG assemblage
let {multiPathData, minX, minY, width, height} = getMultiPathSVGData(lsParams);
```

If an attribute array contains fewer elements than the maximum branching depth (e.g. see `stroke-linecap` in the example above), the missing items are implicitly made equal to the last one. So you don’t need to repeat the same value in the end of the list.

You may also use the special value `"n/a"` which prevents an attribute from being added on the corresponding `<path>` element (e.g. when you need to add an attribute only to one or to a few `<path>`s: `{pathAttributes: {transform: ["skewY(-35)", "n/a"]}}`).

The property `multiPathData` in the object returned by `getMultiPathSVGData` is a _list_ of path data for every `<path>` element. The list is sorted in the order of increasing branch level (the deeper the branch the higher the index in the array).

### Error handling

In case of invalid input L-system parameters, the methods throw a custom exception. You may use it to get a detailed explanation of which parameter(s) failed to pass validation, and format the message as you wish.

```javascript
import {getSVGCode} from "lindsvg";
import {dump} from "js-yaml";

try {
  console.log(getSVGCode(lsParams, svgParams));
} catch (error) {
  // Log the original message
  console.error(error);
  if (error.name === "LSError") {
    // Get a JSON representation of the error list and format it as YAML
    let errorJSON = error.toJSON();
    console.log(dump(errorJSON, {indent: 4}));
  }
}
```

## Demos

Please, visit the project’s [demo web app](https://amphiluke.github.io/lindsvg/) (installable as a PWA and works offline too). You will find a few built-in L-system collections there, and will also be able to experiment with lindsvg while building your own L-systems.

Also, check out [this collection](https://codepen.io/collection/DVzqWb) on CodePen to get a few advanced examples of using lindsvg.
