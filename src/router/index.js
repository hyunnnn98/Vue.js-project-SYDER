import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/realtime',
  },
  {
    path: '/realtime',
    name: 'realtime',
    component: () => import(/* webpackChunkName: "realtime" */ '../views/RealtimeMgmt.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: () => import(/* webpackChunkName: "info" */ '../views/InfoAnalysis.vue'),
  },
  {
    path: '/system',
    name: 'system',
    component: () => import(/* webpackChunkName: "system" */ '../views/SysMgmt.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginAdmin.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
