// 로그인, 회원 가입, 로그아웃
import { instance } from './index';
import { logout } from './index';

// 회원가입 API
function registerUser(userData) {
  return instance.post('register', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

// 로그아운 API
function logOut() {
  return logout.post('/');
}

export { registerUser, loginUser, logOut };
