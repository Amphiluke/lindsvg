<template>
  <section class="panel panel-collections">
    <h2 class="panel-title">
      Collections
    </h2>
    <ul class="collections thin-scroll">
      <li
        v-for="{cid, items} of collections"
        :key="cid"
      >
        <h3 class="collection-name">
          {{ cid }}
        </h3>
        <ul class="collection-items">
          <li
            v-for="{lid} of items"
            :key="lid"
            :class="{active: cid === $store.state.cid && lid === $store.state.lid}"
          >
            <span
              class="collection-item-name"
              @click="plot(cid, lid)"
            >
              {{ lid }}
            </span>
            <button
              type="button"
              class="explore-button icon-button icon-button-config"
              title="Edit this L-system’s parameters"
              @click="explore(cid, lid)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import bank from "../store/bank.js";
export default {
  name: "PanelCollections",

  computed: {
    collections: () => bank
  },

  methods: {
    plot(cid, lid) {
      this.$store.commit("setupLSystem", {cid, lid});
    },

    explore(cid, lid) {
      this.$store.commit("setupLSystem", {cid, lid});
      this.$store.commit("openPanel", {panelId: "settings"});
    }
  }
};
</script>

<style lang="less" scoped>
  .collections {
    flex-grow: 1;
    margin: 0;
    overflow: auto;
  }
  .collections,
  .collection-items {
    list-style: none;
    padding: 0;
  }
  .collection-name {
    background: var(--color-gray-lighter);
    box-shadow: 0 4px 7px 2px var(--color-gray-lighter);
    margin: 5px 0;
    position: sticky;
    top: 0;
  }
  .collection-items li {
    align-items: center;
    display: flex;
    padding: 3px 0 3px 10px;
    &:hover,
    &.active {
      background: var(--color-gray-light);
    }
  }
  .collection-item-name {
    flex-grow: 1;
    padding-right: 10px;
  }
  .explore-button {
    flex-shrink: 0;
  }
  @media (hover) {
    .explore-button {
      opacity: 0.5;
    }
    .collection-items li {
      &:hover,
      &.active {
        .explore-button {
          opacity: 1;
        }
      }
    }
  }
</style>
