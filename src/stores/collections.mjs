import {defineStore} from "pinia";
import {ref, computed, readonly, toValue, toRaw} from "vue";
import {useLocalStorage} from "@vueuse/core";
import bank from "./bank.mjs";
import {useLSystemStore} from "./lSystem.mjs";

export const USER_DEFINED_COLLECTION_ID = "User defined";

/**
 * Determines whether the given collection is user-defined
 * @param {String} cid - Collection identifier
 * @returns {Boolean}
 */
export function isUserDefined(cid) {
  return cid === USER_DEFINED_COLLECTION_ID;
}

export let useCollectionsStore = defineStore("collections", () => {
  /** @type {import("./bank.mjs").LSystem[]} */
  let userStorage = useLocalStorage("userCollection", []);

  /** @type {import("./bank.mjs").LSCollection} */
  let collections = readonly([...bank, {cid: USER_DEFINED_COLLECTION_ID, items: userStorage}]);

  let selectedCID = ref("");
  let selectedLID = ref("");
  let selectedLSystem = computed(() => {
    let collection = collections.find(({cid}) => cid === selectedCID.value);
    let lSystem = collection?.items.find(({lid}) => lid === selectedLID.value);
    return lSystem ?? readonly({});
  });

  /**
   * Store an L-system in the user-defined collection storage
   * @param {import("./bank.mjs").LSystem} lSystemParams - L-system configuration
   */
  function storeLSystem(lSystemParams) {
    let index = userStorage.value.findIndex(({lid}) => lid === lSystemParams.lid);
    if (index === -1) {
      userStorage.value.push(lSystemParams);
    } else {
      userStorage.value[index] = lSystemParams;
    }
  }

  /**
   * Delete an L-system from the user-defined collection storage
   * @param {String} lidToDelete - Unique identifier of the L-system
   */
  function deleteLSystem(lidToDelete) {
    let index = userStorage.value.findIndex(({lid}) => lid === lidToDelete);
    if (index !== -1) {
      userStorage.value.splice(index, 1);
    }
  }

  // Update user-defined L-system in store on editing its parameters
  useLSystemStore().$subscribe((_mutation, state) => {
    if (!isUserDefined(selectedCID.value)) {
      return;
    }
    storeLSystem({
      lid: selectedLID.value,
      axiom: toValue(state.axiom),
      alpha: toValue(state.alpha),
      theta: toValue(state.theta),
      step: toValue(state.step),
      iterations: toValue(state.iterations),
      rules: {...toRaw(state.rules)},
      attributes: {...toRaw(state.attributes)},
    });
  });

  return {
    collections,
    selectedCID,
    selectedLID,
    selectedLSystem,
    deleteLSystem,
  };
});
