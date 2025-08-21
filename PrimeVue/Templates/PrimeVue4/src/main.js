// === Initial Config ==========================
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router/index.js'

// === PrimeVue Config =========================
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import primeLangES from '@/langs/es.json'
import Ripple from 'primevue/ripple'

// === Custom Preset Theme =====================
import { setPreset } from './theme/preset.js'
const MyPreset = setPreset(Aura)

// === PrimeVue Plugins ========================
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

// === CSS Config ==============================
import '@/styles/brand.css'
import '@/styles/basics.css'
import '@/styles/variables.css'
import '@/styles/transitions.css'
import '@/styles/tailwind.css'
import '@/styles/primevue-overrides.css'
import '@/styles/swiper.css'
import '@/styles/customButtons.css'
import '@/styles/main.css'
import 'normalize.css/normalize.css'

// === OverlayScrollbars ==============================
import Tooltip from 'primevue/tooltip'
import 'overlayscrollbars/overlayscrollbars.css'
import 'overlayscrollbars/styles/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

// === Pinia ====================================
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persistedState)

// === Font Awesome Icons ======================
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// === Icons ====================================
import registerIcons from './plugins/icons'

// === Init functions (Pinia) ===============================
import { setLightMode, setDarkMode, setSystemMode, setCustomScrollbar } from '@/utilities/preferencesUtils'
import { usePreferencesStore } from '@/stores/preferences'

// === Init App ================================
createApp(App)
const app = createApp(App)

registerIcons(app)
app.component('FontAwesomeIcon', FontAwesomeIcon) // Enable for Font Awesome Icons component, if not use PrimeVue Icons or imported SVG icons
app.use(PrimeVue, {
  locale: primeLangES,
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p', // CSS Class prefix
      darkModeSelector: '.dark', // CSS Class selector for dark mode
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
      }
    }
  },
  pt: {
    directives: {
      tooltip: {
        root: {
          style: {
            maxWidth: '350px',
            textAlign: 'center',
            '--p-tooltip-background': 'var(--p-primary-color)'
          }
        },
        text: '!bg-primary !text-primary-contrast !font-medium'
      }
    }
  },
  zIndex: {
    modal: 1300, //dialog, sidebar
    overlay: 1250, //select, popover
    menu: 1250, //overlay menus
    tooltip: 1250 //tooltip
  }
})
app.use(pinia)
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.component('OverlayScrollbars', OverlayScrollbarsComponent)
// ----- //
const preferencesStore = usePreferencesStore()
function applyInitialPreferences() {
  const { themeMode = 'light', fontSize = 14, customScrollbar = false } = preferencesStore

  if (themeMode === 'system') setSystemMode()
  else if (themeMode === 'dark') setDarkMode()
  else setLightMode()

  document.documentElement.style.setProperty('--font-size', `${fontSize}px`)
  setCustomScrollbar(customScrollbar)
}
applyInitialPreferences()
// ----- //
app.mount('#app')
