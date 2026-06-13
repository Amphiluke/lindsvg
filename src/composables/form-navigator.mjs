import {useEventListener} from "@vueuse/core";

/** @import {ShallowRef, Readonly} from "vue" */

/**
 * Allows navigating a form with Up/Down arrow keys
 * @param {Readonly<ShallowRef<HTMLFormElement>>} formRef - A form template ref
 */
export function useFormNavigator(formRef) {
  useEventListener(formRef, "keydown", (e) => {
    if (e.key === "ArrowDown") {
      moveFocus(1);
    } else if (e.key === "ArrowUp") {
      moveFocus(-1);
    }
  });
}

function moveFocus(delta) {
  let {activeElement} = document;
  if (activeElement.tagName !== "INPUT" || activeElement.type !== "text") {
    return;
  }
  let focusTarget = [...activeElement.form.querySelectorAll("input[type='text']")]
    .find((_input, index, inputs) => inputs[index - delta] === activeElement);
  if (!focusTarget) {
    return;
  }
  focusTarget.focus();
  setTimeout(() => { // immediate selecting won’t work on keydown, so queueing
    if (focusTarget === document.activeElement) {
      focusTarget.select();
    }
  }, 0);
}
