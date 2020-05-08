<template>
  <div class="control">
    <div id="btnCar">
      <img src="@/imgs/car.png" alt="car" />
      <!-- <ul id="numberOfCar">
        <li v-for="car in cars" :key="car" @click="setMarker('fixedCars')">
          {{ car }}
          <img src="@/imgs/car.png" alt="car" />
        </li>
      </ul> -->
      <p>차량</p>
    </div>
    <div id="btnWayPoint">
      <img
        src="@/imgs/location.png"
        alt="wayPoint"
        @click="setMarker('fixedMarkers')"
      />
      <p>지점</p>
    </div>
    <div id="btnRoute">
      <img src="@/imgs/track.png" alt="track" />
      <div id="selectPoint">
        <ul id="searchRoute">
          <li>
            <select class="selectRoute" v-model="start_point">
              <option value="" disabled selected style="display:none"
                >출발지점</option
              >
              <option v-for="start in location" :key="start.name">{{
                start.name
              }}</option>
            </select>
          </li>
          <li>
            <select class="selectRoute" v-model="end_point">
              <option value="" disabled selected style="display:none"
                >도착지점</option
              >
              <option v-for="end in location" :key="end.name">{{
                end.name
              }}</option>
            </select>
          </li>
          <li @click="routeSimulation()">길찾기</li>
        </ul>
      </div>
      <p>길찾기</p>
    </div>
    <div id="btnSchool" @click="goBackHome()">
      <img src="@/imgs/school.png" alt="home" />
      <p>홈으로</p>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus';

export default {
  props: ['cars'],
  data() {
    return {
      location: this.$store.state.points,
      start_point: '',
      end_point: '',
    };
  },
  methods: {
    setMarker(MarkerType) {
      bus.$emit('set-Marker', MarkerType);
    },
    routeSimulation() {
      const setPoint = {
        start_point: this.start_point,
        end_point: this.end_point,
      };
      bus.$emit('route-Simulation', setPoint);
    },
    goBackHome() {
      bus.$emit('go-Back-Home');
    },
  },
};
</script>

<style></style>
