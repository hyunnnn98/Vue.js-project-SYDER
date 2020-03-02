<template>
  <div class="sysMgmt">
    <analysis-main v-if="this.routeName === 'Analysis'"></analysis-main>
    <the-driving-mgmt v-else></the-driving-mgmt>
  </div>
</template>

<script>
import bus from "../utils/bus.js";
import TheDrivingMgmt from "../components/DrivingInfo/TheDrivingMgmt.vue";
import AnalysisMain from "../components/DrivingInfo/AnalysisMain.vue";

export default {
  data() {
    return {
      routeName: null
    };
  },
  components: {
    TheDrivingMgmt,
    AnalysisMain
  },
  mounted() {
    (this.routeName = this.$route.name),
    bus.$emit("end:spinner");
  }
};
</script>

<style>
.sysMgmt {
  padding: 20px;
  min-width: 1400px;
}
</style>