<template>
  <div class="sysMgmt">
    <!-- 메인 페이지  -->
    <analysis-main v-if="pageName === 'analysis'"></analysis-main>
    <!-- 서브 조회 페이지 공통 컴포넌트-->
    <router-view></router-view>
  </div>
</template>

<script>
import bus from '@/utils/bus.js';
import AnalysisMain from '@/components/DrivingInfo/AnalysisMain.vue';

export default {
  components: {
    AnalysisMain,
  },
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
@import url(../css/driving.css);
</style>
