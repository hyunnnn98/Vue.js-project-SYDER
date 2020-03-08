<template>
  <div class="mgmt_main">
    <p class="title">차량정보 조회</p>
    <!-- <p>
        <date-picker></date-picker>
      </p> -->
    <v-card>차량정보 차트 영역</v-card>
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
