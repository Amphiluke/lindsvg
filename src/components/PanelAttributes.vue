<script setup>
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import PanelAttributesSheet from "./PanelAttributesSheet.vue";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

function plot() {
  lSystemStore.buildSVG();
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Attributes
    </h2>
    <form
      action="#"
      autocomplete="off"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent="plot"
    >
      <div :class="panelStyles.formSlider">
        <PanelAttributesSheet
          v-for="index of lSystemStore.attributes.length"
          :key="index"
          :ls-index="index - 1"
          :class="panelStyles.sheet"
        />
      </div>

      <div :class="$style.formButtons">
        <button
          type="button"
          :class="[interfaceStyles.button, $style.configureButton]"
          @click="interfaceStore.openedPanel = 'settings'"
        >
          Settings
        </button>
        <button
          type="submit"
          :class="[interfaceStyles.button, $style.plotButton]"
        >
          Plot
        </button>
      </div>
    </form>
  </section>
</template>

<style module>
.formButtons {
  background: linear-gradient(0deg, var(--color-surface) 50%, rgb(from var(--color-surface) r g b / 0));
  bottom: 0;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding-block: 15px 5px;
  position: sticky;

  @supports not (color: rgb(from red r g b / 0)) {
    background: var(--color-surface);
  }
}

.plotButton,
.configureButton {
  flex: 1 0 0;
}
</style>
