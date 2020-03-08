<template>
  <div class="mgmt_main">
    <p class="title">운행정보 조회</p>
    <!-- <p>
        <date-picker></date-picker>
      </p>-->
    <div class="drivingInfo">
      <v-card outlined>
        <half-donut-chart></half-donut-chart>
      </v-card>
      <v-card outlined>
        <donut-chart></donut-chart>
      </v-card>
      <v-card outlined>
        시간대 별 운행 비율
        <bar-chart :Type="timeChartType"></bar-chart>
      </v-card>
    </div>
  </div>
</template>

<script>
import DonutChart from '../Chart/DonutChart.vue';
import HalfDonutChart from '../Chart/HalfDonutChart.vue';
import BarChart from '../Chart/BarChart.vue';
import bus from '@/utils/bus';

export default {
  components: {
    DonutChart,
    HalfDonutChart,
    BarChart,
  },
  data() {
    return {
      timeChartType: 'bar',
    };
  },
  mounted() {
    bus.$emit('end:spinner');
  },
};
</script>

<style>
.drivingInfo {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.drivingInfo > div {
  width: 31%;
  text-align: center;
  box-shadow: 0px 2px 5px rgb(165, 165, 165);
  padding: 10px;
  font-family: 'Jua';
}
</style>
