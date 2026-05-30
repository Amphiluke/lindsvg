# lindsvg

**lindsvg** (pronounced /ˈlɪnds ˈviː ˈdʒiː/), Lindenmayer System \[Scalable\] Vector Graphics

Simple dependency-free module used to generate SVG images of deterministic L-systems.

![Generated SVG tree](https://amphiluke.github.io/l-systems/img/autumn-tree.svg)

## Installation

### In Node.js environment

Installing the package:

```shell
npm install lindsvg
```

Once installed, it can be imported as an ES module:

```javascript
import * as lindsvg from "lindsvg";
```

### In a browser

You may get the module sources from such CDNs as unpkg or jsDelivr:

```html
<script type="module">
  import * as lindsvg from "https://unpkg.com/lindsvg@2/";
  // ...
</script>
```

## Supported commands

The following turtle commands are currently supported by lindsvg:

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `F`                 | Move forward one step with drawing a line             |
| `B`                 | Move forward one step without drawing a line          |
| `+`                 | Turn left by turning angle (theta)                    |
| `-`                 | Turn right by turning angle (theta)                   |
| `\|`                | Reverse direction (turn by 180 degrees)               |
| `!`                 | Reverse the meaning of `+` and `-`                    |
| `[`                 | Push current state of the turtle onto the stack       |
| `]`                 | Pop a state from the stack and apply it to the turtle |
| `A`,`C`–`E`,`G`–`Z` | Auxiliary user-defined rules                          |

## API &amp; examples

### `getSVGCode()`

This method generates ready-to-render L-system’s SVG code as an HTML string.

#### Syntax

```javascript
getSVGCode(lsParams)
getSVGCode(lsParams, svgParams)
```

#### Parameters

* `lsParams`

  An object which contains L-system parameters:

  - `axiom`

    A string containing the initial codeword (axiom).

  - `rules`

    An object representing L-system production rules. The keys are the alphabet letters `A`–`Z`, and corresponding values are the production successors (rewriting rules). Two symbols of the alphabet (`F` and `B`) have special meaning as explained in the [“Supported commands” section](#supported-commands).

  - `x` *(optional)*

    Turtle’s initial horizontal coordinate. Its default value is `0`.

  - `y` *(optional)*

    Turtle’s initial vertical coordinate. Its default value is `0`.

  - `alpha` *(optional)*

    Initial angle in radians. Its default value is `0`.

  - `theta`

    Angle increment in radians.

  - `step`

    The length of the turtle’s step, a finite positive number.

  - `iterations`

    Total number of iterations used to generate the resulting L-system.

* `svgParams` *(optional)*

  An object which contains parameters that can be used to modify the appearance of the resulting SVG image. All of these parameters are optional.

  - `width` *(optional)*

    Desired width of the SVG image. If not specified, defaults to the image’s intrinsic width.

  - `height` *(optional)*

    Desired height of the SVG image. If not specified, defaults to the image’s intrinsic height.

  - `padding` *(optional)*

    Additional space to extend the `viewBox`. If the image content is drawn too close to the edges, you can add padding by setting the desired numeric value to this property. Its default value is `0`.

  - `pathAttributes` *(optional)*

    Name to value map for the `<path>` element attributes. You can use it to change such things as stroke color, line width, etc. If not specified, defaults to `{fill: "none", stroke: "#000"}`. For branched L-systems, attribute values can be specified as arrays, so that different values will be applied at different branching levels.

#### Return value

A string containing the complete HTML code for the resulting SVG image.

#### Example

The following example demonstrates the use of the method `getSVGCode()` to generate the L-system [“Mango-tree foliage”](https://amphiluke.github.io/lindsvg/index.html?cid=Curves&lid=mango-tree+foliage).

```javascript
import {getSVGCode} from "lindsvg";

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
  step: 15,           // The length of the turtle’s step
  iterations: 7,      // Total number of iterations
};

// Output SVG parameters
let svgParams = {
  width: 600,       // Desired width of the SVG image
  height: 600,      // Desired height of the SVG image
  padding: 5,       // Additional space to extend the viewBox
  pathAttributes: { // Name to value map for the <path> element attributes
    stroke: "green",
    "stroke-width": "2",
  },
};

// Get L-system’s SVG code as a string and render the image
let svgCode = getSVGCode(lsParams, svgParams);
document.body.insertAdjacentHTML("beforeend", svgCode);
```

### `getComboSVGCode()`

This method can be used to generate SVG code that combines multiple independent L-systems in a single image.

#### Syntax

```javascript
getComboSVGCode(lsParamsMap)
getComboSVGCode(lsParamsMap, svgParams)
```

#### Parameters

* `lsParamsMap`

  An object that represents a mapping of user-defined identifiers to L-system parameters. Each field in this mapping corresponds to a single L-system to be included in the resulting SVG image. Keys are simple strings, and values are objects with the same structure as for the `lsParams` argument in [`getSVGCode()`](#parameters).

* `svgParams` *(optional)*

  An object which contains parameters that can be used to modify the appearance of the resulting SVG image. It is similar to `svgParams` in [`getSVGCode()`](#parameters) with one difference: `pathAttributes` here represents a mapping of user-defined identifiers (same as in `lsParamsMap`) to the `<path>` element attributes maps. This allows for independent styling of every L-system in the image.

#### Return value

A string containing the complete HTML code for the resulting combined SVG image.

#### Example

The following example demonstrates the use of the method `getComboSVGCode()` to generate the [“Twindragon” curve](https://amphiluke.github.io/lindsvg/index.html?cid=Dragons&lid=twindragon) containing two Heighway dragon curves placed back to back.

```javascript
import {getComboSVGCode} from "lindsvg";

let lsParams = {
  axiom: "FX",
  rules: {
    F: "F",
    X: "X+YF+",
    Y: "-FX-Y",
  },
  theta: Math.PI / 2,
  iterations: 14,
  step: 3.5,
};

let lsParamsMap = {
  yellowGreenDragon: {
    ...lsParams,
  },
  forestGreenDragon: {
    ...lsParams,
    y: -448, // adjust vertical position of the 2nd dragon
    alpha: Math.PI,
  },
};

let svgParams = {
  padding: 15,
  pathAttributes: {
    yellowGreenDragon: {
      stroke: "YellowGreen",
    },
    forestGreenDragon: {
      stroke: "ForestGreen",
    },
  },
};

let svgCode = getComboSVGCode(lsParamsMap, svgParams);
document.body.insertAdjacentHTML("beforeend", svgCode);
```

### `getSVGData()`

This method returns raw data that you can use to assemble the SVG code yourself. It may be handy in cases where the standard configuration is not enough, and you need to fine-tune SVG parameters and content.

#### Syntax

```javascript
getSVGData(lsParams)
getSVGData(lsParams, options)
```

#### Parameters

* `lsParams`

  An object which contains L-system parameters. Same as for [`getSVGCode()`](#parameters).

* `options` *(optional)*

  An object for tuning the method’s behavior. Currently, one option is available:

  - `isMultiPath` *(optional)*

    This option is only effective for _branched_ L-systems. Its default value is `false` which means that the method will always construct path data for a single combined `<path>` element representing the complete L-system. If the option is set to `true`, the method provides separate path data for multiple `<path>` elements, each representing a specific branching level.

#### Return value

An object which contains the following fields:

* `pathData`

  An array of [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) strings for each `<path>` element in the L-system SVG image. If the option `isMultiPath` is set to `false` or not specified, `pathData` contains only one element. L-systems without branching always produce `pathData` with a sole element.

* `minX`

  A number defining the left drawing boundary. Essential for assembling the `viewBox` attribute.

* `minY`

  A number defining the top drawing boundary. Essential for assembling the `viewBox` attribute.

* `width`

  A number defining the intrinsic width of the SVG image. Essential for assembling the `viewBox` attribute.

* `height`

  A number defining the intrinsic height of the SVG image. Essential for assembling the `viewBox` attribute.

#### Example

The method can be used to generate path data that is passed to the [`path()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/path) to achieve interesting visual effects. This example demonstrates the using `getSVGData()` for clipping an image to the Koch snowflake boundary.

```javascript
import {getSVGData} from "lindsvg";

let lsParams = {
  axiom: "F++F++F",
  rules: {
    F: "F-F++F-F",
  },
  y: 117,
  theta: Math.PI / 3,
  iterations: 4,
  step: 5,
};
let {pathData, width, height} = getSVGData(lsParams);
let img = new Image(width, height);
img.src = "./winter-night.jpg";
img.style.objectFit = "cover";
img.style.clipPath = `path("${pathData[0]}")`;
document.body.appendChild(img);
```

### Advanced styling of branched L-systems

As mentioned earlier, the property `pathAttributes` of the `svgParams` option may accept attribute values in form of arrays. This allows you to specify different attribute values for each `<path>` element, which may make branched L-systems (like plants) look “more naturally”.

For example, to generate the tree [demonstrated above](#lindsvg) (all but foliage) the following options were used:

```javascript
import {getSVGCode} from "lindsvg";

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

let svgParams = {
  width: 565,
  height: 445,
  padding: 10,
  pathAttributes: {
    stroke: "#514d3a",
    "stroke-width": ["16", "11", "9", "7", "6", "5", "3", "2", "1"],
    "stroke-linecap": ["square", "round" /* all remaining items use the last specified value */],
  },
};

let svgCode = getSVGCode(lsParams, svgParams);
document.body.insertAdjacentHTML("beforeend", svgCode);
```

If an attribute array contains fewer elements than the maximum branching depth (see `stroke-linecap` in the example above), the missing items are implicitly made equal to the last specified one. So you don’t need to repeat the same value in the end of the list.

You may also use the special value `"n/a"` which prevents an attribute from being added on the corresponding `<path>` element (e.g. when you need to add an attribute only to one or to a few `<path>`s: `{pathAttributes: {transform: ["skewY(-35)", "n/a"]}}`).

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
