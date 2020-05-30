<template>
  <section class="panel panel-exporting">
    <h2 class="panel-title">
      Exporting
    </h2>
    <form
      action="#"
      class="panel-body thin-scroll"
      @submit.prevent
    >
      <p>
        <a
          :href="svgURL"
          :download="$store.state.lid + '.svg'"
        >
          Download SVG…
        </a>
      </p>

      <hr>

      <label>
        <b>Permalink for the selected L-system</b><br>
        <textarea
          class="permalink-field"
          :value="permalink"
          readonly
          @click="$event.target.select()"
        />
      </label>
      <button
        class="permalink-copy-button"
        :disabled="!permalink"
        @click="copyPermalink"
      >
        <span class="permalink-copy-ready">Copy</span>
        <span class="permalink-copy-done">Copied!</span>
      </button>
      <small class="permalink-note">
        Note that permalinks are only available for L-systems from the predefined collections.
        Any manual changes in an L-system parameters are ignored.
      </small>
    </form>
  </section>
</template>

<script>
export default {
  name: "PanelExporting",

  data: () => ({
    svgURL: "#"
  }),

  computed: {
    permalink() {
      let {cid, lid} = this.$store.state;
      if (!cid || !lid) {
        return "";
      }
      let {location} = window;
      let url = new URL(location.origin + location.pathname);
      url.searchParams.set("cid", cid);
      url.searchParams.set("lid", lid);
      return url.toString();
    }
  },

  mounted() {
    this.$root.$on("plotLSystem", () => {
      this.$nextTick(() => this.makeSVGURL());
    });
  },

  methods: {
    makeSVGURL() {
      URL.revokeObjectURL(this.svgURL);
      let blob = new Blob([this.$store.state.svgCode], {type: "image/svg+xml"});
      this.svgURL = URL.createObjectURL(blob);
    },

    copyPermalink({target}) {
      navigator.clipboard.writeText(this.permalink).then(() => {
        target.classList.add("copy-success");
        setTimeout(() => target.classList.remove("copy-success"), 4000);
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .permalink-field {
    box-sizing: border-box;
    height: 55px;
    margin-top: 10px;
    resize: vertical;
    width: 100%;
  }
  .permalink-copy-button {
    box-sizing: border-box;
    margin: 5px 0;
    width: 100%;
    &.copy-success {
      pointer-events: none;
    }
    &:not(.copy-success) .permalink-copy-done,
    &.copy-success .permalink-copy-ready {
      display: none;
    }
  }
  .permalink-note {
    color: var(--color-gray-normal);
  }
</style>
