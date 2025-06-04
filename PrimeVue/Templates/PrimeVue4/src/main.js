// === Initial Config ==========================
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router/index.js";

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

// === Pinia ====================================
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persistedState)

// === Font Awesome Icons ======================
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// === Init functions (Pinia) ===============================
import { setLightMode, setDarkMode, setSystemMode, setCustomScrollbar } from '@/utilities/preferencesUtils'
import { usePreferencesStore } from '@/stores/preferences'


// === Init App ================================
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
app.use(pinia);
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
// ----- //
const preferencesStore = usePreferencesStore()
function applyInitialPreferences() {
  const { 
    themeMode = 'light',
    fontSize = 14, 
    customScrollbar = false 
  } = preferencesStore

  if (themeMode === 'system') setSystemMode()
  else if (themeMode === 'dark') setDarkMode()
  else setLightMode()

  document.documentElement.style.setProperty('--font-size', `${fontSize}px`)
  setCustomScrollbar(customScrollbar)
}
applyInitialPreferences()
// ----- //
app.mount("#app");
