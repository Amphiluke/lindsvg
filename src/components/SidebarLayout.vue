<script setup>
import {useInterfaceStore} from "../stores/interface.mjs";
import DropdownButton from "./DropdownButton.vue";
import SidebarMenu from "./SidebarMenu.vue";
import PanelCollections from "./PanelCollections.vue";
import PanelSettings from "./PanelSettings.vue";
import PanelAttributes from "./PanelAttributes.vue";
import PanelSharing from "./PanelSharing.vue";
import PanelAbout from "./PanelAbout.vue";

let interfaceStore = useInterfaceStore();
</script>

<template>
  <div :class="$style.sidebar">
    <DropdownButton :class="$style.menuBtn">
      <SidebarMenu />
    </DropdownButton>
    <div :class="$style.buttons">
      <button
        v-for="name of ['collections', 'settings', 'attributes', 'sharing', 'about']"
        :key="name"
        type="button"
        :class="[$style.button, {[$style.active]: interfaceStore.openedPanel === name}]"
        @click="interfaceStore.togglePanel(name)"
      >
        {{ name }}
      </button>
    </div>
    <PanelCollections :class="{[$style.collapsed]: interfaceStore.openedPanel !== 'collections'}" />
    <PanelSettings :class="{[$style.collapsed]: interfaceStore.openedPanel !== 'settings'}" />
    <PanelAttributes :class="{[$style.collapsed]: interfaceStore.openedPanel !== 'attributes'}" />
    <PanelSharing :class="{[$style.collapsed]: interfaceStore.openedPanel !== 'sharing'}" />
    <PanelAbout :class="{[$style.collapsed]: interfaceStore.openedPanel !== 'about'}" />
  </div>
</template>

<style module>
.sidebar{
  background: var(--color-surface);
  box-shadow: 1px 0 3px 0 var(--color-surface-shadow);
  color: var(--color-on-surface-high);
  height: 100dvh;
  inset-inline-start: 0;
  min-width: var(--size-sidebar-button);
  position: fixed;
  top: 0;
}

.menuBtn {
  inset: 24px 10px auto auto;
  position: absolute;
}

.buttons {
  display: flex;
  height: var(--size-sidebar-button);
  inset-inline-start: 0;
  outline: 1px solid var(--color-on-surface-mid);
  position: fixed;
  top: 0;
  transform: rotate(90deg) translateY(-100%);
  transform-origin: 0 0;
  width: 100dvh;
}

.button {
  background: none;
  border: none;
  color: inherit;
  padding: 0 10px;
  rotate: 180deg;
  text-transform: capitalize;

  @media (max-height: 55ch) {
    padding: 0 6px;
  }
}

.button:hover,
.active {
  background: var(--color-on-surface-low);
}

.collapsed {
  position: absolute;
  visibility: hidden;
}
</style>
