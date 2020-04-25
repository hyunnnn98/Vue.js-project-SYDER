<template>
  <div class="analysisMain">
    <div>
      <v-card-actions class="sub_main">
        <driving-info></driving-info>
      </v-card-actions>
    </div>
    <!-- 작성할 목록들
        1. 운행 현황 통계
        2. 차량 정보 통계
        3. 인기 웨이포인트 통계
        4. 오류 로그 통계
      -->
  </div>
</template>

<script>
// import bus from "../../utils/bus.js";
// import CarInfo from "./CarInfo.vue";
import DrivingInfo from './DrivingInfo.vue';
// import ErrorLogInfo from "./ErrorLogInfo.vue";
// import WayPointInfo from "./WayPointInfo.vue";
// import bus from "../../utils/bus"

export default {
  components: {
    // CarInfo,
    DrivingInfo,
    // ErrorLogInfo,
    // WayPointInfo
  },
  data() {
    return {
      title: '',
      routeName: '',
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
    },
  },
  created() {
    // bus.$on("set:pageTitle", payload => {
    //   console.log("set:payload: ", payload);
    //   this.getTitle(payload);
    // });
    this.routeName = this.$route.name;
    console.log('분석 메인페이지 라우트 이름: ', this.routeName);
  },
  mounted() {
    // console.log("여기는 SysMgmt",this.$route.name),
    // (this.routeName = this.$route.name),
    // bus.$emit("end:spinner");
  },
};
</script>

<style scoped>
.analysisMain {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
