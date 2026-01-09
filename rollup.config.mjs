import pkg from "./package.json" with {type: "json"};
import terser from "@rollup/plugin-terser";

let config = {
  input: "src/lindsvg.mjs",
  output: {
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

export default [
  {
    ...config,
    output: {file: "dist/lindsvg.esm.min.js", format: "esm", ...config.output},
  },
  {
    ...config,
    output: {file: "dist/lindsvg.min.js", format: "umd", ...config.output},
  },
];
