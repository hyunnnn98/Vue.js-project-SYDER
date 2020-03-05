<template>
  <div class="mgmt_main">
    <v-list-item two-line>
      <p class="title">에러 로그 조회</p>
      <!-- <p>
        <date-picker></date-picker>
      </p> -->
    </v-list-item>
    <div class="MainSelectCar">
      <select class="selectCar">
        <option>1호차</option>
        <option>2호차</option>
        <option>3호차</option>
      </select>
      <p>조회</p>
    </div>
    <!-- 슬라이드 -->
    <v-carousel hide-delimiters class="selectCars">
      <v-carousel-item :transition="transition" class="type1">
        <donut-chart class="subType"></donut-chart>
        <!-- <donut-chart class="subType"></donut-chart>
        <donut-chart class="subType"></donut-chart> -->
      </v-carousel-item>
      <v-carousel-item :transition="transition" class="type1">
        <donut-chart></donut-chart>
      </v-carousel-item>
      <v-carousel-item :transition="transition" class="type1">
        <donut-chart></donut-chart>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import DonutChart from '../Chart/DonutChart.vue';

export default {
  components: {
    DonutChart,
  },
  data() {
    return {
      transition: 10,
    };
  },
};
</script>

<style>
.v-window__next {
  right: 0px;
}

.selectCars {
  width: 1600px;
  height: auto;
}

.type1 {
  width: 1000px;
  height: auto;
}

.subType {
  display: inline-block;
  width: 33%;
}

/* select 버튼 */
.MainSelectCar {
  display: flex;
}

.MainSelectCar > p {
  margin-left: 0.3rem;
  width: 60px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  background-color: rgba(204, 204, 204, 0.815);
  /* box-shadow: 0px 3px 5px rgb(109, 109, 109); */
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.selectCar {
  width: 170px;
  padding: 0.6em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
  background: url(/src/imgs/select-arrow.jpg) no-repeat 95% 50%;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* 익스플로러 기본 화살표 제거 */
.selectCar::-ms-expand {
  display: none;
}
</style>
