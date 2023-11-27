import {version} from "./package.json";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
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
});
