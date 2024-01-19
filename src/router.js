import { createRouter, createWebHistory } from 'vue-router'

import ListProduct from '~/views/product/ListProduct.vue'
import { useAuthStore } from '~/stores/auth-store'
import authService from '~/services/auth-service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RootPath',
      redirect: { name: 'ListProduct' }
    },
    {
      path: '/product',
      name: 'ListProduct',
      component: ListProduct
    },
    {
      path: '/product/create',
      name: 'CreateProduct',
      component: {
        template: ''
      }
    },
    {
      path: '/product/edit/:id',
      name: 'EditProduct',
      component: {
        template: ''
      }
    },
    {
      path: '/user',
      name: 'ListUser',
      component: {
        template: '<h1>List User</h1>'
      }
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
  else if (to.name === 'LoginView' && isAuthenticated) next({ name: 'ListProduct' })
  else next()
})

export default router
