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
    <button
      v-show="interfaceStore.openedPanel !== ''"
      type="button"
      :class="$style.collapse"
      title="Hide sidebar"
      @click="interfaceStore.openedPanel = ''"
    />
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

.collapse {
  background-color: var(--color-accent);
  border: none;
  height: 25px;
  -webkit-mask: url(../assets/icons.svg) -150px 0 no-repeat;
  mask: url(../assets/icons.svg) -150px 0 no-repeat;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;

  @media (hover) {
    &:not(:hover) {
      opacity: 0.7;
    }
  }
}

.buttons {
  box-shadow: 0 -1px 0 0 var(--color-on-surface-mid);
  display: flex;
  height: var(--size-sidebar-button);
  left: 0;
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
  text-transform: capitalize;
  transform: rotate(180deg);

  @media (max-height: 55ch) {
    padding: 0 6px;
  }
}

.button:hover,
.active {
  background: var(--color-on-surface-low);
}
</style>
