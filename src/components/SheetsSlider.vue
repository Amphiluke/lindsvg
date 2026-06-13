<script setup>
import {ref, useTemplateRef, watch, nextTick} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {SCROLL_BEHAVIOR} from "../stores/interface.mjs";

let lSystemStore = useLSystemStore();

let sheetsRef = useTemplateRef("sheets");
let sheetIndex = ref(0);
const SHEET_GAP = 20;

function updateSheetIndex() {
  sheetIndex.value = Math.round(sheetsRef.value.scrollLeft / (sheetsRef.value.offsetWidth + SHEET_GAP));
  if (sheetIndex.value !== lSystemStore.subLSystemIndex) {
    lSystemStore.selectNthSubLSystem(sheetIndex.value);
  }
}

watch(() => lSystemStore.subLSystemIndex, async (subLSystemIndex) => {
  if (subLSystemIndex !== sheetIndex.value) {
    await nextTick();
    sheetIndex.value = subLSystemIndex;
    sheetsRef.value?.children[subLSystemIndex]?.scrollIntoView({behavior: SCROLL_BEHAVIOR, container: "nearest"});
  }
});
</script>

<template>
  <div>
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
.markers {
  display: flex;
  gap: 3px;
  grid-column: 2;
  justify-content: safe center;
  margin-bottom: 1em;
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
