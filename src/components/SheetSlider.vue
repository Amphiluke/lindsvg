<script setup>
import {ref, useTemplateRef, watch, nextTick} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let sheetsRef = useTemplateRef("sheets");
let sheetIndex = ref(0);
const SHEET_GAP = 20;

function updateSheetIndex() {
  sheetIndex.value = Math.round(sheetsRef.value.scrollLeft / (sheetsRef.value.offsetWidth + SHEET_GAP));
}

function scrollSheets(delta) {
  sheetsRef.value?.children[sheetIndex.value + delta]?.scrollIntoView({behavior: "smooth", container: "nearest"});
}

async function addSubLSystem() {
  lSystemStore.addSubLSystem();
  await nextTick();
  sheetsRef.value?.lastElementChild.scrollIntoView({behavior: "smooth", container: "nearest"});
}

function deleteSubLSystem() {
  lSystemStore.deleteSubLSystem(sheetIndex.value);
}

watch(() => lSystemStore.lid, () => sheetsRef.value?.scrollTo({left: 0}));
</script>

<template>
  <div>
    <div :class="$style.toolbar">
      <button
        type="button"
        :disabled="sheetIndex < 1"
        title="Previous sheet"
        :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonLeft]"
        @click="scrollSheets(-1)"
      />
      <button
        type="button"
        :disabled="sheetIndex >= lSystemStore.params.length - 1"
        title="Next sheet"
        :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonRight]"
        @click="scrollSheets(1)"
      />
      <div
        v-if="lSystemStore.params.length > 1"
        :class="$style.markers"
      >
        <div
          v-for="index of lSystemStore.params.length"
          :key="index"
          :class="{[$style.current]: index === sheetIndex + 1}"
        />
      </div>
      <div v-else />
      <button
        v-if="interfaceStore.openedPanel === 'settings'"
        type="button"
        title="Add sub-L-system"
        :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
        @click="addSubLSystem"
      />
      <button
        v-if="interfaceStore.openedPanel === 'settings'"
        type="button"
        :disabled="lSystemStore.params.length < 2"
        title="Delete sub-L-system"
        :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
        @click="deleteSubLSystem"
      />
    </div>

    <hr :class="$style.separator">

    <div
      ref="sheets"
      :class="$style.sheets"
      @scrollend="updateSheetIndex"
    >
      <slot />
    </div>
  </div>
</template>

<style module>
.toolbar {
  align-items: center;
  display: grid;
  grid-template-columns: 25px 25px 1fr 25px 25px;

  button {
    width: 25px;
  }
}

.separator {
  margin: 0.5em auto;
  width: 55%;
}

.markers {
  display: flex;
  gap: 3px;
  justify-content: safe center;
  min-width: 0;
  overflow: clip;

  > div {
    background: var(--color-on-surface-mid);
    border-radius: 50%;
    flex-shrink: 0;
    height: 5px;
    width: 5px;
  }

  .current {
    background: var(--color-on-surface-high);
  }
}

.sheets {
  display: flex;
  gap: 20px; /* SHEET_GAP */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;

  > * {
    border: none;
    flex: 0 0 100%;
    margin: 0;
    min-width: 0;
    padding: 0;
    scroll-snap-align: start;
  }
}
</style>
