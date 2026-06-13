import {version} from "./package.json";
import vue from "@vitejs/plugin-vue";

/** @type {import("vite").UserConfig} */
export default {
  base: "/lindsvg/",
  build: {
    assetsDir: ".",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  define: {
    __PACKAGE_VERSION__: JSON.stringify(version),
  },
  plugins: [
    vue(),
  ],
  worker: {
    format: "es",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
};
