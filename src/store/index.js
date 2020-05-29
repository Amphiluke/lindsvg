import Vue from "vue";
import Vuex from "vuex";
import bank from "./bank.js";

Vue.use(Vuex);

let defaults = {
  axiom: "",
  alpha: 0,
  theta: 0,
  step: 10,
  iterations: 3,
  rules: {},
  attributes: {stroke: "#008000"},
  svgCode: ""
};

export default new Vuex.Store({
  strict: true,
  state: {
    // Actual L-system parameters
    ...defaults,

    // Selected collection and L-system identifiers
    cid: "",
    lid: "",

    // Currently opened panel
    openedPanel: "collections"
  },

  mutations: {
    setAxiom: (state, {axiom}) => state.axiom = axiom,

    setAlpha: (state, {alpha}) => state.alpha = alpha,

    setTheta: (state, {theta}) => state.theta = theta,

    setStep: (state, {step}) => state.step = step,

    setIterations: (state, {iterations}) => state.iterations = iterations,

    setRule: (state, {letter, rule}) => state.rules = {...state.rules, [letter]: rule},

    unsetRule: (state, {letter}) => {
      let newEntries = Object.entries(state.rules).filter(([key]) => key !== letter);
      state.rules = Object.fromEntries(newEntries);
    },

    setAttribute: (state, {name, value}) => state.attributes = {...state.attributes, [name]: value},

    unsetAttribute: (state, {name}) => {
      let newEntries = Object.entries(state.attributes).filter(([key]) => key !== name);
      state.attributes = Object.fromEntries(newEntries);
    },

    setupLSystem: (state, {cid, lid}) => {
      let collection = bank.find(({cid: aCid}) => aCid === cid);
      let lSystem = collection.items.find(({lid: aLid}) => aLid === lid);
      Object.assign(state, defaults, lSystem, {cid});
    },

    setSVGCode: (state, {svgCode}) => state.svgCode = svgCode,

    openPanel: (state, {panelId, toggle = true}) => {
      if (state.openedPanel !== panelId) {
        state.openedPanel = panelId;
      } else if (toggle) {
        state.openedPanel = "";
      }
    }
  },

  getters: {
    vacantLetters: state => {
      let allLetters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
      let usedLetters = Object.keys(state.rules);
      return allLetters.filter(letter => !usedLetters.includes(letter));
    }
  }
});
