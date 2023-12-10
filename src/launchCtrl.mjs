import {useInterfaceStore} from "./stores/interface.mjs";
import {useLSystemStore} from "./stores/lSystem.mjs";
import {useCollectionsStore} from "./stores/collections.mjs";

export function processLaunchOptions() {
  return processLaunchQueue() || processBundledPermalink() || processGistPermalink();
}

function extractQuery(...names) {
  let url = new URL(location.href);
  let params = Object.fromEntries(names.map((name) => [name, url.searchParams.get(name)]));
  names.forEach((name) => url.searchParams.delete(name));
  window.history.replaceState(null, "", url);
  return params;
}

function processLaunchQueue() {
  let launchParamsSupported = ("launchQueue" in window) && ("files" in window.LaunchParams.prototype);
  /** @see https://github.com/WICG/web-app-launch/issues/92#issuecomment-1505562033 */
  if (!launchParamsSupported || extractQuery("action").action !== "handleFile") {
    return false;
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
  return true;
}

function processBundledPermalink() {
  let {cid, lid} = extractQuery("cid", "lid");
  if (!cid || !lid) {
    return false;
  }
  let collectionsStore = useCollectionsStore();
  collectionsStore.selectedCID = cid;
  collectionsStore.selectedLID = lid;
  let lSystemStore = useLSystemStore();
  lSystemStore.setup(collectionsStore.selectedLSystem);
  lSystemStore.buildSVG();
  return true;
}

function processGistPermalink() {
  let {gist} = extractQuery("gist");
  if (!gist) {
    return false;
  }
  fetch(`https://api.github.com/gists/${gist}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    mode: "cors",
    credentials: "omit",
  })
    .then((response) => response.json())
    .then((data) => {
      let {content} = Object.values(data.files)[0];
      let config = JSON.parse(content);
      let lSystemStore = useLSystemStore();
      lSystemStore.setup(config);
      lSystemStore.buildSVG();
    })
    .catch((reason) => {
      useInterfaceStore().requestPopover({text: "Unfortunately, this gist cannot be opened"});
      console.error("Unable to open the gist", reason);
    });
  return true;
}
