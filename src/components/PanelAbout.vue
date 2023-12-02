<script setup>
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let appVersion = __PACKAGE_VERSION__;
</script>

<template>
  <section
    v-once
    :class="panelStyles.panel"
  >
    <h2 :class="panelStyles.title">
      About
    </h2>
    <div :class="[panelStyles.body, interfaceStyles.thinScroll]">
      <!-- eslint-disable vue/max-attributes-per-line -->
      <p>
        This web application is a simple SVG-based L-system plotter and manager designed to serve as a live demonstration for the <a href="https://github.com/Amphiluke/lindsvg" target="_blank" rel="noopener">lindsvg</a> module which is used by the app under the hood.
      </p>
      <p>
        There are a few L-system collections built in the app for demonstration purposes. These L-systems were gathered from various sources including the web, books, and articles. I appreciate the authors of these L-systems (you may find their names <a href="https://github.com/Amphiluke/lindsvg/blob/pwa/src/stores/bank.mjs" target="_blank" rel="noopener">in the app sources</a>).
      </p>
      <h3>Links</h3>
      <ul>
        <li>
          <a href="https://codepen.io/collection/DVzqWb" target="_blank" rel="noopener">Advanced examples</a>
        </li>
        <li>
          <a href="https://github.com/Amphiluke/lindsvg" target="_blank" rel="noopener">The lindsvg module sources</a>
        </li>
        <li>
          <a href="https://github.com/Amphiluke/lindsvg/tree/pwa" target="_blank" rel="noopener">The app sources</a>
        </li>
      </ul>
      <hr>
      <p :class="$style.metadata">
        <small>&copy; {{ new Date().getFullYear() }}, Amphiluke</small>
        <small>v{{ appVersion }}</small>
      </p>
      <!-- eslint-enable vue/max-attributes-per-line -->
    </div>
  </section>
</template>

<style module>
  .metadata {
    display: flex;
    justify-content: space-between;
  }
</style>
