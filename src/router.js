import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store'


Vue.use(Router)



const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('./views/Food.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/detailFood',
      name: 'detailFood',
      component: () => import('./views/DetailFood.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/comidas/:id',
      name: 'comidas',
      component: () => import('./views/DetailFood.vue'),
      meta: {
        requiresAuth: true,
      }
    },    
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('./views/Reservation.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/detailreservation',
      name: 'detailreservation',
      component: () => import('./views/DetailReservation.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/history_services',
      name: 'history_services',
      component: () => import('./views/HistoryService.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/pre_checking',
      name: 'pre_checking',
      component: () => import('./views/Prechecking.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./views/Logout.vue'),
      meta: {
        requiresAuth: true,
      }

    },
    {
      path: '/vistas/:id',
      name: 'vistas',
      component: () => import('./views/Vistas.vue'),

      meta: {
        requiresAuth: true,
      }

    },
    {
      path: '/salones',
      name: 'salones',
      component: () => import('./views/Salon.vue'),

      meta: {
        requiresAuth: true,
      }

    },
    {
      path: '/lavanderia',
      name: 'lavanderia',
      component: () => import('./views/Lavanderia.vue'),

      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/gimnasio',
      name: 'gimnasio',
      component: () => import('./views/Gimnasio.vue'),
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.loggedIn) {
      next()
    } else {
      next('/login')
    }

  } else {
    if (store.getters.loggedIn) {
      next('/')
    }
    next()
  }
})

export default router

