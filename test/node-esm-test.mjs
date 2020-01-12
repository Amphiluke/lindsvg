import {getSVGCode} from "../src/lindsvg.mjs";
import {lsParams, lsInvalidParams, svgParams} from "./params.mjs";
import {createRequire} from "module";

let require = createRequire(import.meta.url);

console.log(getSVGCode(lsParams, svgParams));

try {
    console.log("Below, an exception is expected");
    console.log(getSVGCode(lsInvalidParams, svgParams));
} catch (error) {
    // Log the original message
    console.error(error);
    if (error.name === "LSError") {
        // Get a JSON representation of the error list and format it as YAML
        let errorJSON = error.toJSON();
        let yaml = require("js-yaml");
        console.log(yaml.dump(errorJSON, {indent: 4}));
    }
}
