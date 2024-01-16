import { createRouter, createWebHistory } from 'vue-router'

import ProductView from '@/views/ProductView.vue'

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
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   let isAuthenticated = false
//   try {
//     // const res = await getMe()
//     isAuthenticated = true
//   } catch (error) {
//     isAuthenticated = false
//   }

//   if (to.name !== 'LoginView' && !isAuthenticated) next({ name: 'LoginView' })
//   else if (to.name === 'LoginView' && isAuthenticated) next({ name: 'ProductView' })
//   else next()
// })

export default router
