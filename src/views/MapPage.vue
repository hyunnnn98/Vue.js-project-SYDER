<template>
  <div class="realTime">
    <real-map></real-map>
  </div>
</template>

<script>
import RealMap from '@/components/RealMap';
import bus from '@/utils/bus.js';

export default {
  components: {
    RealMap,
  },
  mounted() {
    bus.$emit('end:spinner');
  },
};
</script>

<style></style>
