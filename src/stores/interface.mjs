import {ref, readonly, reactive, watch} from "vue";
import {defineStore} from "pinia";

/** @import {Ref} from "vue" */

export const POPOVER_ACCEPT = "accept";
export const POPOVER_DISMISS = "dismiss";

export const SCROLL_BEHAVIOR = window.matchMedia("prefers-reduced-motion: reduce").matches ? "instant" : "smooth";

export let useInterfaceStore = defineStore("interface", () => {
  /**
   * Currently opened sidebar panel
   * @type {Ref<"collections" | "settings" | "attributes" | "sharing" | "about" | "">}
   */
  let openedPanel = ref("collections");

  /**
   * Toggle panel’s state
   * @param {string} panelId - Panel identifier
   */
  function togglePanel(panelId) {
    openedPanel.value = (panelId === openedPanel.value) ? "" : panelId;
  }

  /**
   * Is the Leaf toolbar currently open
   */
  let isLeafToolbarOpen = ref(false);

  // The Collections panel and the Leaf toolbar are mutually exclusive
  watch(openedPanel, (panelId) => {
    if (panelId === "collections" && isLeafToolbarOpen.value) {
      isLeafToolbarOpen.value = false;
    }
  });
  watch(isLeafToolbarOpen, (isOpen) => {
    if (isOpen && openedPanel.value === "collections") {
      openedPanel.value = "";
    }
  });

  /** @type {{uid: Symbol | undefined, text: String | undefined, button: String | undefined, resolve: Function | undefined}} */
  let popoverData = reactive({uid: undefined, text: undefined, button: undefined, resolve: undefined});

  /**
   * Show a popover and wait for the user decision (either accept or dismiss)
   * @param {object} options - Popover configuration options
   * @param {string} options.text - Popover text
   * @param {string} options.button - Popover accept button
   * @returns {Promise<"accept" | "dismiss">} Promise that resolves with an identifier of the user action
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
    isLeafToolbarOpen,
    popover: readonly(popoverData),
    requestPopover,
  };
});
