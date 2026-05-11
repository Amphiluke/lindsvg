import pkg from "./package.json" with {type: "json"};
import terser from "@rollup/plugin-terser";

export default {
  input: "src/lindsvg.mjs",
  output: {
    file: "dist/lindsvg.mjs",
    format: "esm",
    name: "lindsvg",
    banner: `/*!
${pkg.name} v${pkg.version}
${pkg.homepage}
(c) ${new Date().getUTCFullYear()} ${pkg.author}
*/`,
  },
  plugins: [
    terser({
      output: {comments: /^!/},
    }),
  ],
};
