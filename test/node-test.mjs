import {writeFile, unlink} from "node:fs/promises";
import {join, dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {getSVGCode, getMultiPathSVGCode, getComboSVGCode} from "../dist/lindsvg.mjs";

let __dirname = dirname(fileURLToPath(import.meta.url));

let params = await import("./params.mjs");

let singlePathSVG = join(__dirname, "svg", "single-path.svg");
let multiPathSVG = join(__dirname, "svg", "multi-path.svg");
let comboSVG = join(__dirname, "svg", "combo.svg");

await Promise.allSettled([unlink(singlePathSVG), unlink(multiPathSVG), unlink(comboSVG)]);

let singlePathSVGCode = getSVGCode(params.singlePathLSParams, params.singlePathSVGParams);
await writeFile(singlePathSVG, singlePathSVGCode);

let multiPathSVGCode = getMultiPathSVGCode(params.multiPathLSParams, params.multiPathSVGParams);
await writeFile(multiPathSVG, multiPathSVGCode);

let comboSVGCode = getComboSVGCode(params.comboLSParams, params.comboSVGParams);
await writeFile(comboSVG, comboSVGCode);

try {
  console.log("Below, an exception is expected");
  console.log(getMultiPathSVGCode(params.lsInvalidParams, params.multiPathSVGParams));
} catch (error) {
  // Log the original message
  console.error(error);
  if (error.name === "LSError") {
    console.log(JSON.stringify(error.toJSON(), null, 4).replace(/["{}],?/g, "").replaceAll(":", " ->"));
  }
}
