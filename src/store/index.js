import Vue from "vue";
import Vuex from "vuex";
import bank from "./bank.js";
import * as mutationTypes from "./mutation-types.js";
import {STORED_COLLECTION_ID, getStoredCollection, storeLSystem, deleteLSystem} from "./user-storage.js";

Vue.use(Vuex);

let defaults = {
  axiom: "F",
  alpha: 0,
  theta: 0,
  step: 10,
  iterations: 3,
  rules: {F: "F"},
  attributes: {stroke: "#008000"},
  svgCode: ""
};

let store = new Vuex.Store({
  strict: process.env.NODE_ENV === "development",
  state: {
    // L-system bank (built in + user defined L-systems)
    bank: [...bank, getStoredCollection()],

    // Actual L-system parameters
    ...defaults,

    // Selected collection and L-system identifiers
    cid: "",
    lid: "",

    // Currently opened panel
    openedPanel: "collections"
  },

  mutations: {
    [mutationTypes.LS_SET_AXIOM]: (state, {axiom}) => state.axiom = axiom,

    [mutationTypes.LS_SET_ALPHA]: (state, {alpha}) => state.alpha = alpha,

    [mutationTypes.LS_SET_THETA]: (state, {theta}) => state.theta = theta,

    [mutationTypes.LS_SET_STEP]: (state, {step}) => state.step = step,

    [mutationTypes.LS_SET_ITERATIONS]: (state, {iterations}) => state.iterations = iterations,

    [mutationTypes.LS_SET_RULE]: (state, {letter, rule}) => state.rules = {...state.rules, [letter]: rule},

    [mutationTypes.LS_UNSET_RULE]: (state, {letter}) => {
      let newEntries = Object.entries(state.rules).filter(([key]) => key !== letter);
      state.rules = Object.fromEntries(newEntries);
    },

    [mutationTypes.LS_SET_ATTRIBUTE]: (state, {name, value}) => state.attributes = {...state.attributes, [name]: value},

    [mutationTypes.LS_UNSET_ATTRIBUTE]: (state, {name}) => {
      let newEntries = Object.entries(state.attributes).filter(([key]) => key !== name);
      state.attributes = Object.fromEntries(newEntries);
    },

    [mutationTypes.LS_SETUP_L_SYSTEM]: (state, {cid, lid}) => {
      let collection = state.bank.find(({cid: aCid}) => aCid === cid);
      let lSystem = collection.items.find(({lid: aLid}) => aLid === lid);
      Object.assign(state, defaults, lSystem, {cid});
    },

    [mutationTypes.ADD_L_SYSTEM]: (state, {lid}) => {
      Object.assign(state, defaults, {cid: STORED_COLLECTION_ID, lid});
      storeLSystemHelper(state);
    },

    [mutationTypes.DELETE_L_SYSTEM]: (state, {lid}) => {
      deleteLSystem(lid);
      store.commit(mutationTypes.UPDATE_BANK);
    },

    [mutationTypes.UPDATE_BANK]: state => state.bank = [...bank, getStoredCollection()],

    [mutationTypes.SET_SVG_CODE]: (state, {svgCode}) => state.svgCode = svgCode,

    [mutationTypes.OPEN_PANEL]: (state, {panelId, toggle = true}) => {
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
    },

    isUserDefined: state => (cid = state.cid) => cid === STORED_COLLECTION_ID
  }
});

store.subscribe(({type}, state) => {
  if (type.startsWith("LS_") && store.getters.isUserDefined()) {
    storeLSystemHelper(state);
  }
});

function storeLSystemHelper({lid, axiom, alpha, theta, step, iterations, rules, attributes}) {
  // Pass only those params that need to be stored
  storeLSystem({lid, axiom, alpha, theta, step, iterations, rules, attributes});
  store.commit(mutationTypes.UPDATE_BANK);
}

export default store;
