import {createApp} from "vue";
import {createPinia} from "pinia";
import "normalize.css";
import "./styles/main.css";
import App from "./App.vue";
import {USING_PWA, setupPWA} from "./pwaCtrl.mjs";

let pinia = createPinia();

createApp(App)
  .use(pinia)
  .mount("#app");

if (USING_PWA) {
  setupPWA();
}
