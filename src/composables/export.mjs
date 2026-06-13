import {shallowRef, computed, watchEffect} from "vue";
import {useObjectUrl, useShare} from "@vueuse/core";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";

export function useExport() {
  let lSystemStore = useLSystemStore();
  let interfaceStore = useInterfaceStore();
  
  let canExport = computed(() => interfaceStore.openedPanel === "sharing" && !!lSystemStore.svgCode);

  let lsvg = computed(() => ({
    _version: __PACKAGE_VERSION__,
    params: lSystemStore.params,
    attributes: lSystemStore.attributes,
  }));
  let lsvgBlob = computed(() => canExport.value ? new Blob([JSON.stringify(lsvg.value)], {type: "application/json"}) : null);
  let lsvgURL = useObjectUrl(lsvgBlob);

  let svgBlob = computed(() => canExport.value ? new Blob([lSystemStore.svgCode], {type: "image/svg+xml"}) : null);
  let svgURL = useObjectUrl(svgBlob);

  let pngBlob = shallowRef(null);
  let pngURL = useObjectUrl(pngBlob);
  watchEffect(async () => {
    let svgURLValue = svgURL.value;
    if (!svgURLValue) {
      pngBlob.value = null;
      return;
    }
    let img = new Image();
    img.src = svgURLValue;
    if (!img.complete) {
      await new Promise((resolve, reject) => {
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });
      if (svgURLValue !== svgURL.value) { // protection against race conditions
        return;
      }
    }
    let canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
    canvas.getContext("2d").drawImage(img, 0, 0);
    let blob = await canvas.convertToBlob({type: "image/png", quality: 1});
    if (svgURLValue === svgURL.value) { // protection against race conditions
      pngBlob.value = blob;
    }
  });

  async function copyToClipboard(type) {
    let clipboardData = {};
    switch (type) {
      case "lsvg":
        clipboardData["text/plain"] = new Blob([JSON.stringify(lsvg.value)], {type: "text/plain"});
        break;
      case "svg":
        clipboardData["text/plain"] = new Blob([svgBlob.value], {type: "text/plain"});
        if (("supports" in ClipboardItem) && ClipboardItem.supports(svgBlob.value.type)) {
          clipboardData[svgBlob.value.type] = svgBlob.value;
        }
        break;
      case "png":
        clipboardData[pngBlob.value.type] = pngBlob.value;
        break;
    }
    let clipboardItem = new ClipboardItem(clipboardData);
    await navigator.clipboard.write([clipboardItem]);
  }

  let {share, isSupported: canShare} = useShare();
  function launchShare(type) {
    let blob = type === "svg" ? svgBlob.value : pngBlob.value;
    share({
      title: "L-system",
      text: "Image of an L-system from the lindsvg app",
      files: [new File([blob], `l-system.${type}`, {type: blob.type})],
    });
  }

  return {
    canExport,
    canShare,
    copyToClipboard,
    launchShare,
    urls: {
      lsvg: lsvgURL,
      svg: svgURL,
      png: pngURL,
    },
  };
}
