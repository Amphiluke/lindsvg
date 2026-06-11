<script setup>
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import menuStyles from "../styles/menu.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();
</script>

<template>
  <menu :class="menuStyles.menu">
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
      :class="menuStyles.separatedItem"
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
      :class="{[menuStyles.separatedItem]: !lSystemStore.hasPrevSubLSystem}"
    >
      <button
        type="button"
        @click="lSystemStore.selectNextSubLSystem()"
      >
        Next sub-L-system
      </button>
    </li>
    <li :class="menuStyles.separatedItem">
      <button
        type="button"
        @click="interfaceStore.openedPanel = ''"
      >
        Hide sidebar
      </button>
    </li>
  </menu>
</template>
