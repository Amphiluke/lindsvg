import "./sw.js?worker";
import {useInterfaceStore, POPOVER_ACCEPT} from "./stores/interface.mjs";
import {useLSystemStore} from "./stores/lSystem.mjs";

export const USING_PWA = import.meta.env.PROD && ("serviceWorker" in navigator);

export async function setupPWA() {
  if (!USING_PWA) {
    throw new Error("PWA functionality is not available");
  }
  let registration = await navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js");
  registration.addEventListener("updatefound", () => {
    if (!registration.active) { // the first installation
      return;
    }
    let newSW = registration.installing;
    newSW.addEventListener("statechange", function statechange() {
      if (newSW.state === "installed") {
        newSW.removeEventListener("statechange", statechange);
        suggestUpdate(newSW);
      }
    });
  });
}

async function suggestUpdate(newSW) {
  let interfaceStore = useInterfaceStore();
  let decision = await interfaceStore.requestPopover({text: "Relaunch the app to apply pending updates", button: "Relaunch"});
  if (decision !== POPOVER_ACCEPT) {
    return;
  }
  newSW.postMessage({code: "SKIP_WAITING"});
  navigator.serviceWorker.addEventListener("message", ({data}) => {
    if (data?.code === "SKIP_WAITING_OK") {
      window.location.reload();
    }
  });
}

let launchParamsSupported = ("launchQueue" in window) && ("files" in window.LaunchParams.prototype);

/** @see https://github.com/WICG/web-app-launch/issues/92#issuecomment-1505562033 */
function handleActionURL(action) {
  let url = new URL(location.href);
  if (url.searchParams.get("action") !== action) {
    return false;
  }
  url.searchParams.delete("action");
  window.history.replaceState(null, "", url);
  return true;
}

export function applyLaunchParams() {
  if (!launchParamsSupported || !handleActionURL("handleFile")) {
    return;
  }
  /** @see https://github.com/WICG/file-handling/blob/main/explainer.md */
  window.launchQueue.setConsumer(async ({files}) => {
    if (!files.length) {
      return;
    }
    try {
      let blob = await files[0].getFile();
      let config = JSON.parse(await blob.text());
      let lSystemStore = useLSystemStore();
      lSystemStore.setup(config);
      lSystemStore.buildSVG();
    } catch (error) {
      useInterfaceStore().requestPopover({text: "Unfortunately, this file cannot be opened"});
      console.error("Unable to open the file", error);
    }
  });
}
