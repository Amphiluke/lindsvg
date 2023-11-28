<script setup>
import {ref} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let newAttributeName = ref("");
let newAttributeValue = ref("");
let attributes = {
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
    "writing-mode",
  ],

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Core
  "Core Attributes": [
    "id",
    "lang",
    "tabindex",
    "xml:base",
    "xml:lang",
    "xml:space",
  ],

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Styling
  "Styling Attributes": [
    "class",
    "style",
  ],

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Conditional_Processing
  "Conditional Processing Attributes": [
    "externalResourcesRequired",
    "requiredExtensions",
    "requiredFeatures",
    "systemLanguage",
  ],
};

function setAttribute(name, value) {
  value = value.trim().split(/\r?\n/);
  if (value.length === 1) {
    value = value[0];
  }
  lSystemStore.attributes[name] = value;
}

function unsetAttribute(name) {
  delete lSystemStore.attributes[name];
}

function addNewAttribute() {
  setAttribute(newAttributeName.value, newAttributeValue.value);
  newAttributeName.value = newAttributeValue.value = "";
}

function plot() {
  lSystemStore.buildSVG();
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Attributes
    </h2>
    <form
      action="#"
      autocomplete="off"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent="plot"
    >
      <div
        v-for="(values, name) of lSystemStore.attributes"
        :key="name"
        :class="$style.attributeRow"
      >
        <label :class="$style.attributeItem">
          {{ name }}
          <textarea
            autocapitalize="off"
            :class="[$style.attributeValues, interfaceStyles.thinScroll]"
            :value="[values].flat().join('\n')"
            @change="setAttribute(name, $event.target.value)"
          />
        </label>
        <button
          type="button"
          :class="[$style.unsetAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
          title="Delete this attribute"
          @click="unsetAttribute(name)"
        />
      </div>

      <hr v-if="Object.keys(lSystemStore.attributes).length > 0">

      <div :class="$style.addAttributeRow">
        <h3>Add a new attribute</h3>
        <div :class="$style.attributeItem">
          <div :class="$style.newAttributeName">
            <label :class="$style.attributeListCtrl">
              <select
                :class="$style.attributeList"
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
                    :disabled="Object.hasOwn(lSystemStore.attributes, attribute)"
                  >
                    {{ attribute }}
                  </option>
                </optgroup>
              </select>
            </label>
            <label :class="[interfaceStyles.labeledField, $style.labeledField]">
              <input
                v-model="newAttributeName"
                autocapitalize="off"
                type="text"
                placeholder="Enter attribute name…"
              >
            </label>
            <button
              type="button"
              :class="[$style.addAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
              title="Add a new attribute"
              :disabled="!newAttributeName"
              @click="addNewAttribute"
            />
          </div>
          <textarea
            v-model="newAttributeValue"
            autocapitalize="off"
            :class="[$style.attributeValues, interfaceStyles.thinScroll]"
            placeholder="Enter attribute value(s)"
          />
        </div>
      </div>

      <div :class="$style.formButtons">
        <button
          type="button"
          :class="[interfaceStyles.button, $style.configureButton]"
          @click="interfaceStore.openedPanel = 'settings'"
        >
          Settings
        </button>
        <button
          type="submit"
          :class="[interfaceStyles.button, $style.plotButton]"
        >
          Plot
        </button>
      </div>
    </form>
  </section>
</template>

<style module>
  .attributeRow {
    position: relative;

    & + .attributeRow {
      margin-top: 10px;
    }
  }

  .attributeItem {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }

  .attributeValues {
    --color-zebra: rgba(255 255 255 / 0.7);
    align-self: flex-end;
    background: linear-gradient(0deg, transparent 1.25em, var(--color-zebra) 0, var(--color-zebra) 2.5em);
    background-attachment: local;
    background-size: 2.5em 2.5em;
    border: none;
    box-sizing: border-box;
    line-height: 1.25em;
    height: 6.25em;
    margin: 10px 0;
    padding: 0 10px;
    resize: vertical;
    width: calc(100% - 10px);

    @media (prefers-color-scheme: dark) {
      --color-zebra: rgba(0 0 0 / 0.1);
    }
  }

  .unsetAttributeButton {
    position: absolute;
    right: 0;
    top: 0.5em;
    transform: translateY(-50%);

    &:not(:hover) {
      opacity: 0.5;
    }
  }

  .newAttributeName {
    display: flex;

    & .labeledField {
      flex-grow: 1;
      min-width: 0;
    }

    & input[type="text"] {
      text-align: left;
    }
  }
  
  .attributeListCtrl {
    display: flex;
    flex-shrink: 0;
    position: relative;

    &::before {
      background-color: var(--color-accent);
      content: "";
      height: 25px;
      left: 50%;
      -webkit-mask: url(../assets/icons.svg) -150px 0 no-repeat;
      mask: url(../assets/icons.svg) -150px 0 no-repeat;
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

  .attributeList {
    cursor: pointer;
    opacity: 0.01;
    width: 32px;
  }

  .addAttributeButton {
    flex-shrink: 0;

    &:disabled {
      opacity: 0.5;
    }
  }

  .formButtons {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-block: 15px 5px;
  }

  .plotButton,
  .configureButton {
    flex: 1 0 0;
  }
</style>
