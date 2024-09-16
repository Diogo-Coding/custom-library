// === Initial Config ======================
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import store from './store'

// i18n
import { createI18n } from 'vue-i18n'

// === PrimeVue Config ======================
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'; // Estilos de componentes
import 'primeicons/primeicons.css'
import primeLangES from '@/langs/es.json'

// PrimeVue Plugis
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

// === CSS Config ======================
import '@/styles/basics.css'
import '@/styles/colors.css'
import '@/styles/transitions.css'
import '@/styles/general.css'
import '@/styles/tailwind.css'
import '@/styles/componentColors.css'
// !TODO: Future theme -> import '@/styles/custom-theme.css'
import 'normalize.css/normalize.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Tooltip from 'primevue/tooltip';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas)

// === Init App ======================
createApp(App)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.directive('tooltip', Tooltip)
app.use(PrimeVue, {
  locale: primeLangES,
  ripple: true
})
app.use(store)
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)
// ----- //
app.mount('#app')
