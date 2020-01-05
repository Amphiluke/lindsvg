import pkg from "./package.json";
import {terser} from "rollup-plugin-terser";

let config = {
    input: "src/lindsvg.mjs",
    output: {
        name: "lindsvg",
        banner: `/*!
${pkg.name} v${pkg.version}
${pkg.homepage}
(c) ${new Date().getUTCFullYear()} ${pkg.author}
*/`
    },
    plugins: [
        terser({
            output: {comments: /^!/}
        })
    ]
};

export default [
    {
        input: config.input,
        output: {file: "dist/lindsvg.esm.js", format: "esm", ...config.output}
    },
    {
        input: config.input,
        output: {file: "dist/lindsvg.esm.min.js", format: "esm", ...config.output},
        plugins: config.plugins
    },
    {
        input: config.input,
        output: {file: "dist/lindsvg.js", format: "umd", ...config.output}
    },
    {
        input: config.input,
        output: {file: "dist/lindsvg.min.js", format: "umd", ...config.output},
        plugins: config.plugins
    }
];
