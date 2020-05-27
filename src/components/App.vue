<template>
  <main
    id="app"
    class="app"
  >
    <PlotArea />
    <div class="sidebar">
      <div class="panel-buttons">
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'collections' }"
          @click="openedPanel = 'collections'"
        >
          Collections
        </button>
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'settings' }"
          @click="openedPanel = 'settings'"
        >
          Settings
        </button>
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'appearance' }"
          @click="openedPanel = 'appearance'"
        >
          Appearance
        </button>
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'exporting' }"
          @click="openedPanel = 'exporting'"
        >
          Exporting
        </button>
      </div>
      <PanelCollections v-show="openedPanel === 'collections'" />
      <PanelSettings v-show="openedPanel === 'settings'" />
      <PanelAppearance v-show="openedPanel === 'appearance'" />
      <PanelExporting v-show="openedPanel === 'exporting'" />
    </div>
  </main>
</template>

<script>
import PlotArea from "./PlotArea.vue";
import PanelCollections from "./PanelCollections.vue";
import PanelSettings from "./PanelSettings.vue";
import PanelAppearance from "./PanelAppearance.vue";
import PanelExporting from "./PanelExporting.vue";
export default {
  components: {
    PlotArea,
    PanelCollections,
    PanelSettings,
    PanelAppearance,
    PanelExporting
  },

  computed: {
    openedPanel: {
      get() {
        return this.$store.state.openedPanel;
      },
      set(panelId) {
        this.$store.commit("openPanel", {panelId});
      }
    }
  }
};
</script>

<style lang="less">
  @import "../styles/main";
</style>

<style lang="less" scoped>
  .sidebar {
    background: var(--color-gray-lighter);
    box-shadow: 1px 0 0 0 var(--color-gray-light);
    height: 100vh;
    left: 0;
    min-width: var(--size-sidebar-button);
    position: fixed;
    top: 0;

    ::v-deep .panel {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-left: var(--size-sidebar-button);
      max-height: 100%;
      padding: 0 10px 10px;
      width: var(--size-sidebar-panel);
    }
    ::v-deep .panel-title {
      flex-shrink: 0;
    }
  }

  .panel-buttons {
    box-shadow: 0 -1px 0 0 var(--color-gray-light);
    display: flex;
    height: var(--size-sidebar-button);
    left: 0;
    position: fixed;
    top: 0;
    transform: rotate(90deg) translateY(-100%);
    transform-origin: 0 0;
    width: 100vh;
  }

  .panel-button {
    background: none;
    border: none;
    padding: 0 10px;
    transform: rotate(180deg);
    &:hover,
    &.active {
      background: var(--color-gray-light);
    }
  }
</style>
