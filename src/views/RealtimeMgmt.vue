<template>
  <div class="realTime">
    <real-map></real-map>
  </div>
</template>

<script>
import RealMap from "../components/RealMap";
import bus from "../utils/bus.js"
// eslint-disable-next-line no-unused-vars
import MapCSS from "../css/map.css"

export default {
  components: {
    RealMap
  },
  mounted() {
    bus.$emit("end:spinner");
  }
};
</script>

<style scoped>

</style>