<script setup>
import {useCssModule} from "vue";
import {useFileDialog} from "@vueuse/core";
import {useCollectionsStore} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import {useExport} from "../composables/export.mjs";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let fileDialog = useFileDialog({accept: ".lsvg", multiple: false, reset: true});
fileDialog.onChange(async (files) => {
  try {
    if (!files?.length) { // it might be reset
      return;
    }
    let config = JSON.parse(await files[0].text());
    lSystemStore.setup(config);
    lSystemStore.buildSVG();
  } catch (error) {
    interfaceStore.requestPopover({text: "Unfortunately, this file cannot be opened"});
    console.error("Unable to open the file", error);
  }
});

let {canExport, canShare, copyToClipboard, launchShare, urls: exportURLs} = useExport();

let copiedClassName = useCssModule().copied;
function copy(target, type) {
  copyToClipboard(type);
  target.classList.add(copiedClassName);
  setTimeout(() => target.classList.remove(copiedClassName), 2000);
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
        <h3>Open file:</h3>
        <button
          type="button"
          :class="[interfaceStyles.button, $style.fileButton]"
          @click="fileDialog.open"
        >
          LSVG
        </button>

        <h3>Save file:</h3>
        <a
          v-for="(urlRef, type) of exportURLs"
          :key="type"
          :href="urlRef.value"
          :class="[interfaceStyles.button, $style.fileButton]"
          :download="`${collectionsStore.selectedLID || 'l-system'}.${type}`"
          :aria-disabled="canExport ? null : 'true'"
        >
          {{ type.toUpperCase() }}
        </a>

        <h3>Copy file:</h3>
        <button
          v-for="type of Object.keys(exportURLs)"
          :id="`copy-${type}`"
          :key="type"
          type="button"
          :disabled="!canExport"
          :class="[interfaceStyles.button, $style.fileButton]"
          @click="({target}) => copy(target, type)"
        >
          {{ type.toUpperCase() }}
        </button>

        <template v-if="canShare">
          <h3 :class="$style.shareTitle">
            Share file:
          </h3>
          <button
            v-for="type of ['svg', 'png']"
            :key="type"
            type="button"
            :disabled="!canExport"
            :class="[interfaceStyles.button, $style.fileButton]"
            @click="launchShare(type)"
          >
            {{ type.toUpperCase() }}
          </button>
        </template>
      </div>

      <hr>

      <h3>Creating shareable permalink for an L-system</h3>
      <!-- eslint-disable vue/max-attributes-per-line -->
      <ol :class="interfaceStyles.list">
        <li><a href="https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists#creating-a-gist" target="_blank" rel="noopener">Create</a> a <em>public</em> gist on GitHub.</li>
        <li>
          <label for="copy-lsvg" :class="$style.copyLabel">Copy LSVG file content</label> into the newly created public gist and save it as JSON.
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
  gap: 15px 8px;
  grid-template-columns: 1fr 19% 19% 19%;

  h3 {
    font: inherit;
    grid-column: 1 / 2;
    margin: 0;
  }

  .shareTitle {
    grid-column: 1 / 3;
  }

  .fileButton {
    --border-alpha: 0.3;
    border-color: rgb(from var(--color-accent) r g b / var(--border-alpha));
    border-radius: 5px;
    font: inherit;
    font-size: 0.9em;
    
    &:hover,
    &:focus-visible {
      background: none;
    }

    &:not(:disabled, [aria-disabled="true"]):is(:hover, :focus-visible) {
      --border-alpha: 0.6;
    }

    &[aria-disabled="true"] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.copyLabel {
  cursor: pointer;
  text-decoration: 1px underline dashed;
  text-underline-offset: 0.25em;
}

.copied {
  color: transparent;
  pointer-events: none;
  position: relative;
  user-select: none;

  &::before {
    background-color: var(--color-accent);
    content: "";
    height: 18px;
    left: 50%;
    -webkit-mask: url(../assets/icons.svg) -204px -4px no-repeat;
    mask: url(../assets/icons.svg) -204px -4px no-repeat;
    position: absolute;
    top: 50%;
    translate: -50% -50%;
    width: 18px;
  }
}

.permalink {
  color: var(--color-accent);
  word-wrap: break-word;
}
</style>
