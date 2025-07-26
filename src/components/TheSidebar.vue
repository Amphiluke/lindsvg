<script setup>
import {useInterfaceStore} from "../stores/interface.mjs";
import PanelCollections from "./PanelCollections.vue";
import PanelSettings from "./PanelSettings.vue";
import PanelAttributes from "./PanelAttributes.vue";
import PanelSharing from "./PanelSharing.vue";
import PanelAbout from "./PanelAbout.vue";

let interfaceStore = useInterfaceStore();
</script>

<template>
  <div :class="$style.sidebar">
    <div :class="$style.ctrlButtons">
      <button
        v-show="interfaceStore.openedPanel === 'collections'"
        type="button"
        :class="$style.toolbarButton"
        title="Detach panel to a toolbar"
        @click="interfaceStore.isLeafToolbarOpen = true"
      />
      <button
        v-show="interfaceStore.openedPanel !== ''"
        type="button"
        :class="$style.collapseButton"
        title="Hide sidebar"
        @click="interfaceStore.openedPanel = ''"
      />
    </div>
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
    <PanelCollections v-show="interfaceStore.openedPanel === 'collections'" />
    <PanelSettings v-show="interfaceStore.openedPanel === 'settings'" />
    <PanelAttributes v-show="interfaceStore.openedPanel === 'attributes'" />
    <PanelSharing v-show="interfaceStore.openedPanel === 'sharing'" />
    <PanelAbout v-show="interfaceStore.openedPanel === 'about'" />
  </div>
</template>

<style module>
.sidebar{
  background: var(--color-surface);
  box-shadow: 1px 0 3px 0 var(--color-surface-shadow);
  color: var(--color-on-surface-high);
  height: 100dvh;
  left: 0;
  min-width: var(--size-sidebar-button);
  position: fixed;
  top: 0;
}

.ctrlButtons {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.toolbarButton,
.collapseButton {
  background-color: var(--color-accent);
  border: none;
  height: 25px;
  -webkit-mask: url(../assets/icons.svg) var(--mask-pos) no-repeat;
  mask: url(../assets/icons.svg) var(--mask-pos) no-repeat;
  padding: 0;
  width: 25px;

  @media (hover) {
    &:not(:hover) {
      opacity: 0.7;
    }
  }
}

.toolbarButton {
  --mask-pos: -250px 0;
}

.collapseButton {
  --mask-pos: -150px 0;
}

.buttons {
  display: flex;
  height: var(--size-sidebar-button);
  left: 0;
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
</style>
