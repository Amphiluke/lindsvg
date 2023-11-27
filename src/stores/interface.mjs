import {defineStore} from "pinia";
import {ref, readonly, reactive} from "vue";

export const POPOVER_ACCEPT = "accept";
export const POPOVER_DISMISS = "dismiss";

export let useInterfaceStore = defineStore("interface", () => {
  /** Currently opened sidebar panel */
  let openedPanel = ref("");

  /**
   * Toggle panel’s state
   * @param {String} panelId - Panel identifier
   */
  function togglePanel(panelId) {
    openedPanel.value = (panelId === openedPanel.value) ? "" : panelId;
  }

  /** @type {{uid: Symbol | undefined, text: String | undefined, button: String | undefined, resolve: Function | undefined}} */
  let popoverData = reactive({uid: undefined, text: undefined, button: undefined, resolve: undefined});

  /**
   * Show a popover and wait for the user decision (either accept or dismiss)
   * @param {Object} options - Popover configuration options
   * @param {String} options.text - Popover text
   * @param {String} options.button - Popover accept button
   * @returns {Promise<POPOVER_ACCEPT | POPOVER_DISMISS>} Promise that resolves with an identifier of the user action
   */
  function requestPopover({text, button}) {
    if (popoverData.resolve) { // dismiss the previous popover if still displayed
      popoverData.resolve(POPOVER_DISMISS);
    }
    let uid = Symbol();
    return new Promise((resolve) => {
      Object.assign(popoverData, {uid, text, button, resolve});
    }).finally(() => {
      if (popoverData.uid === uid) {
        popoverData.uid = popoverData.text = popoverData.button = popoverData.resolve = undefined;
      }
    });
  }

  return {
    openedPanel,
    togglePanel,
    popover: readonly(popoverData),
    requestPopover,
  };
});
