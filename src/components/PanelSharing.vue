<script setup>
import {computed, useCssModule} from "vue";
import {useCollectionsStore, isUserDefined} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import {useObjectUrl, useFileDialog} from "@vueuse/core";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();
let cssModule = useCssModule();

let fileDialog = useFileDialog({accept: ".lsvg", multiple: false, reset: true});
fileDialog.onChange(async ([file]) => {
  try {
    let config = JSON.parse(await file.text());
    lSystemStore.setup(config);
    lSystemStore.buildSVG();
  } catch (error) {
    interfaceStore.requestPopover({text: "Unfortunately, this file cannot be opened"});
    console.error("Unable to open the file", error);
  }
});

let svgBlob = computed(() => new Blob([lSystemStore.svgCode], {type: "image/svg+xml"}));
let svgURL = useObjectUrl(svgBlob);

let lsvgBlob = computed(() => {
  let lsvg = JSON.stringify({
    _version: __PACKAGE_VERSION__,
    axiom: lSystemStore.axiom,
    alpha: lSystemStore.alpha,
    theta: lSystemStore.theta,
    step: lSystemStore.step,
    iterations: lSystemStore.iterations,
    rules: lSystemStore.rules,
    attributes: lSystemStore.attributes,
  });
  return new Blob([lsvg], {type: "application/json"});
});
let lsvgURL = useObjectUrl(lsvgBlob);

let permalink = computed(() => {
  if (!collectionsStore.selectedCID || !collectionsStore.selectedLID || isUserDefined(collectionsStore.selectedCID)) {
    return "";
  }
  let {location} = window;
  let url = new URL(location.origin + location.pathname);
  url.searchParams.set("cid", collectionsStore.selectedCID);
  url.searchParams.set("lid", collectionsStore.selectedLID);
  return url.toString();
});

async function copyPermalink({target}) {
  await navigator.clipboard.writeText(permalink.value);
  target.classList.add(cssModule.copySuccess);
  setTimeout(() => target.classList.remove(cssModule.copySuccess), 4000);
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Sharing
    </h2>
    <form
      action="#"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent
    >
      <div :class="$style.fileControls">
        <h3>Open file…</h3>
        <button
          type="button"
          :class="[interfaceStyles.button, $style.fileButton]"
          @click="fileDialog.open"
        >
          LSVG
        </button>

        <h3>Save file…</h3>
        <a
          :href="lsvgURL"
          :class="[interfaceStyles.button, $style.fileButton]"
          :download="(collectionsStore.selectedLID || 'l-system') + '.lsvg'"
        >
          LSVG
        </a>
        <a
          :href="svgURL"
          :class="[interfaceStyles.button, $style.fileButton]"
          :download="(collectionsStore.selectedLID || 'l-system') + '.svg'"
        >
          SVG
        </a>
      </div>

      <hr>

      <h3>Permalink for the selected L-system</h3>
      <textarea
        :class="$style.permalinkField"
        :value="permalink"
        readonly
        @click="$event.target.select()"
      />
      <button
        type="button"
        :class="[interfaceStyles.button, $style.permalinkCopyButton]"
        :disabled="!permalink"
        @click="copyPermalink"
      >
        <span :class="$style.permalinkCopyReady">Copy</span>
        <span :class="$style.permalinkCopyDone">Copied!</span>
      </button>
      <p :class="$style.note">
        Note that permalinks are only available for L-systems from the predefined collections.
        Any manual changes in L-system parameters are not preserved.
      </p>
    </form>
  </section>
</template>

<style module>
  .fileControls {
    align-items: center;
    display: grid;
    gap: 20px 10px;
    grid-template-columns: 1fr 25% 25%;

    & h3 {
      font: inherit;
      grid-column: 1 / 2;
      margin: 0;
    }

    & .fileButton {
      --border-alpha: 0.3;
      border-color: rgb(from var(--color-accent) r g b / var(--border-alpha));
      border-radius: 5px;
      font: inherit;

      &:hover,
      &:focus-visible {
        --border-alpha: 0.6;
        background: none;
      }
    }
  }

  .permalinkField {
    box-sizing: border-box;
    height: 55px;
    margin-top: 10px;
    resize: vertical;
    width: 100%;
  }

  .permalinkCopyButton {
    margin: 5px 0;
    width: 100%;

    &.copySuccess {
      pointer-events: none;
    }

    &:not(.copySuccess) .permalinkCopyDone,
    &.copySuccess .permalinkCopyReady {
      display: none;
    }
  }

  .note {
    color: var(--color-on-surface-mid);
    font-size: 0.85em;
  }
</style>
