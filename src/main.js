import Vue from "vue";
import App from "./components/App.vue";
import store from "./store/index.js";

export default new Vue({
  el: "#app",
  store,
  render: h => h(App)
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/lindsvg/sw.js");
}
