<template>
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
      >
      </VueDaumMap>
    <the-sider-bar></the-sider-bar>
    <div class="control">
      <div id="btnCar">
        <img src="../imgs/car.png" alt="car" />
      </div>
      <div id="btnWayPoint">
        <img src="../imgs/location.png" alt="wayPoint" />
      </div>
      <div id="btnRoute">
        <img src="../imgs/track.png" alt="track" />
      </div>
    </div>
    <div class="carState">
      <tr>
        <td>운행 대기</td>
        <td>운행 예약</td>
        <td>운행 중</td>
        <td>이상 차량</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
      </tr>
    </div>
    <div class="mousePoint">
      <span>위도 : {{ this.mouseMovePoint.lat }}</span>
      <span>경도 : {{ this.mouseMovePoint.lng }}</span>
    </div>
  </div>
</template>

<script>
import VueDaumMap from "vue-daum-map";
import TheSiderBar from "./TheSideBar";

export default {
  components: { VueDaumMap, TheSiderBar, },
  data: () => ({
    appKey: "1bee1de1f2e9f5b2f92560ff552da65f", // 테스트용 appkey
    center: { lat: 35.89608031958812, lng: 128.62202439342738 }, // 지도의 중심 좌표
    level: 2, // 지도의 레벨(확대, 축소 정도),
    mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    libraries: ["drawing"], // 추가로 불러올 라이브러리
    map: null, // 지도 객체. 지도가 로드되면 할당됨.
    // ======== 여기까지가 기본 맵 data =======
    mouseMovePoint:       { lat: null, lng: null },
    mouseClickPoint:      { lat: null, lng: null },
    now:                  { lat: null, lng: null },
    search:               { lat: null, lng: null, name: [] },
    gpsSimulationValue:   { lat: null, lng: null, name: [], delete: true },
    routeSimulationValue: { lat: [], lng: [], name: [] },
    markerCount: 1,
    markers: [],
    setRoute: false
  }),
  methods: {
    onLoad(map) {
      this.map = map;
    },
    mouseMove(mouseMovePoint) {
      this.mouseMovePoint.lat = (mouseMovePoint[0].latLng.Ha).toFixed(6);
      this.mouseMovePoint.lng = (mouseMovePoint[0].latLng.Ga).toFixed(6);
    }
  }
};
</script>

<style scoped>
.map {
  max-height: 700px;
  /* overflow: hidden; */
}

.daumMap {
  width: 100%;
  height: 700px;
}

.control,
.carState,
.mousePoint {
  position: absolute;
  z-index: 1;
  overflow: hidden;
  font-weight: bold;
}

.control {
  width: 80px;
  height: 230px;
  top: 80px;
  right: 0px;
}

.carState {
  width: 400px;
  height: auto;
  left: 1rem;
  top: 40rem;
  background-color: rgba(255, 255, 255, 0.87);
  text-align: center;
  border-collapse: collapse;
}

.mousePoint {
  width: 310px;
  height: 30px;
  line-height: 30px;
  right: 1rem;
  top: 42.5rem;
  text-align: center;
  border: 1.5px solid rgb(59, 59, 59);
  background-color: rgba(255, 255, 255, 0.781);
  color: rgb(26, 24, 24);
}

.mousePoint > span {
  padding: 5px;
}

.carState > tr > td {
  width: 100px;
  padding: 5px;
  border: 2px solid rgb(97, 97, 97);
}

#btnCar:hover,
#btnWayPoint:hover,
#btnRoute:hover {
  border: 4px solid rgb(2, 92, 194);
}

#btnCar,
#btnWayPoint,
#btnRoute {
  display: block;
  position: relative;
  left: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: white;
  border: 4px solid rgb(71, 71, 71);
  border-radius: 10px;
  cursor: pointer;
}

.control > div > img {
  width: 80%;
  position: relative;
  top: 15%;
}
#btnCar {
  top: 10px;
}

#btnWayPoint {
  top: 20px;
}

#btnRoute {
  top: 30px;
}
</style>