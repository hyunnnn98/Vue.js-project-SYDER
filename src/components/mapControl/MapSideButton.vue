<template>
  <div class="control">
    <div id="btnCar">
      <img src="@/imgs/car.png" alt="car" />
      <ul id="numberOfCar">
        <li v-for="car in cars" :key="car" @click="setMarker('fixedCars')">
          {{ car }}
          <img src="@/imgs/car.png" alt="car" />
        </li>
      </ul>
    </div>
    <div id="btnWayPoint">
      <img src="@/imgs/location.png" alt="wayPoint" />
    </div>
    <div id="btnRoute">
      <img src="@/imgs/track.png" alt="track" />
      <div id="selectPoint">
        <ul id="searchRoute">
          <li>
            <select class="selectRoute" id>
              <option>정문</option>
              <option>후문</option>
              <option>도서관</option>
            </select>
          </li>
          <li>
            <select class="selectRoute" id>
              <option>본관</option>
              <option>후문</option>
              <option>도서관</option>
            </select>
          </li>
          <li @click="routeSimulation()">길찾기</li>
        </ul>
      </div>
    </div>
    <div id="btnSchool" @click="goBackHome()">
      <img src="@/imgs/school.png" alt="home" />
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus';

export default {
  props: ['cars'],
  data() {
    return {};
  },
  methods: {
    setMarker(MarkerType) {
      bus.$emit('set-Marker', MarkerType);
    },
    routeSimulation() {
      bus.$emit('route-Simulation');
    },
    goBackHome() {
      bus.$emit('go-Back-Home');
    },
  },
};
</script>

<style></style>
