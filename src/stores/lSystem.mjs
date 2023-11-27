import {defineStore} from "pinia";
import {ref, computed, reactive} from "vue";
import {getSVGCode, getMultiPathSVGCode} from "lindsvg";

export let useLSystemStore = defineStore("lSystem", () => {
  let lid = ref("");
  let axiom = ref("F");
  let alpha = ref(0);
  let theta = ref(0);
  let step = ref(10);
  let iterations = ref(3);
  let rules = reactive({F: "F"});
  let attributes = reactive({stroke: "forestgreen"});
  let svgCode = ref("");

  let letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  let vacantLetters = computed(() => {
    let usedLetters = Object.keys(rules);
    return letters.filter((letter) => !usedLetters.includes(letter));
  });

  /**
   * Configure L-system parameters
   * @param {import("./bank.mjs").LSystem} config - L-system configuration
   */
  function setup(config) {
    lid.value = config.lid ?? "";
    axiom.value = config.axiom ?? "F";
    alpha.value = config.alpha ?? 0;
    theta.value = config.theta ?? 0;
    step.value = config.step ?? 10;
    iterations.value = config.iterations ?? 3;
    Object.keys(rules).forEach(letter => delete rules[letter]);
    Object.assign(rules, config.rules ?? {F: "F"});
    Object.keys(attributes).forEach(attribute => delete attributes[attribute]);
    Object.assign(attributes, config.attributes ?? {stroke: "forestgreen"});
  }

  /**
   * Regenerate SVG code for the L-system using current parameter values
   */
  function buildSVG() {
    let method = Object.values(attributes).some((attr) => Array.isArray(attr)) ? getMultiPathSVGCode : getSVGCode;
    svgCode.value = method({
      axiom: axiom.value,
      rules,
      alpha: alpha.value * Math.PI / 180,
      theta: theta.value * Math.PI / 180,
      iterations: iterations.value,
      step: step.value,
    }, {
      padding: 2,
      pathAttributes: attributes,
    });
  }

  return {
    lid,
    axiom,
    alpha,
    theta,
    step,
    iterations,
    rules,
    attributes,
    svgCode,
    vacantLetters,
    setup,
    buildSVG,
  };
});
