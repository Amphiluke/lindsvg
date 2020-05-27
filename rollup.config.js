import vue from "rollup-plugin-vue";
import {terser} from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "esm"
  },
  plugins: [
    vue({
      template: {
        isProduction: true,
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    replace({
      "process.env.NODE_ENV": `"${process.env.BUNDLE_TYPE || "production"}"`
    }),
    resolve(),
    terser()
  ]
};
