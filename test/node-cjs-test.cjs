let {getSVGCode, getMultiPathSVGCode} = require("../dist/lindsvg.cjs");
let {writeFile, unlink} = require("node:fs/promises");
let {join} = require("node:path");
let {dump} = require("js-yaml");

async function runTest() {
    let {singlePathLSParams, multiPathLSParams, lsInvalidParams, singlePathSVGParams, multiPathSVGParams} = await import("./params.mjs");

    let singlePathSVG = join(__dirname, "svg", "single-path.svg");
    let multiPathSVG = join(__dirname, "svg", "multi-path.svg");

    await Promise.allSettled([unlink(singlePathSVG), unlink(multiPathSVG)]);

    let singlePathSVGCode = getSVGCode(singlePathLSParams, singlePathSVGParams);
    await writeFile(singlePathSVG, singlePathSVGCode);

    let multiPathSVGCode = getMultiPathSVGCode(multiPathLSParams, multiPathSVGParams);
    await writeFile(multiPathSVG, multiPathSVGCode);

    try {
        console.log("Below, an exception is expected");
        console.log(getMultiPathSVGCode(lsInvalidParams, multiPathSVGParams));
    } catch (error) {
        // Log the original message
        console.error(error);
        if (error.name === "LSError") {
            // Get a JSON representation of the error list and format it as YAML
            let errorJSON = error.toJSON();
            console.log(dump(errorJSON, {indent: 4}));
        }
    }
}

runTest();
