<script setup>
import {ref, useTemplateRef} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

const SUPPORTS_LIGHT_DISMISS = "closedBy" in window.HTMLDialogElement.prototype;

let openBtnRef = useTemplateRef("openBtn");
let dropdownRef = useTemplateRef("dropdown");

let dropdownPos = ref({top: 0, right: 0});
function toggleHandler({newState}) {
  if (newState === "closed") {
    return;
  }
  let btnRect = openBtnRef.value.getBoundingClientRect();
  dropdownPos.value = {
    top: btnRect.top + btnRect.height + 5,
    right: document.documentElement.clientWidth - btnRect.right,
  };
}
</script>

<template>
  <div>
    <button
      ref="openBtn"
      type="button"
      title="Click for more options"
      :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonMore, $style.openBtn]"
      @click="dropdownRef.showModal()"
    />
    <dialog
      ref="dropdown"
      closedby="any"
      :class="$style.dropdown"
      @toggle="toggleHandler"
      @click="dropdownRef.close()"
    >
      <menu :class="$style.menu">
        <li :hidden="interfaceStore.openedPanel !== 'collections'">
          <button
            type="button"
            @click="interfaceStore.isLeafToolbarOpen = true"
          >
            Detach panel to a toolbar
          </button>
        </li>
        <li :hidden="interfaceStore.openedPanel !== 'settings'">
          <button
            type="button"
            @click="lSystemStore.addSubLSystem()"
          >
            Add sub-L-system
          </button>
        </li>
        <li :hidden="interfaceStore.openedPanel !== 'settings'">
          <button
            type="button"
            @click="lSystemStore.cloneSubLSystem()"
          >
            Clone sub-L-system
          </button>
        </li>
        <li :hidden="interfaceStore.openedPanel !== 'settings' || lSystemStore.params.length <= 1">
          <button
            type="button"
            @click="lSystemStore.deleteSubLSystem()"
          >
            Delete sub-L-system
          </button>
        </li>
        <li
          :hidden="!['settings', 'attributes'].includes(interfaceStore.openedPanel) || !lSystemStore.hasPrevSubLSystem"
          :class="$style.separatedItem"
        >
          <button
            type="button"
            @click="lSystemStore.selectPrevSubLSystem()"
          >
            Previous sub-L-system
          </button>
        </li>
        <li
          :hidden="!['settings', 'attributes'].includes(interfaceStore.openedPanel) || !lSystemStore.hasNextSubLSystem"
          :class="{[$style.separatedItem]: !lSystemStore.hasPrevSubLSystem}"
        >
          <button
            type="button"
            @click="lSystemStore.selectNextSubLSystem()"
          >
            Next sub-L-system
          </button>
        </li>
        <li :class="$style.separatedItem">
          <button
            type="button"
            @click="interfaceStore.openedPanel = ''"
          >
            Hide sidebar
          </button>
        </li>
        <li v-if="!SUPPORTS_LIGHT_DISMISS">
          <button type="button">
            Dismiss
          </button>
        </li>
      </menu>
    </dialog>
  </div>
</template>

<style module>
.openBtn:not(:hover) {
  opacity: 0.7;
}

.dropdown {
  background: var(--color-surface);
  border: 1px solid var(--color-on-surface-mid);
  box-shadow: 1px 1px 3px 0 var(--color-surface-shadow);
  inset: calc(v-bind("dropdownPos.top") * 1px) calc(v-bind("dropdownPos.right") * 1px) auto auto;
  padding: 0;

  &::backdrop {
    background: #0000;
  }
}

.menu {
  margin: 0;
  padding: 2px;

  button {
    background: none;
    border: none;
    border-radius: 0;
    display: block;
    padding: 0.4em 0.6em;
    text-align: start;
    width: 100%;

    &:hover,
    &:focus-visible {
      background: var(--color-on-surface-low);
    }
  }
}

:where(.menu li:not([hidden])) ~ .separatedItem::before {
  background: var(--color-on-surface-mid);
  content: "";
  display: block;
  height: 1px;
  margin-block: 2px;
}
</style>
