import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import bus from '@/utils/bus';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/map',
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/MapPage.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit('start:spinner');
      store
        .dispatch('FETCH_WAY')
        .then(() => {
          next();
        })
        .catch(err => {
          console.log('error: ', err);
        });
    },
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/InfoPage.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit('start:spinner');
      next();
      // store.dispatch("FETCH_WAY")
      //   .then(() => {
      //     next();
      //   })
      //   .catch((err) => {
      //     console.log('error: ', err)
      //   });
    },
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('../views/AnalysisPage.vue'),
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
        // component: CreateSysMgmt({ title: "운행 현황 조회", name: "Driving" }),
        beforeEnter: (to, from, next) => {
          // bus.$emit("start:spinner");
          // bus.$off("set:pageTitle");
          next();
        },
      },
      {
        path: 'carInfo',
        name: 'carInfo',
        component: () => import('@/components/DrivingInfo/CarInfo.vue'),
        // component: CreateSysMgmt({ title: "SYDER 차량 정보 조회", name: "CarInfo" }),
        beforeEnter: (to, from, next) => {
          // bus.$emit("start:spinner");
          // bus.$off("set:pageTitle");
          next();
        },
      },
      {
        path: 'searchWayPoint',
        name: 'searchWayPoint',
        component: () => import('@/components/DrivingInfo/WayPointInfo.vue'),
        // component: CreateSysMgmt({ title: "웨이포인트 조회", name: "SearchWayPoint" }),
        beforeEnter: (to, from, next) => {
          // bus.$emit("start:spinner");
          // bus.$off("set:pageTitle");
          next();
        },
      },
      {
        path: 'errorLog',
        name: 'errorLog',
        component: () => import('@/components/DrivingInfo/ErrorLogInfo.vue'),
        // component: CreateSysMgmt({ title: "오류 로그 조회", name: "errorLog" }),
        beforeEnter: (to, from, next) => {
          // bus.$emit("start:spinner");
          // bus.$off("set:pageTitle");
          next();
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/LoginPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
