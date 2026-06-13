<script setup>
import {nextTick} from "vue";
import {useCollectionsStore, isUserDefined, USER_DEFINED_COLLECTION_ID} from "../stores/collections.mjs";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import DropdownButton from "./DropdownButton.vue";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";
import menuStyles from "../styles/menu.module.css";

let collectionsStore = useCollectionsStore();
let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

function plot(cid, lid) {
  if (cid === collectionsStore.selectedCID && lid === collectionsStore.selectedLID) {
    return;
  }
  collectionsStore.selectedCID = cid;
  collectionsStore.selectedLID = lid;
  lSystemStore.setup(collectionsStore.selectedLSystem);
  lSystemStore.buildSVG();
}

async function addLSystem(isCloning = false) {
  let lid = window.prompt("Enter new L-system’s name");
  if (!lid) {
    return;
  }
  // Wait for the focus to restore on the currently active item after dialog closing (avoid mess with rendering)
  await new Promise((resolve) => setTimeout(resolve, 250));
  lSystemStore.setup(isCloning ? {...collectionsStore.selectedLSystem, lid} : {lid, params: []});
  collectionsStore.selectedCID = USER_DEFINED_COLLECTION_ID;
  collectionsStore.selectedLID = lid;
  await nextTick();
  let itemId = `${USER_DEFINED_COLLECTION_ID}::${lid}`;
  document.body.querySelector(`[data-collection-item-id="${itemId.replaceAll("\"", "\\\"")}"]`)?.focus();
  lSystemStore.buildSVG();
}

function copyPermalink(cid, lid) {
  let url = new URL(location.origin + location.pathname);
  url.searchParams.set("cid", cid);
  url.searchParams.set("lid", lid);
  navigator.clipboard.writeText(url.toString());
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
      <label :class="[$style.filterLabel, {[$style.filterApplied]: !!collectionsStore.lsFilter}]">
        <input
          v-model="collectionsStore.lsFilter"
          type="search"
          autocapitalize="off"
          :class="$style.filterField"
          placeholder="Search the collections…"
        >
      </label>
    </form>
    <ul :class="[panelStyles.body, $style.collections, interfaceStyles.thinScroll]">
      <li
        v-for="{cid, items} of collectionsStore.collections"
        :key="cid"
        :hidden="!!collectionsStore.mismatchingIds.size && items.every(({lid}) => collectionsStore.mismatchingIds.has(`${cid}::${lid}`))"
      >
        <button
          v-if="isUserDefined(cid)"
          type="button"
          :class="[$style.addLSystemButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd, interfaceStyles.iconButtonBreath]"
          title="Add a new L-system…"
          @click="addLSystem()"
        />
        <h3 :class="$style.collectionName">
          {{ cid }}
        </h3>
        <ul :class="$style.collectionItems">
          <li
            v-for="{lid} of items"
            :key="`${cid}::${lid}`"
            :hidden="collectionsStore.mismatchingIds.has(`${cid}::${lid}`)"
            :data-collection-item-id="`${cid}::${lid}`"
            tabindex="0"
            :class="{[$style.active]: cid === collectionsStore.selectedCID && lid === collectionsStore.selectedLID}"
            @focusin="plot(cid, lid)"
            @keyup.alt.down="({currentTarget}) => currentTarget.querySelector('button')?.click()"
          >
            <span :class="$style.collectionItemName">
              {{ lid }}
            </span>
            <DropdownButton
              :class="$style.menuBtn"
              tabindex="-1"
              title="Click for more options (Alt+Down)"
            >
              <menu :class="menuStyles.menu">
                <li v-if="isUserDefined(cid)">
                  <button
                    type="button"
                    @click="collectionsStore.deleteLSystem(lid)"
                  >
                    Delete L-system
                  </button>
                </li>
                <li v-else>
                  <button
                    type="button"
                    @click="copyPermalink(cid, lid)"
                  >
                    Copy L-system permalink
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="addLSystem(true)"
                  >
                    Clone L-system
                  </button>
                </li>
                <li :class="menuStyles.separatedItem">
                  <button
                    type="button"
                    @click="interfaceStore.openedPanel = 'settings'"
                  >
                    Edit L-system parameters
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="interfaceStore.openedPanel = 'attributes'"
                  >
                    Edit L-system styles
                  </button>
                </li>
              </menu>
            </DropdownButton>
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
  padding-inline: 0;
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
  float: inline-end;
  margin-top: 12px;
  position: sticky;
  top: 12px;
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

.collectionItems > li {
  align-items: center;
  display: flex;
  outline: none;

  &:hover,
  &:focus-within,
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

.menuBtn {
  flex-shrink: 0;
}

.collectionItems li:not(:hover, :focus-within, .active) .menuBtn {
  opacity: 0.01;
}
</style>
