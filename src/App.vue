<script setup>
import {onMounted} from "vue";
import {applyLaunchParams} from "./pwaCtrl.mjs";
import PlotArea from "./components/PlotArea.vue";
import TheSidebar from "./components/TheSidebar.vue";
import ThePopover from "./components/ThePopover.vue";

onMounted(() => applyLaunchParams());
</script>

<template>
  <div>
    <PlotArea />
    <TheSidebar />
    <ThePopover />
  </div>
</template>
