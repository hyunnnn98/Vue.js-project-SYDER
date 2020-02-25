<template>
  <div class="map">
    <VueDaumMap
      class="daumMap"
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      :scrollwheel="scrollwheel"
      @load="onLoad"
      @click="mousePoint"
      @mousemove="mouseMove"
    ></VueDaumMap>
    <the-sider-bar :cars="fixedCars.cars"></the-sider-bar>
    <!-- 우측 상단 맵 셋팅 버튼 div -->
    <div class="control">
      <div id="btnCar" @click="setMarker(fixedCars)">
        <img src="../imgs/car.png" alt="car" />
        <ul id="numberOfCar">
          <li v-for="car in fixedCars.cars" :key="car" @click="setMarker(fixedCars)">
            {{ car }}
            <img src="../imgs/car.png" alt="car" />
          </li>
        </ul>
      </div>
      <div id="btnWayPoint" @click="setMarker(fixedMarkers)">
        <img src="../imgs/location.png" alt="wayPoint" />
      </div>
      <div id="btnRoute" @click="routeSimulation()">
        <img src="../imgs/track.png" alt="track" />
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
        <img src="../imgs/school.png" alt="home" />
      </div>
    </div>
    <!-- 좌측 하단 차량 상태 div -->
    <div class="carState">
      <tr>
        <td>운행 대기</td>
        <td>운행 예약</td>
        <td>운행 중</td>
        <td>이상 차량</td>
      </tr>
      <tr>
        <td>
          <img src="../imgs/car.png" alt="car" />
          <p>0</p>
        </td>
        <td>
          <img src="../imgs/car.png" alt="car" />
          <p>0</p>
        </td>
        <td>
          <img src="../imgs/car.png" alt="car" />
          <p>3</p>
        </td>
        <td>
          <img src="../imgs/car.png" alt="car" />
          <p>0</p>
        </td>
      </tr>
    </div>
    <!-- 위도, 경도 표식 div -->
    <div class="mousePoint">
      <span>위도 : {{ this.mouseMovePoint.lat }}</span>
      <span>경도 : {{ this.mouseMovePoint.lng }}</span>
    </div>
    <!-- 지도 확대, 축소 컨트롤 div-->
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn()">
        <img src="../imgs/plus.png" alt="plus" />
      </span>
      <span @click="zoomOut()">
        <img src="../imgs/minus.png" alt="plus" />
      </span>
    </div>
  </div>
</template>

<script>
import VueDaumMap from "vue-daum-map";
import TheSiderBar from "./TheSideBar";

export default {
  components: { VueDaumMap, TheSiderBar },
  computed: {
    getWayPoint() {
      console.log('WayPoint 불러왔음!')
      return this.$store.state.way;
    }
  },
  data: () => ({
    appKey: "1bee1de1f2e9f5b2f92560ff552da65f", // 테스트용 appkey
    center: { lat: 35.89608031958812, lng: 128.62202439342738 }, // 지도의 중심 좌표
    level: 2, // 지도의 레벨(확대, 축소 정도),
    mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    libraries: ["drawing"], // 추가로 불러올 라이브러리
    map: null, // 지도 객체. 지도가 로드되면 할당됨.
    scrollwheel: false,
    // ======== 여기까지가 기본 맵 data =======
    mouseMovePoint: { lat: null, lng: null },
    mouseClickPoint: { lat: null, lng: null },
    now: { lat: null, lng: null },
    search: { lat: null, lng: null, name: [] },
    gpsSimulationValue: { lat: null, lng: null, name: [], delete: true },
    routeSimulationValue: { lat: [], lng: [], name: [] },
    markerCount: 1,
    setRoute: { load: false, route: null },
    fixedCars: {
      markers: [],
      customOverlay: [],
      delete: true,
      cars: ["1호차", "2호차", "3호차"],
      location: [
        {
          name: "1호차",
          lat: "35.89536207369231",
          lng: "128.62332765392847",
          status: "운행중"
        },
        {
          name: "2호차",
          lat: "35.896279612631304",
          lng: "128.62027860119983",
          status: "운행대기"
        },
        {
          name: "3호차",
          lat: "35.89599273182369",
          lng: "128.62333776402747",
          status: "이상차랑"
        }
      ]
    },
    fixedMarkers: {
      markers: [],
      customOverlay: [],
      delete: true,
      location: [
        // { name: "도서관", lat: "35.895283628307844", lng: "128.62263110115015" },
        // { name: "공학관", lat: "35.896353390108295", lng: "128.62182230803094" },
        // { name: "연서관", lat: "35.89673113828357", lng: "128.62287661375532" },
        // { name: "본관", lat: "35.89651185766645", lng: "128.6209312278672" },
        // { name: "정문", lat: "35.89525270148666", lng: "128.6235856808051" },
        // { name: "후문", lat: "35.89624037999641", lng: "128.6201808948049" }
      ]
    }
  }),
  methods: {
    onLoad(map) {
      this.map = map;
      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);
      this.fixedMarkers.location = this.getWayPoint;
    },
    mouseMove(mouseMovePoint) {
      this.mouseMovePoint.lat = mouseMovePoint[0].latLng.Ha.toFixed(6);
      this.mouseMovePoint.lng = mouseMovePoint[0].latLng.Ga.toFixed(6);
    },
    goBackHome() {
      this.center.lat = 35.89608031958812;
      this.center.lng = 128.62202439342738;
    },
    mousePoint(mouseMovePoint) {
      this.mouseClickPoint.lat = mouseMovePoint[0].latLng.Ha;
      this.mouseClickPoint.lng = mouseMovePoint[0].latLng.Ga;
    },
    setMarker(dataset) {
      let display     = dataset.delete;
      let imgUrl      = null;
      let length      = 0;
      let className   = null;
      let content     = null;
      let imageOption = null;
      if (dataset === this.fixedMarkers) {
        imgUrl =
          "https://user-images.githubusercontent.com/52916934/75136661-b5492700-5728-11ea-9e5a-2a0085acb79b.png";
        // 일단 웨이포인트는 전체로 나타내려고 fixedRoute로 정의했음.
        length = dataset.location.length;
        className = "wayPointName";
        imageOption = { offset: new kakao.maps.Point(25, 35) };
        // dataset.location = this.getWayPoint;
      } else if (dataset === this.fixedCars) {
        length = dataset.location.length;
        className = "carName";
        imageOption = { offset: new kakao.maps.Point(25, 45) };
      }

      if (display === true) {
        for (let i = 0; i < length; i++) {
          // 현재 location 설정
          let markerPosition = new kakao.maps.LatLng(
            dataset.location[i].lat,
            dataset.location[i].lng
          );

          if (dataset === this.fixedCars) {
            const status = dataset.location[i].status;
            switch (status) {
              case "운행중":
                imgUrl = "https://user-images.githubusercontent.com/52916934/75231587-0cb6c800-57f9-11ea-8000-cb0ee4167b3f.png";
                break;
              case "운행예약":
                imgUrl = "";
                break;
              case "운행대기":
                imgUrl = "https://user-images.githubusercontent.com/52916934/75230899-d9c00480-57f7-11ea-8c07-88eec9c8b294.png";
                break;
              case "이상차랑":
                imgUrl = "https://user-images.githubusercontent.com/52916934/75231584-0a546e00-57f9-11ea-9143-dbc76c54e74e.png";
                break;
            }
            content = `<div class="markInfo">
                        <div class=${className}>${dataset.location[i].name}</div>
                        <div class="carInfo">
                          <div>배터리: 90%</div>
                          <div>누적이동거리: 2.3KM</div>
                        </div>
                      </div>`;
          } else {
            content = `<div class="markInfo">
                        <div class=${className}>${dataset.location[i].waypoint_name}</div>
                      </div>`;
          }

          // 마크 커스텀
          let imageSrc = imgUrl, // 마커이미지의 주소 (이미지 만료 : 2020-08-27)
            imageSize = new kakao.maps.Size(45, 45); // 마커이미지의 크기

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 (커스텀)
          });

          // 유저가 장소 지정 시 커스텀 오버레이를 지도에 생성
          const customOverlay = new kakao.maps.CustomOverlay({
            map: this.map,
            position: markerPosition,
            content: content,
            yAnchor: 1
          });
          // 마커 dataset 복사.
          dataset.markers.push(marker);
          dataset.customOverlay.push(customOverlay);
          // 마커를 지도에 생성
          marker.setMap(this.map);
        }
      } else {
        // 시뮬레이션 과정중일땐 지도에 생성 후 자동삭제.
        // console.log("getData: ", this.fixedMarkers[0].markers.length);
        for (let i in dataset.markers) {
          dataset.markers[i].setMap(null);
          dataset.customOverlay[i].setMap(null);
        }
        // fixed 마커의 배열 초기화.
        dataset.markers.splice(0);
        dataset.customOverlay.splice(0);
      }
      dataset.delete = !display;
    },
    routeSimulation() {
      if (this.setRoute.load === false) {
        this.setRoute.load = true;
        this.setRoute.route = new kakao.maps.Polyline({
          map: this.map,
          path: [
            new kakao.maps.LatLng(35.89623422094425, 128.62013646906556),
            new kakao.maps.LatLng(35.896279612631304, 128.62027860119983),
            new kakao.maps.LatLng(35.89640230015868, 128.6205358286924),
            new kakao.maps.LatLng(35.8964995774788, 128.62083960798512),
            new kakao.maps.LatLng(35.896512961300466, 128.6211832086395),
            new kakao.maps.LatLng(35.896434077940036, 128.62151938968248),
            new kakao.maps.LatLng(35.89635800671141, 128.6218140959231),
            new kakao.maps.LatLng(35.896245151363686, 128.6221634262081),
            new kakao.maps.LatLng(35.89644662499194, 128.62242503324413),
            new kakao.maps.LatLng(35.896638175688906, 128.62242063656612),
            new kakao.maps.LatLng(35.89677889822415, 128.6231766171426),
            new kakao.maps.LatLng(35.896534311659266, 128.62327129847316),
            new kakao.maps.LatLng(35.89636205861439, 128.6225146764999),
            new kakao.maps.LatLng(35.89644662499194, 128.62242503324413),
            new kakao.maps.LatLng(35.896245151363686, 128.6221634262081),
            new kakao.maps.LatLng(35.8960728316727, 128.62241186652133),
            new kakao.maps.LatLng(35.89544381047474, 128.62211384877017),
            new kakao.maps.LatLng(35.895795903186894, 128.6207311225491),
            new kakao.maps.LatLng(35.896279612631304, 128.62027860119983),
            new kakao.maps.LatLng(35.895795903186894, 128.6207311225491),
            new kakao.maps.LatLng(35.89544381047474, 128.62211384877017),
            new kakao.maps.LatLng(35.89523480556241, 128.62290974598892),
            new kakao.maps.LatLng(35.89553687190858, 128.62306265598266),
            new kakao.maps.LatLng(35.8960750838904, 128.62241191248907),
            new kakao.maps.LatLng(35.89553687190858, 128.62306265598266),
            new kakao.maps.LatLng(35.89536207369231, 128.62332765392847),
            new kakao.maps.LatLng(35.89524099125535, 128.62361866635462),
            new kakao.maps.LatLng(35.89536207369231, 128.62332765392847),
            new kakao.maps.LatLng(35.89589824405511, 128.623161403206),
            new kakao.maps.LatLng(35.89595184822251, 128.6231957227864),
            new kakao.maps.LatLng(35.89599273182369, 128.62333776402747),
            new kakao.maps.LatLng(35.89628269956654, 128.62321909132402),
            new kakao.maps.LatLng(35.89615722686954, 128.62266831486897),
            new kakao.maps.LatLng(35.8963335197566, 128.62229259275298)
          ],
          strokeWeight: 5,
          strokeColor: "#42b883",
          strokeOpacity: 0.9
          // strokeStyle: "dashed"
        });
        this.setRoute.route.setMap(this.map);
      } else {
        this.setRoute.load = false;
        this.setRoute.route.setMap(null);
      }
    },
    zoomIn() {
      if (this.level === 1) return;
      else this.level--;
    },
    zoomOut() {
      if (this.level === 4) return;
      else this.level++;
    }
  },
  mounted() {}
};
</script>

<style>
.map {
  max-height: 690px;
  /* overflow: hidden; */
}

.daumMap {
  width: 100%;
  height: 690px;
}

.control,
.carState,
.mousePoint {
  position: absolute;
  z-index: 1;
  /* overflow: hidden; */
  font-weight: bold;
}

.control {
  width: 80px;
  height: 240px;
  top: 80px;
  right: 0px;
}

.carState {
  width: 400px;
  height: auto;
  left: 1rem;
  top: 39rem;
  background-color: rgba(255, 255, 255, 0.87);
  text-align: center;
  border-collapse: collapse;
  box-shadow: 0px 2px 5px rgb(165, 165, 165);
}

.mousePoint {
  width: 310px;
  height: 30px;
  line-height: 30px;
  right: 1rem;
  top: 41.5rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.781);
  color: rgb(26, 24, 24);
  border: 1.5px solid rgb(59, 59, 59);
  box-shadow: 0px 2px 5px rgb(165, 165, 165);
}

.mousePoint > span {
  padding: 5px;
}

.carState > tr > td {
  width: 100px;
  /* padding: 5px; */
  border: 2px solid rgb(97, 97, 97);
}

.carState > tr:nth-child(2) {
  font-size: 2rem;
  line-height: 1rem;
}

.carState > tr > td > p {
  position: relative;
  bottom: 5px;
  margin-left: 1rem;
  display: inline-block;
}

.carState > tr > td > img {
  width: 35px;
}

.control > div:hover {
  border: 4px solid rgb(2, 92, 194) !important;
}
/* 우측 상단 챠랑관련 버튼 제어 */
#btnCar,
#btnWayPoint,
#btnRoute,
#btnSchool {
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
#btnSchool {
  top: 40px;
}

/* 우측 차량 제어 상세 버튼 세부관리 */
#numberOfCar,
#selectPoint {
  display: none;
  width: 200px;
  height: 65px;
  position: absolute;
  top: -6px;
  left: -205px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.671);
  border: 3px solid rgb(2, 92, 194);
  box-shadow: 0px 2px 5px rgb(165, 165, 165);
}

#numberOfCar > li:hover {
  background-color: rgb(250, 80, 122);
  color: white;
}

#btnCar:hover > ul {
  display: flex;
}

#btnRoute:hover > div {
  display: flex;
}

#selectPoint {
  height: 120px;
}

#selectPoint > ul {
  margin: 0 auto;
  padding-bottom: 10px;
}

#selectPoint > ul > li {
  width: 180px;
  height: 30px;
  font-size: 0.9rem;
}

#selectPoint > ul > li:nth-of-type(3) {
  text-align: center;
  margin: 0.55rem auto;
  width: 60px;
  height: auto;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgb(165, 165, 165);
  background-color: rgb(46, 192, 89);
  color: white;
}

#numberOfCar > li > img {
  /* padding: 5px; */
  width: 35px;
  height: auto;
}

#carNumber > li:hover {
  background-color: red;
}

/*              마커 관련 style              */
.wayPointName,
.carName,
.carInfo {
  position: relative;
  bottom: -35px;
  left: 0px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 2px 8px;
  background: rgba(247, 247, 247, 0.76);
}

.markInfo {

}

.carName {
  bottom: -28px;
  left: -2px;
}

.carInfo {
  display: none;
  padding: 20px;
  bottom: 110px;
  left: -60px;
  background: rgba(247, 247, 247, 0.774);
}

.markInfo:hover .carInfo {
  display: block;
}

.wayPointName:nth-of-type(n),
.carName:nth-of-type(n),
.carInfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px rgb(165, 165, 165);
}

/* 사용자 컨트롤 (확대축소, 지도타입) */
.radius_border {
  border: 4px solid rgb(71, 71, 71);
  border-radius: 10px;
}

.custom_zoomcontrol {
  position: absolute;
  top: 35rem;
  right: 1.2rem;
  width: 50px;
  height: 90px;
  overflow: hidden;
  z-index: 1;
  background-color: #ffffff;
}

.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

.custom_zoomcontrol span img {
  position: relative;
  top: 1.5px;
  left: 1.5px;
  width: 40px;
  height: 40px;
  padding: 2px 2px;
  border: none;
}
/* .custom_zoomcontrol span:nth-of-type(1) {
} */
</style>