<template>
  <div>
    <div class="map">
      <VueDaumMap
        class="daumMap"
        :appKey="appKey"
        :center.sync="center"
        :level.sync="level"
        :mapTypeId="mapTypeId"
        :libraries="libraries"
        @load="onLoad"
        @click="whereIsMouse"
        @mousemove="mouseMove"
      />
    </div>
    <div class="control">
      <div id="btnCar">차량</div>
      <div id="btnWayPoint">지점</div>
      <div id="btnRoute">경로</div>
    </div>
  </div>
</template>

<script>
import VueDaumMap from "vue-daum-map";

export default {
  components: { VueDaumMap },
  data: () => ({
    appKey: "1bee1de1f2e9f5b2f92560ff552da65f", // 테스트용 appkey
    center: { lat: 35.89608031958812, lng: 128.62202439342738 }, // 지도의 중심 좌표
    level: 2, // 지도의 레벨(확대, 축소 정도),
    mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    libraries: ["drawing"], // 추가로 불러올 라이브러리
    map: null, // 지도 객체. 지도가 로드되면 할당됨.
    mouseClickPoint: { lat: null, lng: null },
    now: { lat: null, lng: null },
    search: { lat: null, lng: null, name: [] },
    gpsSimulationValue: { lat: null, lng: null, name: [], delete: true },
    routeSimulationValue: { lat: [], lng: [], name: [] },
    markerCount: 1,
    markers: [],
    moveCheckPoint: { lat: null, lng: null },
    setRoute: false
  }),
  methods: {
    onLoad(map) {
      this.map = map;
    }
  }
};
</script>

<style scoped>
.daumMap {
  width: auto;
  height: 700px;
}

.control {
  position: absolute;
  top: 30px;
  right: 0px;
  /* overflow: hidden; */
  width: 130px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
}

#btnCar:hover,
#btnWayPoint:hover,
#btnRoute:hover  {
    border: 4px solid rgb(2, 92, 194);
}

#btnCar,
#btnWayPoint,
#btnRoute {
  display: block;
  position: absolute;
  right: 20px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  background-color: white;
  border: 4px solid rgb(71, 71, 71);
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

#btnCar {
  top: 50px;
}

#btnWayPoint {
  top: 120px;
}

#btnRoute {
  top: 190px;
}
</style>