import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Colada, { PiniaColadaPlugin } from "colada-plugin";
import { useToast } from "vue-toast-notification";

import { router } from "./router";

import "./styles/index.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
pinia.use(PiniaColadaPlugin);

app.use(pinia);
app.use(Colada);
app.use(router);
app.use(useToast);
app.mount("#app");
