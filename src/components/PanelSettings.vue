<script setup>
import {ref} from "vue";
import {useLSystemStore} from "../stores/lSystem.mjs";
import {useInterfaceStore} from "../stores/interface.mjs";
import interfaceStyles from "../styles/interface.module.css";
import panelStyles from "../styles/panel.module.css";

let lSystemStore = useLSystemStore();
let interfaceStore = useInterfaceStore();

let newRuleLetter = ref("");
let newRuleValue = ref("");

function toLSFormat(value) {
  return value.trim().toUpperCase();
}

function toNumber(value) {
  return Number(value.replace(",", "."));
}

function addNewRule() {
  lSystemStore.rules[newRuleLetter.value] = toLSFormat(newRuleValue.value);
  newRuleLetter.value = newRuleValue.value = "";
}

function plot() {
  lSystemStore.buildSVG();
}
</script>

<template>
  <section :class="panelStyles.panel">
    <h2 :class="panelStyles.title">
      Settings
    </h2>
    <form
      action="#"
      autocomplete="off"
      :class="[panelStyles.body, interfaceStyles.thinScroll]"
      @submit.prevent="plot"
    >
      <div :class="$style.parameterRow">
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          data-label="Axiom"
        >
          <input
            type="text"
            :class="$style.uppercase"
            :value="lSystemStore.axiom"
            @change="lSystemStore.axiom = toLSFormat($event.target.value)"
          >
        </label>
        <button
          type="button"
          :class="[$style.eraseButton, interfaceStyles.iconButton, interfaceStyles.iconButtonErase]"
          title="Erase"
          @click="lSystemStore.axiom = ''"
        />
      </div>

      <div
        v-for="(rule, letter) of lSystemStore.rules"
        :key="letter"
        :class="$style.parameterRow"
      >
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          :data-label="letter"
        >
          <input
            type="text"
            :class="$style.uppercase"
            :value="rule"
            @change="lSystemStore.rules[letter] = toLSFormat($event.target.value)"
          >
        </label>
        <button
          type="button"
          :class="[$style.unsetRuleButton, interfaceStyles.iconButton, interfaceStyles.iconButtonDelete]"
          title="Delete this rule"
          @click="() => delete lSystemStore.rules[letter]"
        />
      </div>

      <div
        v-show="lSystemStore.vacantLetters.length > 0"
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
            v-for="vacantLetter of lSystemStore.vacantLetters"
            :key="vacantLetter"
            :value="vacantLetter"
          >
            {{ vacantLetter }}
          </option>
        </select>
        <label :class="[interfaceStyles.labeledField, $style.labeledField]">
          <input
            v-model.trim="newRuleValue"
            type="text"
            :class="[$style.newRuleValue, $style.uppercase]"
            placeholder="Add a new rule…"
          >
        </label>
        <button
          type="button"
          :class="[$style.addRuleButton, interfaceStyles.iconButton, interfaceStyles.iconButtonAdd]"
          title="Add a new rule"
          :disabled="!newRuleLetter || !newRuleValue"
          @click="addNewRule"
        />
      </div>

      <div :class="$style.parameterRow">
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          data-label="Alpha, °"
        >
          <input
            type="text"
            inputmode="decimal"
            :value="lSystemStore.alpha"
            @change="lSystemStore.alpha = toNumber($event.target.value)"
          >
        </label>
      </div>

      <div :class="$style.parameterRow">
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          data-label="Theta, °"
        >
          <input
            type="text"
            inputmode="decimal"
            :value="lSystemStore.theta"
            @change="lSystemStore.theta = toNumber($event.target.value)"
          >
        </label>
      </div>

      <div :class="$style.parameterRow">
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          data-label="Step"
        >
          <input
            type="text"
            inputmode="decimal"
            :value="lSystemStore.step"
            @change="lSystemStore.step = toNumber($event.target.value)"
          >
        </label>
      </div>

      <div :class="$style.parameterRow">
        <label
          :class="[interfaceStyles.labeledField, $style.labeledField]"
          data-label="Iterations"
        >
          <input
            type="text"
            inputmode="numeric"
            :value="lSystemStore.iterations"
            @change="lSystemStore.iterations = toNumber($event.target.value)"
          >
        </label>
      </div>

      <div :class="$style.formButtons">
        <button
          type="button"
          :class="[$style.styleButton, interfaceStyles.button]"
          @click="interfaceStore.openedPanel = 'attributes'"
        >
          Style
        </button>
        <button
          type="submit"
          :class="[$style.plotButton, interfaceStyles.button]"
        >
          Plot
        </button>
      </div>
    </form>
  </section>
</template>

<style module>
  .parameterRow {
    border-bottom: 1px solid var(--color-on-surface-mid);
    display: flex;

    &:has([data-label="B"]),
    &:has([data-label="F"]) {
      background: rgb(from var(--color-accent) r g b / 0.08);
    }
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
      left: 20px;
      -webkit-mask: url(../assets/icons.svg) -75px 0 no-repeat;
      mask: url(../assets/icons.svg) -75px 0 no-repeat;
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
    padding-right: 25px;
    width: 45px;
  }
  
  .newRuleValue {
    text-transform: uppercase;

    &::placeholder {
      text-transform: none;
    }
  }

  .formButtons {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-block: 15px 5px;
  }

  .plotButton,
  .styleButton {
    flex: 1 0 0;
  }

  .uppercase {
    text-transform: uppercase;
  }
</style>
