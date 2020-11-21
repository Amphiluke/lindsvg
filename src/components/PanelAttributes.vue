<template>
  <section class="panel panel-attributes">
    <h2 class="panel-title">
      Attributes
    </h2>
    <form
      action="#"
      autocomplete="off"
      class="panel-body thin-scroll"
      @submit.prevent="plot"
    >
      <div
        v-for="(values, name) in $store.state.attributes"
        :key="name"
        class="attribute-row"
      >
        <label class="attribute-item">
          {{ name }}
          <textarea
            autocapitalize="off"
            class="attribute-values thin-scroll"
            :value="[values].flat().join('\n')"
            @change="setAttribute(name, $event.target.value)"
          />
        </label>
        <button
          type="button"
          class="unset-attribute-button icon-button icon-button-delete"
          title="Delete this attribute"
          @click="unsetAttribute(name)"
        />
      </div>

      <hr>

      <div class="add-attribute-row">
        <h3>Add a new attribute</h3>
        <div class="attribute-item">
          <div class="new-attribute-name">
            <label class="labeled-field">
              <input
                v-model="newAttributeName"
                autocapitalize="off"
                type="text"
                placeholder="Enter attribute name…"
              >
            </label>
            <label class="attribute-list-ctrl">
              <select
                class="attribute-list"
                title="Select attribute"
                @change="newAttributeName = $event.target.value"
              >
                <optgroup
                  v-for="(attributeList, group) in attributes"
                  :key="group"
                  :label="group"
                >
                  <option
                    v-for="attribute in attributeList"
                    :key="attribute"
                    :value="attribute"
                    :disabled="$store.state.attributes.hasOwnProperty(attribute)"
                  >
                    {{ attribute }}
                  </option>
                </optgroup>
              </select>
            </label>
            <button
              type="button"
              class="add-attribute-button icon-button icon-button-add"
              title="Add a new attribute"
              :disabled="!newAttributeName"
              @click="addNewAttribute"
            />
          </div>
          <textarea
            v-model="newAttributeValue"
            autocapitalize="off"
            class="attribute-values thin-scroll"
            placeholder="Enter attribute value(s)"
          />
        </div>
      </div>

      <div class="form-buttons">
        <button
          type="button"
          class="configure-button"
          @click="goConfiguring"
        >
          Settings…
        </button>
        <button
          type="submit"
          class="plot-button"
        >
          Plot
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import {LS_SET_ATTRIBUTE, LS_UNSET_ATTRIBUTE, OPEN_PANEL} from "../store/mutation-types.js";

export default {
  name: "PanelAttributes",

  data: () => ({
    newAttributeName: "",
    newAttributeValue: "",
    attributes: {
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation
      "Presentation Attributes": [
        "alignment-baseline",
        "baseline-shift",
        "clip",
        "clip-path",
        "clip-rule",
        "color",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "cursor",
        "direction",
        "display",
        "dominant-baseline",
        "enable-background",
        "fill",
        "fill-opacity",
        "fill-rule",
        "filter",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "image-rendering",
        "kerning",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "mask",
        "opacity",
        "overflow",
        "pathLength",
        "pointer-events",
        "shape-rendering",
        "solid-color",
        "solid-opacity",
        "stop-color",
        "stop-opacity",
        "stroke",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "transform",
        "unicode-bidi",
        "vector-effect",
        "visibility",
        "word-spacing",
        "writing-mode"
      ],

      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Core
      "Core Attributes": [
        "id",
        "lang",
        "tabindex",
        "xml:base",
        "xml:lang",
        "xml:space"
      ],

      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Styling
      "Styling Attributes": [
        "class",
        "style"
      ],

      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Conditional_Processing
      "Conditional Processing Attributes": [
        "externalResourcesRequired",
        "requiredExtensions",
        "requiredFeatures",
        "systemLanguage"
      ]
    }
  }),

  methods: {
    setAttribute(name, value) {
      value = value.trim().split(/\r?\n/);
      if (value.length === 1) {
        value = value[0];
      }
      this.$store.commit(LS_SET_ATTRIBUTE, {name, value});
    },

    unsetAttribute(name) {
      this.$store.commit(LS_UNSET_ATTRIBUTE, {name});
    },

    addNewAttribute() {
      this.setAttribute(this.newAttributeName, this.newAttributeValue);
      this.newAttributeName = this.newAttributeValue = "";
    },

    plot() {
      this.$root.$emit("plot-l-system");
    },

    goConfiguring() {
      this.$store.commit(OPEN_PANEL, {panelId: "settings"});
    }
  }
};
</script>

<style lang="less" scoped>
  .attribute-row {
    position: relative;
    + .attribute-row {
      margin-top: 10px;
    }
  }
  .attribute-item {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  .attribute-values {
    @line-height: 16px;
    align-self: flex-end;
    background: linear-gradient(0deg, transparent @line-height, fade(#fff, 40%) 0, fade(#fff, 40%) @line-height * 2);
    background-attachment: local;
    background-size: @line-height * 2 @line-height * 2;
    border: none;
    box-sizing: border-box;
    font-size: 13px;
    line-height: @line-height;
    height: @line-height * 5;
    margin: 10px 0;
    padding: 0 10px;
    resize: vertical;
    width: calc(100% - 10px);
  }
  .unset-attribute-button {
    right: 0;
    opacity: 0.5;
    position: absolute;
    top: 0.5em;
    transform: translateY(-50%);
    &:hover {
      opacity: 1;
    }
  }
  .new-attribute-name {
    display: flex;
    .labeled-field {
      flex-grow: 1;
    }
    input[type="text"] {
      text-align: left;
    }
  }
  .attribute-list-ctrl {
    display: flex;
    flex-shrink: 0;
    position: relative;
    &::before {
      background: url(images/icons.svg) -150px 0 no-repeat;
      content: "";
      height: 25px;
      left: 50%;
      opacity: 0.5;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
    }
    &:hover::before,
    &:focus-within::before {
      opacity: 1;
    }
  }
  .attribute-list {
    cursor: pointer;
    opacity: 0.01;
    width: 32px;
  }
  .add-attribute-button {
    flex-shrink: 0;
    &:disabled {
      opacity: 0.5;
    }
  }
  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .plot-button,
  .configure-button {
    box-sizing: border-box;
    width: calc(50% - 5px);
  }
</style>
