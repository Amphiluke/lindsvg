<script setup>
import {ref, nextTick} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {canPickColor, useColorPicker} from "../composables/color-picker.mjs";
import interfaceStyles from "../styles/interface.module.css";

let {lsIndex} = defineProps({
  lsIndex: {
    type: Number,
    required: true,
  },
});

let lSystemStore = useLSystemStore();
let {pickColor} = useColorPicker();

let newAttributeName = ref("");
let newAttributeValue = ref("");
let svgAttributes = [
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

async function callColorPicker(attrIndex) {
  let color = await pickColor();
  let field;
  if (attrIndex === -1) {
    appendNewValueColor(color);
    field = document.getElementById(`path-attr-new-${lsIndex}`);
  } else {
    appendValueColor(color, attrIndex);
    field = document.getElementById(`path-attr-${lsIndex}-${attrIndex}`);
  }
  await nextTick();
  field.scroll({top: Number.MAX_SAFE_INTEGER});
}

function appendNewValueColor(color) {
  newAttributeValue.value = `${newAttributeValue.value}\n${color}`.trim();
}

function appendValueColor(color, attrIndex) {
  let [name, value] = Object.entries(lSystemStore.attributes[lsIndex])[attrIndex];
  if (Array.isArray(value)) {
    value = [...value, color];
  } else if (value) {
    value = [value, color];
  } else {
    value = color;
  }
  lSystemStore.attributes[lsIndex][name] = value;
}

function setAttribute(name, value) {
  value = value.trim().split(/\r?\n/);
  if (value.length === 1) {
    value = value[0];
  }
  lSystemStore.attributes[lsIndex][name] = value;
}

function unsetAttribute(name) {
  delete lSystemStore.attributes[lsIndex][name];
}

function addNewAttribute() {
  setAttribute(newAttributeName.value, newAttributeValue.value);
  newAttributeName.value = newAttributeValue.value = "";
}
</script>

<template>
  <fieldset>
    <div
      v-for="(values, name, attrIndex) of lSystemStore.attributes[lsIndex]"
      :key="name"
      :class="$style.attributeRow"
    >
      <label
        :for="`path-attr-${lsIndex}-${attrIndex}`"
        :class="$style.attributeName"
      >
        {{ name }}
      </label>
      <button
        v-if="canPickColor && ['color', 'stroke', 'fill'].includes(name)"
        type="button"
        :class="[$style.pickColorButton, interfaceStyles.iconButton, interfaceStyles.iconButtonColor]"
        title="Add color value…"
        @click="callColorPicker(attrIndex)"
      />
      <button
        type="button"
        :class="[$style.unsetAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
        title="Delete this attribute"
        @click="unsetAttribute(name)"
      />
      <textarea
        :id="`path-attr-${lsIndex}-${attrIndex}`"
        autocapitalize="off"
        spellcheck="false"
        :class="[$style.attributeValues, interfaceStyles.thinScroll]"
        :value="[values].flat().join('\n')"
        placeholder="Enter attribute value(s)"
        @change="({target}) => setAttribute(name, target.value)"
      />
    </div>

    <hr v-if="Object.keys(lSystemStore.attributes[lsIndex]).length > 0">

    <h3>Add a new attribute</h3>
    <datalist :id="`svg-attributes-${lsIndex}`">
      <option
        v-for="(attribute, index) of svgAttributes"
        :key="index"
        :value="attribute"
        :disabled="Object.hasOwn(lSystemStore.attributes[lsIndex], attribute)"
      />
    </datalist>
    <div :class="$style.attributeRow">
      <label :class="[interfaceStyles.labeledField, $style.labeledField]">
        <input
          v-model="newAttributeName"
          :list="`svg-attributes-${lsIndex}`"
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
        @click="callColorPicker(-1)"
      />
      <button
        type="button"
        :class="[$style.addAttributeButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
        title="Add a new attribute"
        :disabled="!newAttributeName"
        @click="addNewAttribute()"
      />
      <textarea
        :id="`path-attr-new-${lsIndex}`"
        v-model="newAttributeValue"
        autocapitalize="off"
        spellcheck="false"
        :class="[$style.attributeValues, interfaceStyles.thinScroll]"
        placeholder="Enter attribute value(s)"
      />
    </div>
  </fieldset>
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
  width: 100%;
}

.addAttributeButton:disabled {
  opacity: 0.5;
}
</style>
