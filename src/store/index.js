import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  deleteCookie,
} from '@/utils/cookies';

import { loginUser, logOut } from '@/api/auth';
import { getPoints } from '@/api/point';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ***  로그인  ***
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    // ***  다음 맵  ***
    points: [], // 웨이포인트 위치정보
    cars: [
      {
        name: '1호차',
        lat: '',
        lng: '',
        status: '',
      },
      {
        name: '2호차',
        lat: '',
        lng: '',
        status: '',
      },
      {
        name: '3호차',
        lat: '',
        lng: '',
        status: '',
      },
    ], //  차량 위치정보
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    // ** 지도 관련 mutations 처리 **
    setWaypoint(state, points) {
      state.points = points;
    },
    setCarLocation(state, cars) {
      state.cars = cars;
    },
    // ** 회원관련 mutations 처리 **
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    async FETCH_POINTS({ commit }) {
      try {
        const { data } = await getPoints();
        // console.log('엑시오스를 통한 응답: ', data);
        commit('setWaypoint', data.waypoints);
        return data;
      } catch (error) {
        console.log('FETCH_WAY ERROR (미구현): ', error);
      }
    },
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.access_token);
      commit('setUsername', data.user.name);
      saveAuthToCookie(data.access_token);
      saveUserToCookie(data.user.name);
      return data;
    },
    async LOGOUT({ commit }) {
      const { data } = await logOut();
      commit('clearUsername');
      commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      return data;
    },
  },
});
