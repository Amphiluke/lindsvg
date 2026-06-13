import {ref, computed, reactive, readonly, toRaw} from "vue";
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
  let subLSystemIndex = ref(0);

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
    if (!config?.params?.length) {
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
    subLSystemIndex.value = 0;
  }

  let hasPrevSubLSystem = computed(() => subLSystemIndex.value > 0);
  let hasNextSubLSystem = computed(() => subLSystemIndex.value < params.length - 1);

  /**
   * Activate previous sub-L-system
   */
  function selectPrevSubLSystem() {
    subLSystemIndex.value = Math.max(subLSystemIndex.value - 1, 0);
  }

  /**
   * Activate next sub-L-system
   */
  function selectNextSubLSystem() {
    subLSystemIndex.value = Math.min(subLSystemIndex.value + 1, params.length - 1);
  }

  /**
   * Activate sub-L-system at the given index
   * @param {number} index - Index of the sub-L-system to activate
   */
  function selectNthSubLSystem(index) {
    subLSystemIndex.value = Math.min(Math.max(index, 0), params.length - 1);
  }

  /**
   * Append a new slot to the current L-system
   */
  function addSubLSystem() {
    params.push(structuredClone(DEFAULT_PARAMS));
    attributes.push(structuredClone(DEFAULT_ATTRS));
    subLSystemIndex.value = params.length - 1;
  }

  /**
   * Create a clone of the active sub-L-system
   */
  function cloneSubLSystem() {
    params.splice(subLSystemIndex.value, 0, structuredClone(toRaw(params[subLSystemIndex.value])));
    attributes.splice(subLSystemIndex.value, 0, structuredClone(toRaw(attributes[subLSystemIndex.value])));
    subLSystemIndex.value++;
  }

  /**
   * Delete active sub-L-system
   */
  function deleteSubLSystem() {
    if (params.length < 2) {
      throw new Error("Cannot delete the only existing sub-L-system");
    }
    params.splice(subLSystemIndex.value, 1);
    attributes.splice(subLSystemIndex.value, 1);
    subLSystemIndex.value = Math.min(subLSystemIndex.value, params.length - 1);
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

    subLSystemIndex: readonly(subLSystemIndex),
    hasPrevSubLSystem,
    hasNextSubLSystem,
    selectPrevSubLSystem,
    selectNextSubLSystem,
    selectNthSubLSystem,

    setup,
    addSubLSystem,
    cloneSubLSystem,
    deleteSubLSystem,
    buildSVG,
  };
});
