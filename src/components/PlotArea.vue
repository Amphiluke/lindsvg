<template>
  <div class="plot-area">
    <div v-html="$store.state.svgCode" /><!-- eslint-disable-line vue/no-v-html -->
  </div>
</template>

<script>
import {getSVGCode, getMultiPathSVGCode} from "lindsvg";
export default {
  name: "PlotArea",

  mounted() {
    this.$root.$on("plotLSystem", () => {
      let {axiom, alpha, theta, step, iterations, rules, attributes} = this.$store.state;
      let method = Object.values(attributes).some(attr => Array.isArray(attr)) ?
        getMultiPathSVGCode :
        getSVGCode;
      let svgCode = method({
        axiom,
        rules,
        alpha: alpha * Math.PI / 180,
        theta: theta * Math.PI / 180,
        iterations,
        step
      }, {
        padding: 2,
        pathAttributes: attributes
      });
      this.$store.commit("setSVGCode", {svgCode});
    });
  }
};
</script>

<style lang="less" scoped>
  .plot-area ::v-deep svg {
    left: calc(50% + var(--size-sidebar-button) / 2);
    max-height: 100vh;
    max-width: calc(100vw - var(--size-sidebar-button));
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
