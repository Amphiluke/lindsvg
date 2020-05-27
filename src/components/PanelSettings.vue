<template>
  <section class="panel panel-settings">
    <h2 class="panel-title">
      Settings
    </h2>
    <form
      action="#"
      autocomplete="off"
      class="parameters thin-scroll"
      @submit.prevent="plot"
    >
      <label
        class="labeled-field"
        data-label="Axiom"
      >
        <input
          type="text"
          :value="axiom"
          @input="setParameter('axiom', $event.target.value)"
        >
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('axiom', '')"
        />
      </label>

      <label
        v-for="(rule, letter) in $store.state.rules"
        :key="letter"
        class="labeled-field"
        :data-label="letter"
      >
        <input
          type="text"
          :value="rule"
          @input="setRule(letter, $event.target.value)"
        >
        <button
          type="button"
          class="unset-rule-button icon-button icon-button-delete"
          title="Delete this rule"
          @click="unsetRule(letter)"
        />
      </label>

      <span
        v-show="$store.getters.vacantLetters.length > 0"
        class="labeled-field add-rule-row"
      >
        <select
          v-model="newRuleLetter"
          class="letter-picker"
        >
          <option value="">&#x22EF;</option>
          <option
            v-for="vacantLetter in $store.getters.vacantLetters"
            :key="vacantLetter"
            :value="vacantLetter"
          >
            {{ vacantLetter }}
          </option>
        </select>
        <input
          v-model="newRuleValue"
          type="text"
          class="new-rule-value"
          placeholder="Add new rule…"
        >
        <button
          type="button"
          class="add-rule-button icon-button icon-button-add"
          title="Add new rule"
          :disabled="!newRuleLetter || !newRuleValue"
          @click="addNewRule"
        />
      </span>

      <label
        class="labeled-field"
        data-label="Alpha"
      >
        <input
          type="text"
          :value="alpha"
          @input="setParameter('alpha', Number($event.target.value))"
        >
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('alpha', '')"
        />
      </label>

      <label
        class="labeled-field"
        data-label="Theta"
      >
        <input
          type="text"
          :value="theta"
          @input="setParameter('theta', Number($event.target.value))"
        >
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('theta', '')"
        />
      </label>

      <label
        class="labeled-field"
        data-label="Step"
      >
        <input
          type="text"
          :value="step"
          @input="setParameter('step', Number($event.target.value))"
        >
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('step', '')"
        />
      </label>

      <label
        class="labeled-field"
        data-label="Iterations"
      >
        <input
          type="text"
          :value="iterations"
          @input="setParameter('iterations', Number($event.target.value))"
        >
        <button
          type="button"
          class="erase-button icon-button icon-button-erase"
          title="Erase"
          @click="setParameter('iterations', '')"
        />
      </label>

      <button
        type="submit"
        class="plot-button"
      >
        Plot
      </button>
    </form>
  </section>
</template>

<script>
import {mapState} from "vuex";
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
      let mutation = `set${name[0].toUpperCase()}${name.slice(1)}`;
      this.$store.commit(mutation, {[name]: value});
    },

    setRule(letter, rule) {
      this.$store.commit("setRule", {letter, rule});
    },

    unsetRule(letter) {
      this.$store.commit("unsetRule", {letter});
    },

    addNewRule() {
      this.$store.commit("setRule", {
        letter: this.newRuleLetter,
        rule: this.newRuleValue.toUpperCase()
      });
      this.newRuleLetter = this.newRuleValue = "";
    },

    plot() {
      this.$root.$emit("plotLSystem");
    }
  }
};
</script>

<style lang="less" scoped>
  .parameters {
    flex-grow: 1;
    overflow: auto;
    padding-right: 4px; // increase the distance from a scrollbar
  }
  .unset-rule-button,
  .erase-button,
  .add-rule-button {
    flex-shrink: 0;
    opacity: 0.5;
  }
  .labeled-field:focus-within .unset-rule-button,
  .labeled-field:focus-within .erase-button,
  .labeled-field:focus-within .add-rule-button:not(:disabled),
  .unset-rule-button:hover,
  .erase-button:hover,
  .add-rule-button:not(:disabled):hover {
    opacity: 1;
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
  .plot-button {
    box-sizing: border-box;
    margin-top: 15px;
    width: 100%;
  }
</style>
