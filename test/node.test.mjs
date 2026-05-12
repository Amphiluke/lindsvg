import assert from "node:assert/strict";
import {test} from "node:test";
import {createHash} from "node:crypto";
import {getSVGCode, getComboSVGCode} from "../dist/lindsvg.mjs";
import * as testData from "./test-data.mjs";

let getChecksum = (content) => {
  let hash = createHash("sha256");
  hash.update(content);
  return hash.digest("hex");
};

test("Single-path mode", () => {
  let svgCode = getSVGCode(testData.singlePathData.lsParams, testData.singlePathData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.singlePathData.checksum);
});

test("Multi-path mode", () => {
  let svgCode = getSVGCode(testData.multiPathData.lsParams, testData.multiPathData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.multiPathData.checksum);
});

test("Combo mode", () => {
  let svgCode = getComboSVGCode(testData.comboData.lsParamsMap, testData.comboData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.comboData.checksum);
});

test("L-system params validation", () => {
  assert.throws(() => getSVGCode(testData.invalidData.lsParams, testData.multiPathData.svgParams), (error) => {
    assert.strictEqual(error.name, "LSError");
    assert.deepStrictEqual(error.toJSON(), {
      axiom: "Axiom may only contain the following characters: A..Z,+,-,|,!,[,]",
      rules: {
        F: "Production rules may only contain the following characters: A..Z,+,-,|,!,[,]",
        X: "Production rules may only contain the following characters: A..Z,+,-,|,!,[,]"
      },
      alpha: "The “alpha” parameter must be a finite number",
      theta: "The “theta” parameter must be a finite number",
      iterations: "The number of iterations must be integer and finite",
      step: "The “step” parameter must be a positive finite number",
    });
    return true;
  });
});
