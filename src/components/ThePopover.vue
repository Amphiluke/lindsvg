<script setup>
import {storeToRefs} from "pinia";
import {useInterfaceStore, POPOVER_ACCEPT, POPOVER_DISMISS} from "../stores/interface.mjs";

let {popover} = storeToRefs(useInterfaceStore());
</script>

<template>
  <aside
    v-show="!!popover.uid"
    :class="[$style.popover, {[$style.acceptable]: !!popover.button}]"
  >
    <p>{{ popover.text }}</p>
    <button
      v-if="!!popover.button"
      type="button"
      :class="$style.button"
      @click="popover.resolve(POPOVER_ACCEPT)"
    >
      {{ popover.button }}
    </button>
    <button
      type="button"
      :class="$style.button"
      @click="popover.resolve(POPOVER_DISMISS)"
    >
      Dismiss
    </button>
  </aside>
</template>

<style module>
.popover {
  background: var(--color-surface);
  border-radius: 8px;
  bottom: 15px;
  box-shadow: 0 0 3px 0 var(--color-surface-shadow);
  box-sizing: border-box;
  display: grid;
  gap: 5px 20px;
  grid-template-columns: 1fr auto;
  max-width: 500px;
  padding: 5px 20px;
  right: 15px;
  position: fixed;
  width: calc(100% - 30px - var(--size-sidebar-button));
}

.acceptable {
  grid-template-columns: 1fr auto auto;

  @media (max-width: 450px) {
    grid-template-columns: 1fr auto;

    :first-child {
      grid-row: 1 / 3;
    }
  }
}

.button {
  background: none;
  border: none;
  color: var(--color-accent);
  font-weight: bold;
  padding: 0;
}
</style>
