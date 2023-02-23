<template>
  <section class="panel panel-settings">
    <h2 class="panel-title">
      Settings
    </h2>
    <form
      action="#"
      autocomplete="off"
      class="panel-body thin-scroll"
      @submit.prevent="plot"
    >
      <div class="parameter-row">
        <label
          class="labeled-field"
          data-label="Axiom"
        >
          <input
            type="text"
            class="uppercase"
            :value="axiom"
            @change="setParameter('axiom', $event.target.value.toUpperCase())"
          >
        </label>
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('axiom', '')"
        />
      </div>

      <div
        v-for="(rule, letter) in $store.state.rules"
        :key="letter"
        class="parameter-row"
      >
        <label
          class="labeled-field"
          :data-label="letter"
        >
          <input
            type="text"
            class="uppercase"
            :value="rule"
            @change="setRule(letter, $event.target.value.toUpperCase())"
          >
        </label>
        <button
          type="button"
          class="unset-rule-button icon-button icon-button-delete"
          title="Delete this rule"
          @click="unsetRule(letter)"
        />
      </div>

      <div
        v-show="$store.getters.vacantLetters.length > 0"
        class="parameter-row add-rule-row"
      >
        <select
          v-model="newRuleLetter"
          class="letter-picker"
        >
          <option value="">
            &#x22EF;
          </option>
          <option
            v-for="vacantLetter in $store.getters.vacantLetters"
            :key="vacantLetter"
            :value="vacantLetter"
          >
            {{ vacantLetter }}
          </option>
        </select>
        <label class="labeled-field">
          <input
            v-model="newRuleValue"
            type="text"
            class="new-rule-value uppercase"
            placeholder="Add a new rule…"
          >
        </label>
        <button
          type="button"
          class="add-rule-button icon-button icon-button-add"
          title="Add a new rule"
          :disabled="!newRuleLetter || !newRuleValue"
          @click="addNewRule"
        />
      </div>

      <div class="parameter-row">
        <label
          class="labeled-field"
          data-label="Alpha, °"
        >
          <input
            type="text"
            :value="alpha"
            @change="setParameter('alpha', Number($event.target.value))"
          >
        </label>
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('alpha', '')"
        />
      </div>

      <div class="parameter-row">
        <label
          class="labeled-field"
          data-label="Theta, °"
        >
          <input
            type="text"
            :value="theta"
            @change="setParameter('theta', Number($event.target.value))"
          >
        </label>
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('theta', '')"
        />
      </div>

      <div class="parameter-row">
        <label
          class="labeled-field"
          data-label="Step"
        >
          <input
            type="text"
            :value="step"
            @change="setParameter('step', Number($event.target.value))"
          >
        </label>
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('step', '')"
        />
      </div>

      <div class="parameter-row">
        <label
          class="labeled-field"
          data-label="Iterations"
        >
          <input
            type="text"
            :value="iterations"
            @change="setParameter('iterations', Number($event.target.value))"
          >
        </label>
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('iterations', '')"
        />
      </div>

      <div class="form-buttons">
        <button
          type="button"
          class="btn style-button"
          @click="goStyling"
        >
          Style…
        </button>
        <button
          type="submit"
          class="btn plot-button"
        >
          Plot
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import {mapState} from "vuex";
import * as mutationTypes from "../store/mutation-types.js";

export default {
  name: "PanelSettings",

  data: () => ({
    newRuleLetter: "",
    newRuleValue: ""
  }),

  computed: {
    ...mapState([
      "axiom",
      "alpha",
      "theta",
      "step",
      "iterations"
    ])
  },

  methods: {
    setParameter(name, value) {
      let mutation = mutationTypes["LS_SET_" + name.toUpperCase()];
      this.$store.commit(mutation, {[name]: value});
    },

    setRule(letter, rule) {
      this.$store.commit(mutationTypes.LS_SET_RULE, {letter, rule});
    },

    unsetRule(letter) {
      this.$store.commit(mutationTypes.LS_UNSET_RULE, {letter});
    },

    addNewRule() {
      this.$store.commit(mutationTypes.LS_SET_RULE, {
        letter: this.newRuleLetter,
        rule: this.newRuleValue.toUpperCase()
      });
      this.newRuleLetter = this.newRuleValue = "";
    },

    plot() {
      this.$root.$emit("plot-l-system");
    },

    goStyling() {
      this.$store.commit(mutationTypes.OPEN_PANEL, {panelId: "attributes"});
    }
  }
};
</script>

<style lang="less" scoped>
  .parameter-row {
    border-bottom: 1px solid var(--color-gray-light);
    display: flex;
  }
  .labeled-field {
    flex-grow: 1;
    min-width: 50px;
  }
  .unset-rule-button,
  .erase-button,
  .add-rule-button {
    flex-shrink: 0;
    opacity: 0.5;
    .parameter-row:focus-within &:not(:disabled),
    &:not(:disabled):hover {
      opacity: 1;
    }
  }
  .add-rule-row {
    position: relative;
    &::before {
      background: url(images/icons.svg) -100px 0 no-repeat;
      content: "";
      height: 25px;
      left: 20px;
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 25px;
    }
  }
  .letter-picker {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: none;
    box-sizing: border-box;
    color: var(--color-gray-normal);
    flex-shrink: 0;
    padding-right: 25px;
    width: 45px;
  }
  .new-rule-value {
    text-transform: uppercase;
  }
  .new-rule-value::placeholder {
    text-transform: none;
  }
  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .plot-button,
  .style-button {
    width: calc(50% - 5px);
  }
  .uppercase {
    text-transform: uppercase;
  }
</style>
