import vue from "rollup-plugin-vue";
import {terser} from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";

import {createRequire} from "module";
let require = createRequire(import.meta.url);
let pkg = require("./package.json");

export default [
  {
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
  },
  {
    input: "sw.src.js",
    output: {
      file: "sw.js",
      format: "esm"
    },
    plugins: [
      replace({
        PACKAGE_VERSION: pkg.version,
        delimiters: ["{{", "}}"]
      }),
      terser()
    ]
  }
];
