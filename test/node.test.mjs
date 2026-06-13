import assert from "node:assert/strict";
import {test} from "node:test";
import {createHash} from "node:crypto";
import {getSVGCode} from "../dist/lindsvg.mjs";
import * as testData from "./test-data.mjs";

let getChecksum = (content) => {
  let hash = createHash("sha256");
  hash.update(content);
  return hash.digest("hex");
};

test("Single-path mode", () => {
  let svgCode = getSVGCode(testData.singlePathData.lsParamsMap, testData.singlePathData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.singlePathData.checksum);
});

test("Multi-path mode", () => {
  let svgCode = getSVGCode(testData.multiPathData.lsParamsMap, testData.multiPathData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.multiPathData.checksum);
});

test("Combo mode", () => {
  let svgCode = getSVGCode(testData.comboData.lsParamsMap, testData.comboData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.comboData.checksum);
});

test("Custom template mode", () => {
  let svgCode = getSVGCode(testData.customTplData.lsParamsMap, testData.customTplData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.customTplData.checksum);
});

test("Template with reusing", () => {
  let svgCode = getSVGCode(testData.tplReuseData.lsParamsMap, testData.tplReuseData.svgParams);
  assert.strictEqual(getChecksum(svgCode), testData.tplReuseData.checksum);
});

test("L-system params validation", () => {
  assert.throws(() => getSVGCode(testData.invalidData.lsParamsMap, testData.multiPathData.svgParams), (error) => {
    assert.strictEqual(error.name, "LSError");
    assert.deepStrictEqual(error.toJSON(), {
      axiom: "ERROR_ILLEGAL_CHAR",
      rules: {
        F: "ERROR_ILLEGAL_CHAR",
        X: "ERROR_ILLEGAL_CHAR"
      },
      x: "ERROR_NUMBER",
      y: "ERROR_NUMBER",
      alpha: "ERROR_NUMBER",
      theta: "ERROR_NUMBER",
      step: "ERROR_POSITIVE_NUMBER",
      iterations: "ERROR_POSITIVE_INTEGER",
    });
    return true;
  });
});
