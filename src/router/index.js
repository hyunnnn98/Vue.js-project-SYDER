import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js";
import bus from "../utils/bus.js";
import CreateSysMgmt from '../views/CreateSysMgmt.js';

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
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      store.dispatch("FETCH_WAY")
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import(/* webpackChunkName: "info" */ '../views/InfoAnalysis.vue'),
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      store.dispatch("FETCH_WAY")
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
    }
  },
  {
    path: '/driving',
    name: 'driving',
    component: CreateSysMgmt({ title: "운행 현황 조회", name: "Driving" }),
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      bus.$off("set:pageTitle");
      store.dispatch("FETCH_WAY")
      .then(() => {
        next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
      }
  },
  {
    path: "/carInfo",
    name: "carInfo",
    component: CreateSysMgmt({ title: "SYDER 차량 정보 조회", name: "CarInfo" }),
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      bus.$off("set:pageTitle");
      store.dispatch("FETCH_WAY")
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
    }
  },
  {
    path: "/searchWayPoint",
    name: "searchWayPoint",
    component: CreateSysMgmt({ title: "웨이포인트 조회", name: "SearchWayPoint" }),
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      bus.$off("set:pageTitle");
      store.dispatch("FETCH_WAY")
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
    }
  },
  {
    path: "/errorLog",
    name: "errorLog",
    component: CreateSysMgmt({ title: "오류 로그 조회", name: "errorLog" }),
    beforeEnter: (to, from, next) => {
      bus.$emit("start:spinner");
      bus.$off("set:pageTitle");
      store.dispatch("FETCH_WAY")
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log('error: ', err)
        });
    }
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
