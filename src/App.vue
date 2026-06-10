<script setup>
import {onMounted} from "vue";
import {processLaunchOptions} from "./launchCtrl.mjs";
import PlotArea from "./components/PlotArea.vue";
import SidebarLayout from "./components/SidebarLayout.vue";
import LeafToolbar from "./components/LeafToolbar.vue";
import PopoverNotification from "./components/PopoverNotification.vue";

onMounted(() => processLaunchOptions());
</script>

<template>
  <div>
    <PlotArea />
    <LeafToolbar />
    <SidebarLayout />
    <PopoverNotification />
  </div>
</template>
