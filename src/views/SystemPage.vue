<template>
  <div class="system-box">
    <template v-if="pageName === 'system'">
      <h1 class="page-header">시스템 관리 페이지</h1>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import bus from '@/utils/bus';

export default {
  mounted() {
    bus.$emit('end:spinner');
  },
  computed: {
    pageName: function() {
      return this.$route.name;
    },
  },
};
</script>

<style>
@import url(../css/system.css);
</style>
