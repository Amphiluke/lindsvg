<script setup>
import {ref, useTemplateRef, nextTick} from "vue";
import interfaceStyles from "../styles/interface.module.css";

let openBtnRef = useTemplateRef("openBtn");
let dropdownRef = useTemplateRef("dropdown");

let isDropdownRequested = ref(false);
let dropdownPos = ref({top: -1000, right: -1000});

async function requestDropdown() {
  isDropdownRequested.value = true;
  await nextTick();
  dropdownRef.value?.showModal();
}

function toggleHandler({newState}) {
  if (newState === "closed") {
    isDropdownRequested.value = false;
    return;
  }
  let btnRect = openBtnRef.value.getBoundingClientRect();
  let right = document.documentElement.clientWidth - btnRect.right;
  let top = btnRect.top + btnRect.height + 5;
  let height = dropdownRef.value.offsetHeight;
  if (top + height > document.documentElement.clientHeight) {
    top = btnRect.top - height - 5;
  }
  dropdownPos.value = {top, right};
}
</script>

<template>
  <button
    ref="openBtn"
    type="button"
    title="Click for more options"
    :class="[interfaceStyles.iconButton, interfaceStyles.iconButtonMore, $style.openBtn]"
    v-bind="$attrs"
    @click="requestDropdown"
  />
  <dialog
    v-if="isDropdownRequested"
    ref="dropdown"
    closedby="any"
    :class="$style.dropdown"
    @toggle="toggleHandler"
    @click="dropdownRef?.close()"
  >
    <slot />
  </dialog>
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
</style>
