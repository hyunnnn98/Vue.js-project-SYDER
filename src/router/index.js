import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import bus from '@/utils/bus';
import Axios from 'axios';
import { afterAuth } from '@/api/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/map',
  },
  {
    path: '/map',
    name: 'map',
    meta: { auth: true },
    component: () => import('@/views/MapPage.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit('start:spinner');
      store.dispatch('FETCH_POINTS');
      next();
    },
  },
  {
    path: '/system',
    name: 'system',
    meta: { auth: true },
    component: () => import('@/views/SystemPage.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit('start:spinner');
      next();
    },
    children: [
      {
        path: 'setRoute',
        name: 'setRoute',
        component: () => import('@/components/System/SetRoute.vue'),
      },
      {
        path: 'setPoint',
        name: 'setPoint',
        component: () => import('@/components/System/SetPoint.vue'),
      },
    ],
  },
  {
    path: '/analysis',
    name: 'analysis',
    meta: { auth: true },
    component: () => import('@/views/AnalysisPage.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit('start:spinner');
      bus.$off('set:pageTitle');
      next();
    },
    children: [
      {
        path: 'driving',
        name: 'driving',
        component: () => import('@/components/DrivingInfo/DrivingInfo.vue'),
        beforeEnter: (to, from, next) => {
          bus.$emit('start:spinner');
          // bus.$off('set:pageTitle');
          next();
        },
      },
      {
        path: 'carInfo',
        name: 'carInfo',
        component: () => import('@/components/DrivingInfo/CarInfo.vue'),
        beforeEnter: (to, from, next) => {
          bus.$emit('start:spinner');
          // bus.$off('set:pageTitle');
          next();
        },
      },
      {
        path: 'searchWayPoint',
        name: 'searchWayPoint',
        component: () => import('@/components/DrivingInfo/WayPointInfo.vue'),
        beforeEnter: (to, from, next) => {
          bus.$emit('start:spinner');
          // bus.$off('set:pageTitle');
          next();
        },
      },
      {
        path: 'errorLog',
        name: 'errorLog',
        component: () => import('@/components/DrivingInfo/ErrorLogInfo.vue'),
        beforeEnter: (to, from, next) => {
          bus.$emit('start:spinner');
          // bus.$off('set:pageTitle');
          next();
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  } else if (to.meta.auth && store.getters.isLogin) {
    // 백엔드단 토큰 재검증.
    afterAuth
      .get('http://13.124.189.186/api/authCheck', {
        params: {
          guard: 'admin',
        },
      })
      .then(() => {
        console.log('유효한 토큰값입니다!');
        next();
        return;
      })
      .catch(err => {
        console.log('유효하지 않은 토큰입니다. 로그인 페이지로 이동합니다.');
        next('/login');
        return;
      });
  }
  next();
});

export default router;
