let {getSVGCode} = require("../dist/lindsvg.js");
let yaml = require("js-yaml");

import("./params.mjs").then(({lsParams, lsInvalidParams, svgParams}) => {
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
            console.log(yaml.dump(errorJSON, {indent: 4}));
        }
    }
});
