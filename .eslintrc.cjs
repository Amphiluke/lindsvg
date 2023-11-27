module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    worker: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: [
    "@stylistic/js",
    "vue",
  ],
  rules: {
    "@stylistic/js/comma-dangle": ["error", {arrays: "always-multiline",  objects: "always-multiline"}],
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/quotes": ["error", "double"],
    "@stylistic/js/semi": "error",
  },
};
