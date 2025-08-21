import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '../views/Errors/NotFound.vue'
import SomethingWentWrong from '../views/Errors/SomethingWentWrong.vue'

import MainHome from '../views/MainViews/MainHome.vue'
import MainRouter from '@/views/MainRouter.vue'
import TemplatesRouter from '../views/TemplatesRouter.vue'
import TemplatesHome from '@/views/Templates/TemplatesHome.vue'
import TemplatesPage from '@/views/Templates/TemplatesPage.vue'

/**
 * Routes
 *
 * The routes are divided into two groups:
 * 1. Development pages
 * 2. Production pages
 * 3. Control pages
 *
 * The development pages are used for testing and debugging purposes.
 * The main pages are used for the actual application.
 * The control pages are used for managing the application.
 *
 * Grouping pages by their purpose helps to keep the code organized and maintainable.
 * It also allows for better organization and navigation within the application.
 * Each group can have a different set of themes, prefences, meta tags and other settings that can influence the user experience.
 *
 */
const routes = [
  // Routes
  {
    path: '/',
    redirect: '/main'
  },
  // ========================= Development pages ========================= \\
  // ========================= ================= ========================= \\
  {
    path: '/dev',
    name: 'Dev Page',
    children: [
      {
        path: 'configuration',
        name: 'Configuration',
        component: () => import('../views/_Configuration/Configuration.vue'),
        meta: {
          title: 'Configuration Page'
        }
      }
    ]
  },
  // ========================= Main pages ========================= \\
  // ========================= ========== ========================= \\
  {
    path: '/main',
    name: 'MainRouter',
    component: MainRouter,
    redirect: '/main/home',
    meta: {
      keepAlive: true,
      title: 'Templates'
    },
    children: [
      {
        path: 'home',
        name: 'MainHome',
        component: MainHome,
        meta: {
          keepAlive: true,
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/templates',
    name: 'TemplatesRouter',
    component: TemplatesRouter,
    redirect: '/templates/home',
    meta: {
      keepAlive: true,
      title: 'Templates'
    },
    children: [
      {
        path: 'home',
        name: 'TemplatesHome',
        component: TemplatesHome,
        meta: {
          keepAlive: true,
          title: 'Templates'
        }
      },
      {
        path: 'page',
        name: 'TemplatesPage',
        component: TemplatesPage,
        meta: {
          keepAlive: true,
          title: 'Other Page'
        }
      }
    ]
  },
  // ========================= Control pages ========================= \\
  // ========================= ============= ========================= \\
  {
    path: '/errors/something-went-wrong',
    name: 'SomethingWentWrong',
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

let lastNavigation = null

router.onError((err) => {
  console.log(
    '%c [ERROR] %c Error en la ruta -->> ',
    'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;',
    'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;',
    err,
    lastNavigation
  )

  window.location.href = '/errors/something-went-wrong'
})

router.beforeEach((to, from) => {
  if (to.meta.title) document.title = 'Template App - ' + to.meta.title
  else document.title = 'Template App'

  const additional_info = {
    from: from,
    to: to
  }
  if (from.path !== '/') lastNavigation = additional_info

  console.log(
    '%c Route change triggered -->> %c - %c From: %s %c - %c To: %s %c - %c Additional Info: %o',
    'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;',
    'background: transparent',
    'background: #444; color: #badaff; padding: 2px; border-radius: 2px;',
    from.path,
    'background: transparent',
    'background: #444; color: #badaff; padding: 2px; border-radius: 2px;',
    to.path,
    'background: transparent',
    'background: #334155; color: #badaff; padding: 2px; border-radius: 2px;',
    additional_info
  )
})

export default router
