<script setup>
import {ref, useTemplateRef, nextTick} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let newAttributeName = ref("");
let newAttributeValue = ref("");
let attributes = [
  // Presentation Attributes (https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute#presentation_attributes)
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

  // Core Attributes (https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute#core_attributes)
  "id",
  "tabindex",
  "class",
  "style",
];

let colorPickerRef = useTemplateRef("colorPicker");
let canPickColor = "showPicker" in HTMLInputElement.prototype;
let pickColorAttrIndex = ref(undefined);

function openColorPicker(attrIndex) {
  pickColorAttrIndex.value = attrIndex;
  colorPickerRef.value.showPicker();
}

function appendNewValueColor(color) {
  newAttributeValue.value = `${newAttributeValue.value}\n${color}`.trim();
}

function appendValueColor(color) {
  let [name, value] = Object.entries(lSystemStore.attributes)[pickColorAttrIndex.value];
  if (Array.isArray(value)) {
    value = [...value, color];
  } else if (value) {
    value = [value, color];
  } else {
    value = color;
  }
  lSystemStore.attributes[name] = value;
}

function colorPickerChangeHandler() {
  let field;
  if (pickColorAttrIndex.value === -1) {
    appendNewValueColor(colorPickerRef.value.value);
    field = document.getElementById("path-attr-new");
  } else {
    appendValueColor(colorPickerRef.value.value);
    field = document.getElementById(`path-attr-${pickColorAttrIndex.value}`);
  }
  pickColorAttrIndex.value = undefined;
  colorPickerRef.value.value = "";
  nextTick().then(() => field.scroll({top: Number.MAX_SAFE_INTEGER}));
}

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
        v-for="(values, name, index) of lSystemStore.attributes"
        :key="name"
        :class="$style.attributeRow"
      >
        <label
          :for="'path-attr-' + index"
          :class="$style.attributeName"
        >
          {{ name }}
        </label>
        <button
          v-if="canPickColor && ['color', 'stroke', 'fill'].includes(name)"
          type="button"
          :class="[$style.pickColorButton, interfaceStyles.iconButton, interfaceStyles.iconButtonColor]"
          title="Add color value…"
          @click="openColorPicker(index)"
        />
        <button
          type="button"
          :class="[$style.unsetAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
          title="Delete this attribute"
          @click="unsetAttribute(name)"
        />
        <textarea
          :id="'path-attr-' + index"
          autocapitalize="off"
          spellcheck="false"
          :class="[$style.attributeValues, interfaceStyles.thinScroll]"
          :value="[values].flat().join('\n')"
          placeholder="Enter attribute value(s)"
          @change="({target}) => setAttribute(name, target.value)"
        />
      </div>

      <hr v-if="Object.keys(lSystemStore.attributes).length > 0">

      <h3>Add a new attribute</h3>
      <datalist id="svg-attributes">
        <option
          v-for="(attribute, index) of attributes"
          :key="index"
          :value="attribute"
          :disabled="Object.hasOwn(lSystemStore.attributes, attribute)"
        />
      </datalist>
      <div :class="$style.attributeRow">
        <label :class="[interfaceStyles.labeledField, $style.labeledField]">
          <input
            v-model="newAttributeName"
            list="svg-attributes"
            autocapitalize="off"
            type="text"
            placeholder="Enter attribute name…"
          >
        </label>
        <button
          v-if="canPickColor && ['color', 'stroke', 'fill'].includes(newAttributeName)"
          type="button"
          :class="[$style.pickColorButton, interfaceStyles.iconButton, interfaceStyles.iconButtonColor]"
          title="Add color value…"
          @click="openColorPicker(-1)"
        />
        <button
          type="button"
          :class="[$style.addAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
          title="Add a new attribute"
          :disabled="!newAttributeName"
          @click="addNewAttribute"
        />
        <textarea
          id="path-attr-new"
          v-model="newAttributeValue"
          autocapitalize="off"
          spellcheck="false"
          :class="[$style.attributeValues, interfaceStyles.thinScroll]"
          placeholder="Enter attribute value(s)"
        />
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
      <input
        ref="colorPicker"
        type="color"
        hidden
        @change="colorPickerChangeHandler"
      >
    </form>
  </section>
</template>

<style module>
  .attributeRow {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr auto;

    &:has(.pickColorButton) {
      grid-template-columns: 1fr auto auto;
    }

    + & {
      margin-top: 10px;
    }
  }

  .attributeName {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .attributeValues {
    --color-zebra: #ffffffb3;
    align-self: flex-end;
    background: linear-gradient(0deg, transparent 1lh, var(--color-zebra) 0, var(--color-zebra) 2lh);
    background-attachment: local;
    background-size: 2.5em 2.5em;
    border: none;
    box-sizing: border-box;
    grid-column: 1 / -1;
    line-height: 1.25em;
    height: 5lh;
    margin: 10px 0 10px 10px;
    padding: 0 10px;
    resize: vertical;

    @media (prefers-color-scheme: dark) {
      --color-zebra: #0000001a;
    }
  }

  :is(.pickColorButton, .unsetAttributeButton):not(:hover) {
    opacity: 0.5;
  }

  .labeledField input[type="text"] {
    text-align: start;
  }
  
  .addAttributeButton:disabled {
    opacity: 0.5;
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
