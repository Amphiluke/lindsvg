<script setup>
import {ref, computed, useCssModule} from "vue";
import {refDebounced} from "@vueuse/core";
import {useCollectionsStore, isUserDefined, USER_DEFINED_COLLECTION_ID} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let filter = ref("");
let debouncedFilter = refDebounced(filter, 300);
let filteredCollections = computed(() => {
  let query = debouncedFilter.value.toLowerCase();
  if (!query) {
    return collectionsStore.collections;
  }
  return collectionsStore.collections.map(({cid, items}) => ({
    cid,
    items: items.filter(({lid}) => lid.toLowerCase().includes(query)),
  }));
});

function plot(cid, lid) {
  if (cid !== collectionsStore.selectedCID || lid !== collectionsStore.selectedLID) {
    collectionsStore.selectedCID = cid;
    collectionsStore.selectedLID = lid;
    lSystemStore.setup(collectionsStore.selectedLSystem);
    lSystemStore.buildSVG();
  }
}

function explore(cid, lid) {
  plot(cid, lid);
  interfaceStore.openedPanel = "settings";
}

function addLSystem() {
  let lid = window.prompt("Enter the name of a new L-system");
  if (!lid) {
    return;
  }
  collectionsStore.selectedCID = USER_DEFINED_COLLECTION_ID;
  collectionsStore.selectedLID = lid;
  lSystemStore.lid = lid;
}

function deleteLSystem(lid) {
  collectionsStore.deleteLSystem(lid);
}

let copiedClassName = useCssModule().copied;
async function copyPermalink(target, cid, lid) {
  let url = new URL(location.origin + location.pathname);
  url.searchParams.set("cid", cid);
  url.searchParams.set("lid", lid);
  await navigator.clipboard.writeText(url.toString());
  target.classList.add(copiedClassName);
  setTimeout(() => {
    target.classList.remove(copiedClassName);
  }, 2000);
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Collections
    </h2>
    <form
      action="#"
      :class="$style.filterForm"
      @submit.prevent
    >
      <label :class="[$style.filterLabel, {[$style.filterApplied]: !!filter}]">
        <input
          v-model="filter"
          type="search"
          autocapitalize="off"
          :class="$style.filterField"
          placeholder="Search the collections…"
        >
      </label>
    </form>
    <ul :class="[panelStyles.body, $style.collections, interfaceStyles.thinScroll]">
      <li
        v-for="{cid, items} of filteredCollections"
        v-show="!filter || items.length > 0"
        :key="cid"
      >
        <button
          v-if="isUserDefined(cid)"
          type="button"
          :class="[$style.addLSystemButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
          title="Add a new L-system…"
          @click="addLSystem"
        />
        <h3 :class="$style.collectionName">
          {{ cid }}
        </h3>
        <ul :class="$style.collectionItems">
          <li
            v-for="{lid} of items"
            :key="lid"
            :class="{[$style.active]: cid === collectionsStore.selectedCID && lid === collectionsStore.selectedLID}"
          >
            <span
              :class="$style.collectionItemName"
              @click="plot(cid, lid)"
            >
              {{ lid }}
            </span>
            <button
              v-if="isUserDefined(cid)"
              type="button"
              tabindex="-1"
              :class="[$style.deleteLSystemButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
              title="Delete this L-system"
              @click="deleteLSystem(lid)"
            />
            <button
              v-else
              type="button"
              tabindex="-1"
              :class="[$style.permalinkButton, interfaceStyles.iconButton, interfaceStyles.iconButtonLink]"
              title="Copy L-system permalink"
              @click="({target}) => copyPermalink(target, cid, lid)"
            />
            <button
              type="button"
              :class="[$style.exploreButton, interfaceStyles.iconButton, interfaceStyles.iconButtonConfig]"
              title="Edit this L-system’s parameters"
              @focus="plot(cid, lid)"
              @click="explore(cid, lid)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<style module>
  .filterForm {
    flex-shrink: 0;
    margin-bottom: 15px;
    padding: 0 10px;
  }

  .filterLabel {
    align-items: center;
    display: flex;

    &::after {
      background-color: var(--color-accent);
      content: "";
      flex-shrink: 0;
      height: 25px;
      -webkit-mask: url(../assets/icons.svg) -100px 0 no-repeat;
      mask: url(../assets/icons.svg) -100px 0 no-repeat;
      width: 25px;
    }

    &:not(:focus-within):not(.filterApplied)::after {
      opacity: 0.5;
    }
  }

  .filterField {
    -webkit-appearance: none; /* fixes border-radius issue in Safari */
    box-sizing: border-box;
    flex-grow: 1;
    min-width: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .collections {
    list-style: none;
    padding: 0 4px 0 0;
  }

  .collectionItems {
    list-style: none;
    padding: 0;
  }

  .addLSystemButton {
    float: right;
    margin-top: 12px;
    position: sticky;
    top: 12;
    z-index: 2;
  }

  .collectionName {
    background: var(--color-surface);
    box-shadow: 0 4px 7px 2px var(--color-surface), 0 -1px 0 0 var(--color-surface);
    margin-block: 0 8px;
    padding-block: 13px 5px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .collectionItems li {
    align-items: center;
    display: flex;

    &:hover,
    &.active {
      background: var(--color-on-surface-low);
    }
  }

  .collectionItemName {
    cursor: default;
    flex-grow: 1;
    overflow: hidden;
    padding: 5px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .permalinkButton,
  .exploreButton,
  .deleteLSystemButton {
    flex-shrink: 0;
  }

  .collectionItems li:not(:hover, .active) :where(.permalinkButton, .exploreButton, .deleteLSystemButton):not(:focus) {
    opacity: 0.01;
  }

  .copied {
    pointer-events: none;

    &::before {
      --mask-pos: -200px 0;
    }
  }
</style>
