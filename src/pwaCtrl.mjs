import "./sw.js?worker";
import {useInterfaceStore, POPOVER_ACCEPT} from "./stores/interface.mjs";

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
