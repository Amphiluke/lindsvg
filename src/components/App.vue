<template>
  <main
    id="app"
    class="app"
  >
    <PlotArea />
    <div class="sidebar">
      <button
        v-show="openedPanel !== ''"
        class="btn sidebar-collapse"
        title="Hide sidebar"
        @click="openedPanel = ''"
      >
        «
      </button>
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
          :class="{ active: openedPanel === 'attributes' }"
          @click="openedPanel = 'attributes'"
        >
          Attributes
        </button>
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'exporting' }"
          @click="openedPanel = 'exporting'"
        >
          Exporting
        </button>
        <button
          class="panel-button"
          :class="{ active: openedPanel === 'about' }"
          @click="openedPanel = 'about'"
        >
          About
        </button>
      </div>
      <PanelCollections v-show="openedPanel === 'collections'" />
      <PanelSettings v-show="openedPanel === 'settings'" />
      <PanelAttributes v-show="openedPanel === 'attributes'" />
      <PanelExporting v-show="openedPanel === 'exporting'" />
      <PanelAbout v-show="openedPanel === 'about'" />
    </div>
  </main>
</template>

<script>
import PlotArea from "./PlotArea.vue";
import PanelCollections from "./PanelCollections.vue";
import PanelSettings from "./PanelSettings.vue";
import PanelAttributes from "./PanelAttributes.vue";
import PanelExporting from "./PanelExporting.vue";
import PanelAbout from "./PanelAbout.vue";
import {OPEN_PANEL, LS_SETUP_L_SYSTEM} from "../store/mutation-types.js";

export default {
  components: {
    PlotArea,
    PanelCollections,
    PanelSettings,
    PanelAttributes,
    PanelExporting,
    PanelAbout
  },

  computed: {
    openedPanel: {
      get() {
        return this.$store.state.openedPanel;
      },
      set(panelId) {
        this.$store.commit(OPEN_PANEL, {panelId});
      }
    }
  },

  mounted() {
    let searchParams = new URLSearchParams(location.search);
    let cid = searchParams.get("cid");
    let lid = searchParams.get("lid");
    if (cid && lid) {
      this.$store.commit(LS_SETUP_L_SYSTEM, {cid, lid});
      this.$root.$emit("plot-l-system");
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
    box-shadow: 1px 0 0 0 var(--color-gray-light), 0 1px 0 0 var(--color-gray-light) inset;
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
    ::v-deep .panel-body {
      flex-grow: 1;
      margin: 0;
      overflow: auto;
      padding-right: 4px; // increase the distance from a scrollbar
    }
  }

  .sidebar-collapse {
    height: 28px;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 28px;
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
    color: inherit;
    padding: 0 10px;
    transform: rotate(180deg);
    &:hover,
    &.active {
      background: var(--color-gray-light);
    }
    @media (max-height: 380px) {
      padding: 0 5px;
    }
  }
</style>
