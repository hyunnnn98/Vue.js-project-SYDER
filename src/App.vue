<template>
  <div id="app">
    <the-header></the-header>
    <spinner :loading="loadingStatus"></spinner>
    <transition name="page">
      <router-view></router-view>
    </transition>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import Spinner from './components/Spinner.vue';
import bus from './utils/bus.js';

export default {
  components: {
    TheHeader,
    TheFooter,
    Spinner,
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
    // 이벤트 버스는 이벤트가 계속 쌓이기 때문에 beforeDestroy를 통해 이벤트를 없애 줘야 함!!!!!
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.endSpinner);
  },
};
</script>

<style>
@import url('./css/reset.css');
</style>
