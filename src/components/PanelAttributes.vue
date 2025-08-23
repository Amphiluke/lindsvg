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
let attributes = [
  // Presentation Attributes (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation)
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "cursor",
  "display",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "opacity",
  "overflow",
  "paint-order",
  "pathLength",
  "pointer-events",
  "shape-rendering",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "transform",
  "vector-effect",
  "visibility",

  // Core Attributes (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Core)
  "id",
  "tabindex",

  // Styling Attributes (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Styling)
  "class",
  "style",
];

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
            spellcheck="false"
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
            <label :class="[interfaceStyles.labeledField, $style.labeledField]">
              <input
                v-model="newAttributeName"
                list="svg-attributes"
                autocapitalize="off"
                type="text"
                placeholder="Enter attribute name…"
              >
            </label>
            <datalist id="svg-attributes">
              <option
                v-for="(attribute, index) of attributes"
                :key="index"
                :value="attribute"
                :disabled="Object.hasOwn(lSystemStore.attributes, attribute)"
              />
            </datalist>
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
            spellcheck="false"
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

    + .attributeRow {
      margin-top: 10px;
    }
  }

  .attributeItem {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }

  .attributeValues {
    --color-zebra: #ffffffb3;
    align-self: flex-end;
    background: linear-gradient(0deg, transparent 1lh, var(--color-zebra) 0, var(--color-zebra) 2lh);
    background-attachment: local;
    background-size: 2.5em 2.5em;
    border: none;
    box-sizing: border-box;
    line-height: 1.25em;
    height: 5lh;
    margin: 10px 0;
    padding: 0 10px;
    resize: vertical;
    width: calc(100% - 10px);

    @media (prefers-color-scheme: dark) {
      --color-zebra: #0000001a;
    }
  }

  .unsetAttributeButton {
    position: absolute;
    right: 0;
    top: 0.5em;
    translate: 0 -50%;

    &:not(:hover) {
      opacity: 0.5;
    }
  }

  .newAttributeName {
    display: flex;

    .labeledField {
      flex-grow: 1;
      min-width: 0;
    }

    input[type="text"] {
      text-align: left;
    }
  }
  
  .addAttributeButton {
    flex-shrink: 0;

    &:disabled {
      opacity: 0.5;
    }
  }

  .formButtons {
    background: linear-gradient(0deg, var(--color-surface) 50%, rgb(from var(--color-surface) r g b / 0));
    bottom: 0;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding-block: 15px 5px;
    position: sticky;

    @supports not (color: rgb(from red r g b / 0)) {
      background: var(--color-surface);
    }
  }

  .plotButton,
  .configureButton {
    flex: 1 0 0;
  }
</style>
