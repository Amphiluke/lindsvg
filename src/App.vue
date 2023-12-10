<script setup>
import {onMounted} from "vue";
import {processLaunchOptions} from "./launchCtrl.mjs";
import PlotArea from "./components/PlotArea.vue";
import TheSidebar from "./components/TheSidebar.vue";
import ThePopover from "./components/ThePopover.vue";

onMounted(() => processLaunchOptions());
</script>

<template>
  <div>
    <PlotArea />
    <TheSidebar />
    <ThePopover />
  </div>
</template>
