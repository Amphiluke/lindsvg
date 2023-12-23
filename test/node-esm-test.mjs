import {getSVGCode, getMultiPathSVGCode} from "../src/lindsvg.mjs";
import {writeFile, unlink} from "node:fs/promises";
import {join, dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {dump} from "js-yaml";

let __dirname = dirname(fileURLToPath(import.meta.url));

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
