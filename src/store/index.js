import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  deleteCookie,
} from '@/utils/cookies';
import { fetchWayPoint } from '@/api/index';
import { loginUser, logOut } from '@/api/auth';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // *** 로그인 ***
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    // *** 다음 맵 ***
    wayPoint: [],
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    SET_WAY(state, way) {
      state.wayPoint = way;
    },
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
    async FETCH_WAY({ commit }) {
      try {
        const response = await fetchWayPoint();
        // console.log('엑시오스를 통한 응답: ', response);
        commit('SET_WAY', response.data);
        return response;
      } catch (error) {
        console.log('FETCH_WAY ERROR (미구현): ', error);
      }
    },
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.token);
      commit('setUsername', data.user.name);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.user.name);
      return data;
    },
    async LOGOUT({ commit }) {
      // 밑에 방식으로도 앞에 Bearer 붙여서 보낼 수 있다.
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${context.state.token}`;
      const { data } = await logOut();
      commit('clearUsername');
      commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      return data;
    },
  },
});
