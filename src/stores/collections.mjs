import {defineStore} from "pinia";
import {ref, computed, readonly, toRaw} from "vue";
import {useLocalStorage} from "@vueuse/core";
import bank from "./bank.mjs";
import {useLSystemStore} from "./lSystem.mjs";

/** @import {DeepReadonly} from "vue" */
/** @import {RemovableRef} from "@vueuse/core" */
/** @import {LSystem, LSCollection} from "./bank.mjs" */

export const USER_DEFINED_COLLECTION_ID = "User defined";

/**
 * Determines whether the given collection is user-defined
 * @param {string} cid - Collection identifier
 * @returns {boolean}
 */
export function isUserDefined(cid) {
  return cid === USER_DEFINED_COLLECTION_ID;
}

export let useCollectionsStore = defineStore("collections", () => {
  /** @type {RemovableRef<LSystem[]>} */
  let userStorage = useLocalStorage("userCollectionV3", []);

  /** @type {DeepReadonly<LSCollection[]>} */
  let collections = readonly([...bank, {cid: USER_DEFINED_COLLECTION_ID, items: userStorage}]);

  let selectedCID = ref("");
  let selectedLID = ref("");
  let selectedLSystem = computed(() => {
    let collection = collections.find(({cid}) => cid === selectedCID.value);
    return collection?.items.find(({lid}) => lid === selectedLID.value) ?? null;
  });

  /**
   * Store an L-system in the user-defined collection storage
   * @param {LSystem} lSystemParams - L-system configuration
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
   * @param {string} lidToDelete - Unique identifier of the L-system
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
      params: structuredClone(toRaw(state.params)),
      attributes: structuredClone(toRaw(state.attributes)),
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
