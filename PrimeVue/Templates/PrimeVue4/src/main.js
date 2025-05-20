// === Initial Config ==========================
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

// === PrimeVue Config =========================
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import primeLangES from "@/langs/es.json";

// === Custom Preset Theme =====================
import { setPreset } from "./preset.js";
const MyPreset = setPreset(Aura);

// === PrimeVue Plugins ========================
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

// === CSS Config ==============================
import "@/styles/basics.css";
import "@/styles/colors.css";
import "@/styles/transitions.css";
import "@/styles/general.css";
import "@/styles/tailwind.css";
import "@/styles/primevue-overrides.css";
import "normalize.css/normalize.css";

// === Font Awesome Icons ======================
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// === Init functions ===============================
import { setLightMode, setDarkMode, setSystemMode, setCustomScrollbar } from '@/utilities/preferencesUtils';

function setThemeMode() {
  const themeMode = store.getters.getPreferences ? store.getters.getPreferences.themeMode : 'light';
  if (themeMode === 'system') setSystemMode();
  else if (themeMode === 'light') setLightMode();
  else if (themeMode === 'dark') setDarkMode();
  else setLightMode();
}

function setFontSize() {
  const fontSize = store.getters.getPreferences ? store.getters.getPreferences.fontSize : 14;
  document.documentElement.style.setProperty('--font-size', fontSize + 'px')
}

function setScrollbarStyle() {
  const customScrollbar = store.getters.getPreferences ? store.getters.getPreferences.customScrollbar : false;
  setCustomScrollbar(customScrollbar)
}

// === Init App ================================
setThemeMode();
setFontSize();
setScrollbarStyle();
createApp(App);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon); // Enable for Font Awesome Icons component, if not use PrimeVue Icons or imported SVG icons
app.use(PrimeVue, {
  locale: primeLangES,
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      prefix: "p", // CSS Class prefix
      darkModeSelector: ".dark", // CSS Class selector for dark mode
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
      }
    },
  },
});
app.use(store);
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
// ----- //
app.mount("#app");
