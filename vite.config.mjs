import {resolve} from "node:path";
import packageJSON from "./package.json" with {type: "json"};
import vue from "@vitejs/plugin-vue";

/** @type {import("vite").UserConfig} */
export default {
  base: "/lindsvg/",
  build: {
    assetsDir: ".",
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        sw: resolve(import.meta.dirname, "src/sw.js"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  define: {
    __PACKAGE_VERSION__: JSON.stringify(packageJSON.version),
  },
  plugins: [
    vue(),
  ],
};
