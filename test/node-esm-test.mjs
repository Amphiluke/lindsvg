import {getSVGCode, getMultiPathSVGCode} from "../src/lindsvg.mjs";
import {promisify} from "util";
import {writeFile, unlink} from "fs";
import {join, dirname} from "path";
import {fileURLToPath} from "url";

import {createRequire} from "module";
let require = createRequire(import.meta.url);
let {dump} = require("js-yaml");

let __dirname = dirname(fileURLToPath(import.meta.url));

let asyncWriteFile = promisify(writeFile);
let asyncUnlink = promisify(unlink);

async function runTest() {
    let {singlePathLSParams, multiPathLSParams, lsInvalidParams, singlePathSVGParams, multiPathSVGParams} = await import("./params.mjs");

    let singlePathSVG = join(__dirname, "svg", "single-path.svg");
    let multiPathSVG = join(__dirname, "svg", "multi-path.svg");

    await Promise.allSettled([asyncUnlink(singlePathSVG), asyncUnlink(multiPathSVG)]);

    let singlePathSVGCode = getSVGCode(singlePathLSParams, singlePathSVGParams);
    await asyncWriteFile(singlePathSVG, singlePathSVGCode);

    let multiPathSVGCode = getMultiPathSVGCode(multiPathLSParams, multiPathSVGParams);
    await asyncWriteFile(multiPathSVG, multiPathSVGCode);

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
