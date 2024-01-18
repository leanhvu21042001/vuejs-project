import { createRouter, createWebHistory } from 'vue-router'

import ProductView from '~/views/ProductView.vue'
import { useAuthStore } from './stores/auth-store'
import authService from './services/auth-service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'ProductView' }
    },
    {
      path: '/product',
      name: 'ProductView',
      component: ProductView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('~/views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  let isAuthenticated = false

  if (!authStore.user) {
    try {
      const user = await authService.getMe()
      authStore.setAuthUser(user)
      isAuthenticated = true
      if (!user) return next({ name: 'LoginView' })
    } catch (error) {
      isAuthenticated = false
    }
  } else {
    isAuthenticated = true
  }

  if (to.name !== 'LoginView' && !isAuthenticated) next({ name: 'LoginView' })
  else if (to.name === 'LoginView' && isAuthenticated) next({ name: 'ProductView' })
  else next()
})

export default router
