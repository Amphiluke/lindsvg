<script setup>
import {computed} from "vue";
import {useCollectionsStore} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let selectedLS = computed({
  get: () => ({
    cid: collectionsStore.selectedCID,
    lid: collectionsStore.selectedLID,
  }),
  set: ({cid, lid}) => {
    if (cid !== collectionsStore.selectedCID || lid !== collectionsStore.selectedLID) {
      collectionsStore.selectedCID = cid;
      collectionsStore.selectedLID = lid;
      lSystemStore.setup(collectionsStore.selectedLSystem);
      lSystemStore.buildSVG();
    }
  },
});

let lsList = computed(() => collectionsStore.collections
  .map(({cid, items}) => items.map(({lid}) => ({cid, lid})))
  .flat());

let selectedIndex = computed({
  get: () => lsList.value.findIndex(({cid, lid}) => cid === selectedLS.value.cid && lid === selectedLS.value.lid),
  set: (index) => {
    selectedLS.value = lsList.value[index];
  },
});
</script>

<template>
  <form
    v-show="interfaceStore.isLeafToolbarOpen"
    action="#"
    autocomplete="off"
    :class="$style.leafToolbar"
    @submit.prevent
  >
    <button
      :class="[
        $style.button,
        interfaceStyles.iconButton,
        interfaceStyles.iconButtonConfig,
        {[$style.hidden]: !selectedLS.lid || interfaceStore.openedPanel === 'settings'}
      ]"
      title="Edit this L-system’s parameters"
      @click="interfaceStore.openedPanel = 'settings'"
    />
    <select
      v-model="selectedLS"
      :class="$style.lSystems"
    >
      <template
        v-for="({cid, items}) of collectionsStore.collections"
        :key="cid"
      >
        <optgroup
          v-if="!!items.length"
          :label="cid"
        >
          <option
            v-for="({lid}) of items"
            :key="cid + lid"
            :value="{cid, lid}"
          >
            {{ lid }}
          </option>
        </optgroup>
      </template>
    </select>
    <button
      type="button"
      :class="[$style.button, interfaceStyles.iconButton, interfaceStyles.iconButtonUp]"
      :disabled="selectedIndex <= 0"
      title="Previous L-system"
      @click="selectedIndex -= 1"
    />
    <button
      type="button"
      :class="[$style.button, interfaceStyles.iconButton, interfaceStyles.iconButtonDown]"
      :disabled="selectedIndex >= lsList.length - 1"
      title="Next L-system"
      @click="selectedIndex += 1"
    />
  </form>
</template>

<style module>
  .leafToolbar {
    align-items: center;
    display: flex;
    gap: 5px;
    justify-content: center;
    min-width: 0;
    padding-left: var(--size-sidebar-button);
    padding-top: 0.6rem;
    position: relative;
  }

  .lSystems {
    color: var(--color-on-surface-high);
    flex: 1 1 0;
    max-width: max-content;
    min-width: 0;
  }

  .button[disabled] {
    opacity: 0.5;
  }

  .hidden {
    visibility: hidden;
  }
</style>
