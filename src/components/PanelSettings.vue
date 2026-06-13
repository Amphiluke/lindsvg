<script setup>
import {useTemplateRef} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import {useFormNavigator} from "../composables/form-navigator.mjs";
import SheetsSlider from "./SheetsSlider.vue";
import SheetSettings from "./SheetSettings.vue";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

useFormNavigator(useTemplateRef("form"));

function plot() {
  lSystemStore.buildSVG();
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Settings
    </h2>
    <form
      ref="form"
      action="#"
      autocomplete="off"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent="plot"
    >
      <SheetsSlider>
        <SheetSettings
          v-for="index of lSystemStore.params.length"
          :key="index"
          :ls-index="index - 1"
        />
      </SheetsSlider>

      <div :class="$style.formButtons">
        <button
          type="button"
          :class="[$style.styleButton, interfaceStyles.button]"
          @click="interfaceStore.openedPanel = 'attributes'"
        >
          Style
        </button>
        <button
          type="submit"
          :class="[$style.plotButton, interfaceStyles.button]"
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
.styleButton {
  flex: 1 0 0;
}
</style>
