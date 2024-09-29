import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name:'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/success',
      name:'success',
      component: () => import('../views/fromSuccess.vue'),
    },
  ],
})

export default router