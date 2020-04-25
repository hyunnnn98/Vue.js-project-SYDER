<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="account">아이디: </label>
          <input id="account" type="text" v-model="account" />
        </div>
        <div>
          <label for="password">비밀번호: </label>
          <input id="password" type="text" v-model="password" />
        </div>
        <div>
          <label for="password_confirmation">비밀번호 확인: </label>
          <input
            id="password_confirmation"
            type="password"
            v-model="password_confirmation"
          />
        </div>
        <div>
          <label for="name">닉네임: </label>
          <input id="name" type="text" v-model="name" />
        </div>
        <button type="submit" class="btn btn-primary">회원 가입</button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';

export default {
  data() {
    return {
      // form values
      account: '',
      password: '',
      password_confirmation: '',
      name: '',
      // log
      logMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        account: this.account,
        password: this.password,
        password_confirmation: this.password_confirmation,
        name: this.name,
      };
      try {
        const { data } = await registerUser(userData);
        // console.log(data);
        this.logMessage = `${data.admin.name} 님이 가입되었습니다`;
        this.initForm();
      } catch (error) {
        console.log('error: ', error);
        this.logMessage = error.message;
      }
    },
    initForm() {
      this.account = '';
      this.password = '';
      this.password_confirmation = '';
      this.name = '';
    },
  },
};
</script>

<style></style>
