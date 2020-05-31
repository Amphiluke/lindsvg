<template>
  <section class="panel panel-collections">
    <h2 class="panel-title">
      Collections
    </h2>
    <ul class="panel-body collections thin-scroll">
      <li
        v-for="{cid, items} of $store.state.bank"
        :key="cid"
      >
        <button
          v-if="$store.getters.isUserDefined(cid)"
          type="button"
          class="add-l-system-button icon-button icon-button-add"
          title="Add a new L-system…"
          @click="addLSystem"
        />
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
              v-if="$store.getters.isUserDefined(cid)"
              type="button"
              class="delete-l-system-button icon-button icon-button-delete"
              title="Delete this L-system"
              @click="deleteLSystem(lid)"
            />
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
import {LS_SETUP_L_SYSTEM, OPEN_PANEL, ADD_L_SYSTEM, DELETE_L_SYSTEM} from "../store/mutation-types.js";

export default {
  name: "PanelCollections",

  methods: {
    plot(cid, lid) {
      this.$store.commit(LS_SETUP_L_SYSTEM, {cid, lid});
      this.$root.$emit("plotLSystem");
    },

    explore(cid, lid) {
      this.$store.commit(LS_SETUP_L_SYSTEM, {cid, lid});
      this.$root.$emit("plotLSystem");
      this.$store.commit(OPEN_PANEL, {panelId: "settings"});
    },

    addLSystem() {
      let name = window.prompt("Enter the name for a new L-system");
      if (name) {
        this.$store.commit(ADD_L_SYSTEM, {lid: name});
        this.$store.commit(OPEN_PANEL, {panelId: "settings"});
      }
    },

    deleteLSystem(lid) {
      this.$store.commit(DELETE_L_SYSTEM, {lid});
    }
  }
};
</script>

<style lang="less" scoped>
  .collections,
  .collection-items {
    list-style: none;
    padding: 0;
  }
  .add-l-system-button {
    float: right;
    position: relative;
    z-index: 1;
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
    &:hover,
    &.active {
      background: var(--color-gray-light);
    }
  }
  .collection-item-name {
    cursor: default;
    flex-grow: 1;
    padding: 5px 10px;
  }
  .explore-button,
  .delete-l-system-button {
    flex-shrink: 0;
  }
  @media (hover) {
    .explore-button,
    .delete-l-system-button {
      opacity: 0.5;
    }
    .collection-items li {
      &:hover,
      &.active {
        .explore-button,
        .delete-l-system-button {
          opacity: 1;
        }
      }
    }
  }
</style>
