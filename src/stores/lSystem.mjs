import {ref, computed, reactive, toRaw} from "vue";
import {defineStore} from "pinia";
import {getSVGCode} from "lindsvg";

/** @import {LSParams, LSParamsMap, LSVGPathAttributes, LSVGPathAttributesMap} from "lindsvg" */
/** @import {LSystem} from "./bank.mjs" */

/** @type {LSParams} */
const DEFAULT_PARAMS = Object.freeze({
  axiom: "F",
  rules: {F: "F"},
  x: 0,
  y: 0,
  alpha: 0,
  theta: 0,
  step: 10,
  iterations: 3,
});

/** @type {LSVGPathAttributes} */
const DEFAULT_ATTRS = Object.freeze({
  stroke: "forestgreen",
});

export let useLSystemStore = defineStore("lSystem", () => {
  let lid = ref("");

  /** @type {LSParams[]} */
  let params = reactive([structuredClone(DEFAULT_PARAMS)]);

  /** @type {LSVGPathAttributes[]} */
  let attributes = reactive([structuredClone(DEFAULT_ATTRS)]);

  let svgCode = ref("");

  let letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  let vacantLetters = computed(() => params.map(({rules}) => {
    let usedLetters = Object.keys(rules);
    return letters.filter((letter) => !usedLetters.includes(letter));
  }));

  /**
   * Configure L-system parameters
   * @param {LSystem | null} config - L-system configuration
   */
  function setup(config) {
    lid.value = config?.lid ?? "";
    params.length = attributes.length = 0;
    if (!config) {
      params.push(structuredClone(DEFAULT_PARAMS));
      attributes.push(structuredClone(DEFAULT_ATTRS));
      return;
    }
    config.params.forEach((lsParams, index) => {
      params.push({
        ...structuredClone(DEFAULT_PARAMS),
        ...structuredClone(toRaw(lsParams)),
      });
      attributes.push({
        ...structuredClone(DEFAULT_ATTRS),
        ...structuredClone(toRaw(config.attributes?.[index])),
      });
    });
  }

  /**
   * Add a new slot to the current L-system
   */
  function addSubLSystem() {
    params.push(structuredClone(DEFAULT_PARAMS));
    attributes.push(structuredClone(DEFAULT_ATTRS));
  }

  /**
   * Create a clone of a sub-L-system
   * @param {number} index - Index of the sub-L-system to clone
   */
  function cloneSubLSystem(index) {
    if (index < 0 || index > params.length - 1) {
      throw new RangeError("Invalid sub-L-system index");
    }
    params.push(structuredClone(toRaw(params[index])));
    attributes.push(structuredClone(toRaw(attributes[index])));
  }

  /**
   * Delete a sub-L-system at the given position
   * @param {number} index - Index of the sub-L-system to delete
   */
  function deleteSubLSystem(index) {
    if (index < 0 || index > params.length - 1) {
      throw new RangeError("Invalid sub-L-system index");
    }
    if (params.length < 2) {
      throw new Error("Cannot delete the only existing sub-L-system");
    }
    params.splice(index, 1);
    attributes.splice(index, 1);
  }

  /**
   * Regenerate SVG code for the L-system using current parameter values
   */
  function buildSVG() {
    /** @type {LSParamsMap} */
    let lsParamsMap = {};
    /** @type {LSVGPathAttributesMap} */
    let pathAttributesMap = {};
    params.forEach((lsParams, index) => {
      lsParamsMap[index] = {
        ...lsParams,
        alpha: lsParams.alpha * Math.PI / 180,
        theta: lsParams.theta * Math.PI / 180,
      };
      pathAttributesMap[index] = {...attributes[index]};
    });
    svgCode.value = getSVGCode(lsParamsMap, {
      padding: 2,
      pathAttributesMap,
    });
  }

  return {
    lid,
    params,
    attributes,
    svgCode,
    vacantLetters,
    setup,
    addSubLSystem,
    cloneSubLSystem,
    deleteSubLSystem,
    buildSVG,
  };
});
