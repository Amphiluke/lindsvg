<script setup>
import {useLSystemStore} from "../stores/lSystem.mjs";

let lSystemStore = useLSystemStore();
</script>

<template>
  <div :class="$style.plotArea">
    <div v-html="lSystemStore.svgCode" /><!-- eslint-disable-line vue/no-v-html -->
  </div>
</template>

<style module>
.plotArea svg {
  left: calc(50% + var(--size-sidebar-button) / 2);
  max-height: calc(100dvh - 16px);
  max-width: calc(100dvw - var(--size-sidebar-button) - 16px);
  position: fixed;
  top: 50%;
  translate: -50% -50%;
}
</style>
