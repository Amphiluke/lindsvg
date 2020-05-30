<template>
  <section
    v-once
    class="panel panel-about"
  >
    <h2 class="panel-title">
      About
    </h2>
    <div class="panel-body thin-scroll">
      <!-- eslint-disable vue/max-attributes-per-line -->
      <p>
        This web application is a simple SVG-based L-system plotter and manager designed to serve as a live demonstration for the <a href="https://github.com/Amphiluke/lindsvg" target="_blank">lindsvg</a> module which is used by the app under the hood.
      </p>
      <p>
        There are a few L-system collections built in the app for demonstration purposes. These L-systems were gathered from various sources including the web, books, and articles. I appreciate the authors of these L-systems (you may find their names <a href="https://github.com/Amphiluke/lindsvg/blob/gh-pages/src/store/bank.js" target="_blank">here</a>).
      </p>
      <h3>Links</h3>
      <ul>
        <li>
          <a href="https://codepen.io/collection/DVzqWb" target="_blank">Advanced examples</a>
        </li>
        <li>
          <a href="https://github.com/Amphiluke/lindsvg" target="_blank">The lindsvg module sources</a>
        </li>
        <li>
          <a href="https://github.com/Amphiluke/lindsvg/tree/gh-pages" target="_blank">The app sources</a>
        </li>
      </ul>
      <hr>
      <p>
        <small>&copy; 2020, Amphiluke</small>
      </p>
      <!-- eslint-enable vue/max-attributes-per-line -->
    </div>
  </section>
</template>

<script>
export default {
  name: "PanelAbout"
};
</script>
