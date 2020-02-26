<template>
  <div>
      INFORMATION_ANALYSIS
  </div>
</template>

<script>
import bus from '../utils/bus.js';

export default {
    mounted() {
        bus.$emit('end:spinner');
    }
}
</script>

<style>

</style>