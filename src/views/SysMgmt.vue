<template>
  <div class="sysMgmt">
    <the-driving-mgmt></the-driving-mgmt>
  </div>
</template>

<script>
import bus from "../utils/bus.js";
import TheDrivingMgmt from "../components/TheDrivingMgmt.vue";

export default {
  components: {
    TheDrivingMgmt
  },
  mounted() {
    bus.$emit("end:spinner");
  },
};
</script>

<style>
.sysMgmt {
  padding: 20px;
  min-width: 1400px;
}
</style>