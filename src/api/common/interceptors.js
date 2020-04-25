import store from '@/store/index';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function(config) {
      // 헤더 - 토큰
      config.headers.Authorization = `Bearer ${store.state.token}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    },
  );
  return instance;
}
