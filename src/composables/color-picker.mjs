export const canPickColor = "showPicker" in HTMLInputElement.prototype;

/** @type {HTMLInputElement} */
let picker = document.body.appendChild(Object.assign(document.createElement("input"), {
  type: "color",
  hidden: true,
}));

/** @type {AbortController | null} */
let abortCtrl = null;

let pickColor = () => new Promise((resolve, reject) => {
  if (!canPickColor) {
    reject(new DOMException("Picking colors is not supported", "NotSupportedError"));
    return;
  }
  abortCtrl?.abort(); // previous listener may still be pending
  abortCtrl = new AbortController();
  picker.addEventListener("change", () => {
    resolve(picker.value);
    picker.value = "";
  }, {signal: abortCtrl.signal, once: true});
  picker.showPicker();
});

export function useColorPicker() {
  return {
    pickColor,
  };
}
