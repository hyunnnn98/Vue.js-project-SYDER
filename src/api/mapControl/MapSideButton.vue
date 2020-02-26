<template>
  <div class="control">
    <div id="btnCar" @click="setMarker('fixedCars')">
      <img src="../../imgs/car.png" alt="car" />
      <ul id="numberOfCar">
        <li v-for="car in cars" :key="car" @click="setMarker('fixedCars')">
          {{ car }}
          <img src="../../imgs/car.png" alt="car" />
        </li>
      </ul>
    </div>
    <div id="btnWayPoint" @click="setMarker('fixedMarkers')">
      <img src="../../imgs/location.png" alt="wayPoint" />
    </div>
    <div id="btnRoute" @click="routeSimulation()">
      <img src="../../imgs/track.png" alt="track" />
      <div id="selectPoint">
        <ul>
          <li>
            <v-select label="출발지" dense></v-select>
          </li>
          <li>
            <v-select label="도착지" dense></v-select>
          </li>
          <li>길찾기</li>
        </ul>
      </div>
    </div>
    <div id="btnSchool" @click="goBackHome()">
      <img src="../../imgs/school.png" alt="home" />
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus.js";

export default {
  props: ["cars"],
  data() {
    return {};
  },
  methods: {
    setMarker(MarkerType) {
      bus.$emit("set-Marker", MarkerType);
    },
    routeSimulation() {
      bus.$emit("route-Simulation");
    },
    goBackHome() {
      bus.$emit("go-Back-Home");   
    }
  }
};
</script>

<style>
</style>