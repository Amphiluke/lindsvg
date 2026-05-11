import {writeFile, unlink} from "node:fs/promises";
import {join, dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {createHash} from "node:crypto";
import assert from "node:assert/strict";
import {getSVGCode, getComboSVGCode} from "../dist/lindsvg.mjs";

let __dirname = dirname(fileURLToPath(import.meta.url));

let params = await import("./params.mjs");

let singlePathSVG = join(__dirname, "svg", "single-path.svg");
let multiPathSVG = join(__dirname, "svg", "multi-path.svg");
let comboSVG = join(__dirname, "svg", "combo.svg");

await Promise.allSettled([unlink(singlePathSVG), unlink(multiPathSVG), unlink(comboSVG)]);

let verifyChecksum = (content, checksum) => {
  let hash = createHash('sha256');
  hash.update(content);
  assert.strictEqual(hash.digest("hex"), checksum, "Checksum verification failed");
};

console.log("Testing single-path mode...");
let singlePathSVGCode = getSVGCode(params.singlePathLSParams, params.singlePathSVGParams);
verifyChecksum(singlePathSVGCode, "747008aea80649853b59a297694e7f3cba104d960c8e83ef03f6aea1e0641436");
await writeFile(singlePathSVG, singlePathSVGCode);

console.log("\nTesting multi-path mode...");
let multiPathSVGCode = getSVGCode(params.multiPathLSParams, params.multiPathSVGParams);
verifyChecksum(multiPathSVGCode, "91e44f29e91b1b6e2d31323489a95b4e2e681586cdcb305665cbf5cde6f3e750");
await writeFile(multiPathSVG, multiPathSVGCode);

console.log("\nTesting combo mode...");
let comboSVGCode = getComboSVGCode(params.comboLSParams, params.comboSVGParams);
verifyChecksum(comboSVGCode, "aec90fe9d863cf90b0bb23631adf4bb083dac1b5f7416f2c2d9115ec2340fa83");
await writeFile(comboSVG, comboSVGCode);

try {
  console.log("\nBelow, an exception is expected");
  console.log(getSVGCode(params.lsInvalidParams, params.multiPathSVGParams));
} catch (error) {
  // Log the original message
  console.error(error);
  if (error.name === "LSError") {
    console.log(JSON.stringify(error.toJSON(), null, 4).replace(/["{}],?/g, "").replaceAll(":", " ->"));
  }
}
