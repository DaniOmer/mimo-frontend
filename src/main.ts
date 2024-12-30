import { createApp } from "vue";
import { createPinia } from "pinia";
import Colada, { PiniaColadaPlugin } from "colada-plugin";
import { useToast } from "vue-toast-notification";

import { persistState } from "./stores";
import { router } from "./router";

import "./styles/index.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

pinia.use(persistState);
pinia.use(PiniaColadaPlugin);

app.use(pinia);
app.use(Colada);
app.use(router);
app.use(useToast);
app.mount("#app");
