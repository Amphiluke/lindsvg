<script setup>
import {computed} from "vue";
import {useCollectionsStore} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import {useObjectUrl, useFileDialog, useShare} from "@vueuse/core";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

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

let lsvg = computed(() => ({
  _version: __PACKAGE_VERSION__,
  axiom: lSystemStore.axiom,
  alpha: lSystemStore.alpha,
  theta: lSystemStore.theta,
  step: lSystemStore.step,
  iterations: lSystemStore.iterations,
  rules: lSystemStore.rules,
  attributes: lSystemStore.attributes,
}));
let lsvgBlob = computed(() => new Blob([JSON.stringify(lsvg.value)], {type: "application/json"}));
let lsvgURL = useObjectUrl(lsvgBlob);

let {share, isSupported: isShareSupported} = useShare();
function launchShare() {
  share({
    title: "L-system",
    text: "Image of an L-system from the lindsvg app",
    files: [new File([svgBlob.value], "l-system.svg", {type: svgBlob.value.type})],
  });
}

function copyLSVG() {
  let text = JSON.stringify(lsvg.value, null, 2);
  navigator.clipboard.writeText(text);
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

        <template v-if="isShareSupported">
          <h3>Share file…</h3>
          <button
            type="button"
            :class="[interfaceStyles.button, $style.fileButton, $style.shareButton]"
            @click="launchShare"
          >
            SVG
          </button>
        </template>
      </div>

      <hr>

      <h3>Creating shareable permalink for an L-system</h3>
      <!-- eslint-disable vue/max-attributes-per-line -->
      <ol :class="interfaceStyles.list">
        <li><a href="https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists#creating-a-gist" target="_blank" rel="noopener">Create</a> a <em>public</em> gist on GitHub.</li>
        <li>
          Copy LSVG file content
          <svg
            :class="$style.copyButton"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            @click="copyLSVG"
          >
            <title>Copy LSVG to clipboard</title>
            <path d="M0 6.75C0 5.78.78 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .14.11.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
            <path d="M5 1.75C5 .78 5.78 0 6.75 0h7.5C15.22 0 16 .78 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .14.11.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
          </svg>
          into the newly created public gist and save it as JSON.
        </li>
        <li>
          Replace <b>{gist_id}</b> in the following hyperlink with the actual identifier of your gist<br>
          <span :class="$style.permalink">https://amphiluke.github.io/lindsvg/?gist=<b>{gist_id}</b></span>.
        </li>
      </ol>
      <p>Example: <a href="https://gist.github.com/Amphiluke/d90562f1aaf0f9ee28340c13ce13a6ca" target="_blank" rel="noopener">gist</a> &amp; <a href="https://amphiluke.github.io/lindsvg/?gist=d90562f1aaf0f9ee28340c13ce13a6ca" target="_blank">permalink</a>.</p>
      <!-- eslint-enable vue/max-attributes-per-line -->
    </form>
  </section>
</template>

<style module>
  .fileControls {
    align-items: center;
    display: grid;
    gap: 15px 10px;
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

    & .shareButton {
      grid-column: 3 / 4;
    }
  }

  .copyButton {
    cursor: pointer;
    fill: var(--color-accent);
    margin-inline: 4px;
  }

  .permalink {
    color: var(--color-accent);
    word-wrap: break-word;
  }
</style>
