<template>
  <div>
    INFORMATION_ANALYSIS
  </div>
</template>

<script>
import bus from '@/utils/bus';

export default {
  mounted() {
    bus.$emit('end:spinner');
  },
};
</script>

<style></style>
