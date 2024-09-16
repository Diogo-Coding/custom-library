import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import { checkAuth } from '@/utilities/auth.js'

import NotFound from '../views/Errors/NotFound.vue'
import SomethingWentWrong from '../views/Errors/SomethingWentWrong.vue'

import LoginView from '../views/LoginView.vue'

import HistoryView from '../views/MainViews/HistoryView.vue'
import RowView from '../views/MainViews/HistoryOptions/RowView.vue'
import RowAdd from '../views/MainViews/HistoryOptions/RowAdd.vue'
import UserPreferences from '../views/MainViews/User/UserSettings.vue'
import HomeView from '../views/MainViews/HomeView.vue'
import MainRouter from '@/views/MainRouter.vue'

const routes = [ // Routes
  {
    path: '/',
    redirect: checkAuth()
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/main',
    name: 'Main Page',
    component: MainRouter,
    redirect: '/main/home',
    meta: {
      requiresAuth: true,
      title: 'Home'
    },
    children: [
      {
        path: '/main/home',
        name: 'Home',
        component: HomeView,
        meta: {
          title: 'Home'
        }
      },
      {
        path: '/main/history',
        name: 'History',
        component: HistoryView,
        meta: {
          title: 'Historial'
        },
      },
      {
        path: '/main/history/view',
        name: 'History View',
        component: RowView,
        meta: {
          title: 'Editar registro'
        }
      },
      {
        path: '/main/history/add',
        name: 'History Add',
        component: RowAdd,
        meta: {
          title: 'Insertar registro'
        }
      },
      {
        path: '/preferences',
        name: 'Preferences',
        component: UserPreferences,
        meta: {
          title: 'Configuración'
        }
      }
    ]
  },
  {
    path: '/errors/something-went-wrong',
    name: 'somethingWentWrong',
    component: SomethingWentWrong,
    meta: {
      title: 'Algo salió mal'
    }
  },
  {
    path: '/not-found',
    component: NotFound,
    meta: {
      title: 'Página no encontrada'
    }
  },
  {
    path: '/:pathMatch(.*)*', // Captura todas las rutas no definidas
    redirect: '/not-found'
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// *----------------------------------------------------------------------------------------------------------------*
// *-------------------------------------------- Comprobaciones pre-navegación -------------------------------------*
let takenErrors = [ // Errores admitidos de algo que no se pudo cargar
  // Chrome
  'Failed to fetch dynamically imported module',
  'Failed to load module script',
  // Safari
  'Unable to preload',
  'Did not parse stylesheet',
]
let lastNavigation = null // Estado de ultima navegacion en ventana actual

router.onError((err) => {
  console.log(
    '%c [ERROR] %c Error en la ruta -->> ',
    'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;',
    'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;',
    err, lastNavigation
  );

  // Check if dev mode
  // console.log(import.meta.env)
  if (!import.meta.env.DEV) { // En modo desarrollo queremos ver los errores
    const errMessage = err.message.toString().toLowerCase();
    console.log(err.message, err.name, takenErrors, errMessage);
  
    if (takenErrors.some(e => errMessage.includes(e.toLowerCase()))) {
      if (lastNavigation) {
        console.log('Redirecting to last navigation');
        window.location.href = lastNavigation.to.fullPath;
      } else {
        console.log('Redirecting to something went wrong');
        window.location.href = '/errors/something-went-wrong';
      }
    } else {
      console.log('Everything failed, redirecting to something went wrong');
      window.location.href = '/errors/something-went-wrong';
    }
  }
});

router.beforeEach((to, from) => {
  if (to.meta.title) document.title = 'Transfers - ' +  to.meta.title
  else document.title = 'Control de Transfer - Spring'
  const additional_info = {
    from: from,
    to: to,
    store: store
  }
  if (from.path !== '/') lastNavigation = additional_info // Para evitar la navegacion prederminada de vue router
  console.log(
    '%c Route change triggered -->> %c - %c From: %s %c - %c To: %s %c - %c Additional Info: %o',
    'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;', // Estilo para "Route change triggered -->>"
    'background: transparent',
    'background: #444; color: #badaff; padding: 2px; border-radius: 2px;', from.path,
    'background: transparent',
    'background: #444; color: #badaff; padding: 2px; border-radius: 2px;', to.path,
    'background: transparent',
    'background: #334155; color: #badaff; padding: 2px; border-radius: 2px;', additional_info
  );

  if (to.path == '/login' && store.getters.getIsLoggedIn && store.getters.getUser) {
    return '/main'
  }

  // Check if auth is required
  if (to.meta.requiresAuth && !store.getters.getIsLoggedIn) {
    return '/login'
  }
})

export default router
