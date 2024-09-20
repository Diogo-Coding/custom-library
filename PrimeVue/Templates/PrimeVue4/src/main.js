// === Initial Config ==========================
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// === PrimeVue Config =========================
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import primeLangES from "@/langs/es.json";

// === PrimeVue Plugins ========================
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { definePreset } from "@primevue/themes";

// === CSS Config ==============================
import "@/styles/basics.css";
import "@/styles/colors.css";
import "@/styles/transitions.css";
import "@/styles/general.css";
import "@/styles/tailwind.css";
import "normalize.css/normalize.css";

//! Highly recommended to import specific icons you need instead of whole library (You might not need all icons and import all is >1MB)
// TODO: Change from import all to import only what you need
// === Font Awesome Icons ====================== // Enable for Font Awesome Icons, if not use PrimeVue Icons or imported SVG icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// library.add(fas);

// === Custom Preset Theme =====================
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{sky.50}",
      100: "{sky.100}",
      200: "{sky.200}",
      300: "{sky.300}",
      400: "{sky.400}",
      500: "{sky.500}",
      600: "{sky.600}",
      700: "{sky.700}",
      800: "{sky.800}",
      900: "{sky.900}",
      950: "{sky.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "white",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
      },
    },
  },
});

// === Init functions ===============================
import { setLightMode, setDarkMode, setSystemMode } from '@/utilities/preferencesUtils';

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

// === Init App ================================
setThemeMode();
setFontSize();
createApp(App);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon); // Enable for Font Awesome Icons component, if not use PrimeVue Icons or imported SVG icons
app.use(PrimeVue, {
  locale: primeLangES,
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      prefix: "p",
      darkModeSelector: ".dark",
    },
  },
});
app.use(store);
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
// ----- //
app.mount("#app");
