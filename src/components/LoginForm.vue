<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="account">아이디:</label>
          <input id="account" type="text" v-model="account" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && account">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">비밀번호:</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn btn-primary"
        >
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      account: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.account);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          account: this.account,
          password: this.password,
          provider: 'admins',
        };
        await this.$store.dispatch('LOGIN', userData);
        this.$router.push('/map');
      } catch (error) {
        console.log(error);
        this.logMessage = error.response.data.message;
      }
    },
    initForm() {
      this.account = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
