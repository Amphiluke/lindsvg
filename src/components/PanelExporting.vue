<script setup>
import {computed, useCssModule} from "vue";
import {useCollectionsStore, isUserDefined} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useObjectUrl} from "@vueuse/core";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let cssModule = useCssModule();

let svgBlob = computed(() => new Blob([lSystemStore.svgCode], {type: "image/svg+xml"}));
let svgURL = useObjectUrl(svgBlob);

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
      Exporting
    </h2>
    <form
      action="#"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent
    >
      <p>
        <a
          :href="svgURL"
          :download="(collectionsStore.selectedLID || 'l-system') + '.svg'"
        >
          Download SVG…
        </a>
      </p>

      <hr>

      <label>
        <b>Permalink for the selected L-system</b><br>
        <textarea
          :class="$style.permalinkField"
          :value="permalink"
          readonly
          @click="$event.target.select()"
        />
      </label>
      <button
        :class="[interfaceStyles.button, $style.permalinkCopyButton]"
        :disabled="!permalink"
        @click="copyPermalink"
      >
        <span :class="$style.permalinkCopyReady">Copy</span>
        <span :class="$style.permalinkCopyDone">Copied!</span>
      </button>
      <small :class="$style.permalinkNote">
        Note that permalinks are only available for L-systems from the predefined collections.
        Any manual changes in an L-system parameters are ignored.
      </small>
    </form>
  </section>
</template>

<style module>
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

  .permalinkNote {
    color: var(--color-on-surface-mid);
  }
</style>
