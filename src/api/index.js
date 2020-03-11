import axios from 'axios';
import store from '@/store/index';
import { setInterceptors } from './common/interceptors';

// 엑시오스 초기화 함수
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 헤더에 토큰 넣기
// function setToken() {
//   return (axios.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${store.state.token}`);
// }

// 엑시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const logout = createInstanceWithAuth('admins');
export const waypoint = createInstanceWithAuth('waypoints');
// export const
