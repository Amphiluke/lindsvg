<script setup>
import {ref, useTemplateRef} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useFormNavigator} from "../composables/form-navigator.mjs";
import interfaceStyles from "../styles/interface.module.css";

let {lsIndex} = defineProps({
  lsIndex: {
    type: Number,
    required: true,
  },
});

let lSystemStore = useLSystemStore();

useFormNavigator(useTemplateRef("form"));

let newRuleLetter = ref("");
let newRuleValue = ref("");

let numericFields = {
  x: {label: "X", title: "Initial horizontal coordinate"},
  y: {label: "Y", title: "Initial vertical coordinate"},
  alpha: {label: "Alpha, °", title: "Initial angle"},
  theta: {label: "Theta, °", title: "Angle increment"},
  step: {label: "Step", title: "The length of the turtle’s step"},
  iterations: {label: "Iterations", title: "Total number of iterations"},
};

function toLSFormat(value) {
  return value.trim().toUpperCase();
}

function toNumber(value) {
  return Number(value.replace(",", "."));
}

function addNewRule() {
  lSystemStore.params[lsIndex].rules[newRuleLetter.value] = toLSFormat(newRuleValue.value);
  newRuleLetter.value = newRuleValue.value = "";
}
</script>

<template>
  <fieldset>
    <div :class="$style.parameterRow">
      <label
        :class="[interfaceStyles.labeledField, $style.labeledField]"
        data-label="Axiom"
        title="The initial codeword"
      >
        <input
          type="text"
          :class="$style.uppercase"
          :value="lSystemStore.params[lsIndex].axiom"
          spellcheck="false"
          @change="({target}) => lSystemStore.params[lsIndex].axiom = toLSFormat(target.value)"
        >
      </label>
      <button
        type="button"
        :class="[$style.eraseButton, interfaceStyles.iconButton, interfaceStyles.iconButtonErase]"
        title="Erase"
        @click="lSystemStore.params[lsIndex].axiom = ''"
      />
    </div>

    <div
      v-for="(rule, letter) of lSystemStore.params[lsIndex].rules"
      :key="letter"
      :class="[$style.parameterRow, {[$style.reservedRule]: letter === 'B' || letter === 'F'}]"
    >
      <label
        :class="[interfaceStyles.labeledField, $style.labeledField]"
        :data-label="letter + ' \u2A74'"
        :title="`Production rule for ${letter}`"
      >
        <input
          type="text"
          :class="$style.uppercase"
          :value="rule"
          spellcheck="false"
          @change="({target}) => lSystemStore.params[lsIndex].rules[letter] = toLSFormat(target.value)"
        >
      </label>
      <button
        type="button"
        :class="[$style.unsetRuleButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
        title="Delete this rule"
        @click="() => delete lSystemStore.params[lsIndex].rules[letter]"
      />
    </div>

    <div
      v-show="lSystemStore.vacantLetters[lsIndex].length > 0"
      :class="[$style.parameterRow, $style.addRuleRow]"
    >
      <select
        v-model="newRuleLetter"
        :class="$style.letterPicker"
      >
        <option value="">
          &#x22EF;
        </option>
        <option
          v-for="vacantLetter of lSystemStore.vacantLetters[lsIndex]"
          :key="vacantLetter"
          :value="vacantLetter"
        >
          {{ vacantLetter + " \u2A74" }}
        </option>
      </select>
      <label :class="[interfaceStyles.labeledField, $style.labeledField]">
        <input
          v-model.trim="newRuleValue"
          type="text"
          :class="[$style.newRuleValue, $style.uppercase]"
          spellcheck="false"
          placeholder="Add a new rule…"
        >
      </label>
      <button
        type="button"
        :class="[$style.addRuleButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd, interfaceStyles.iconButtonBreath]"
        title="Add a new rule"
        :disabled="!newRuleLetter || !newRuleValue"
        @click="addNewRule"
      />
    </div>

    <div
      v-for="({label, title}, param) of numericFields"
      :key="param"
      :class="$style.parameterRow"
    >
      <label
        :class="[interfaceStyles.labeledField, $style.labeledField]"
        :data-label="label"
        :title
      >
        <input
          type="text"
          :inputmode="param === 'iterations' ? 'mumeric' : 'decimal'"
          :value="lSystemStore.params[lsIndex][param]"
          @change="({target}) => lSystemStore.params[lsIndex][param] = toNumber(target.value)"
        >
      </label>
    </div>
  </fieldset>
</template>

<style module>
.parameterRow {
  border-bottom: 1px solid var(--color-on-surface-mid);
  display: flex;
}

.reservedRule {
  background: linear-gradient(
    90deg,
    rgb(from var(--color-accent) r g b / 0),
    rgb(from var(--color-accent) r g b / 0.08) 15%,
    rgb(from var(--color-accent) r g b / 0.08) 85%,
    rgb(from var(--color-accent) r g b / 0)
  );
}

.labeledField {
  flex-grow: 1;
  min-width: 50px;
}

.unsetRuleButton,
.eraseButton,
.addRuleButton {
  flex-shrink: 0;
  opacity: 0.5;

  .parameterRow:focus-within &:not(:disabled),
  &:not(:disabled):hover {
    opacity: 1;
  }
}

.addRuleRow {
  position: relative;

  &::before {
    background-color: var(--color-accent);
    content: "";
    height: 25px;
    inset-inline-start: 30px;
    -webkit-mask: url(../assets/icons.svg) -75px 0 no-repeat;
    mask: url(../assets/icons.svg) -75px 0 no-repeat;
    pointer-events: none;
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    width: 25px;
  }
}

.letterPicker {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  box-sizing: border-box;
  color: var(--color-on-surface-mid);
  flex-shrink: 0;
  padding-inline: 0 25px;
  width: 60px;
}

.newRuleValue {
  text-transform: uppercase;

  &::placeholder {
    text-transform: none;
  }
}

.uppercase {
  text-transform: uppercase;
}
</style>
