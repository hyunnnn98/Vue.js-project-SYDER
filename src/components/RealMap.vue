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
      @click="mouseClick"
      @mousemove="mouseMove"
    ></VueDaumMap>
    <!-- 좌측 상단 차량관리 메뉴 div -->
    <map-sider-bar :cars="cars"></map-sider-bar>
    <!-- 우측 상단 맵 셋팅 버튼 div -->
    <map-side-button :cars="cars"></map-side-button>
    <!-- 좌측 하단 차량 상태 div -->
    <map-car-state></map-car-state>
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
import VueDaumMap from 'vue-daum-map';
import bus from '@/utils/bus';
import MapSiderBar from './mapControl/MapSideBar';
import MapCarState from './mapControl/MapCarState.vue';
import MapSideButton from './mapControl/MapSideButton.vue';

export default {
  components: { VueDaumMap, MapSiderBar, MapCarState, MapSideButton },
  watch: {
    fixedCars: () => {
      this.setMarker('fixedCars');
    },
  },
  data: () => ({
    map: null, // 지도 객체. 지도가 로드되면 할당
    appKey: process.env.VUE_APP_DAUM_APPKEY, // appkey
    center: { lat: 35.89608031958812, lng: 128.62202439342738 }, // 지도의 중심 좌표
    level: 2, // 지도의 레벨(확대, 축소 정도),
    mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    libraries: ['drawing'], // 추가로 불러올 라이브러리
    scrollwheel: false,
    // ======== 여기까지가 기본 맵 data =======
    cars: ['1호차', '2호차', '3호차'],
    mouseMovePoint: { lat: null, lng: null },
    mouseClickPoint: { lat: null, lng: null },
    setRoute: { load: false, route: null },
    fixedCars: {
      markers: [],
      customOverlay: [],
      delete: true,
      // 차량 초기 위치는 학교 주차장으로 임시 설정.
      location: [],
    },
    fixedMarkers: {
      markers: [],
      customOverlay: [],
      delete: true,
      location: [],
    },
  }),
  methods: {
    onLoad(map) {
      this.map = map;
      // var mapTypeControl = new kakao.maps.MapTypeControl();
      // map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT + 10);
      this.fixedMarkers.location = this.$store.state.wayPoint;
    },
    mouseMove(mouseMovePoint) {
      this.mouseMovePoint.lat = mouseMovePoint[0].latLng.Ha.toFixed(6);
      this.mouseMovePoint.lng = mouseMovePoint[0].latLng.Ga.toFixed(6);
    },
    mouseClick(mouseMovePoint) {
      this.mouseClickPoint.lat = mouseMovePoint[0].latLng.Ha;
      this.mouseClickPoint.lng = mouseMovePoint[0].latLng.Ga;
    },
    goBackHome() {
      this.center.lat = 35.89608031958812;
      this.center.lng = 128.62202439342738;
    },
    setMarker(dataset) {
      // console.log('마커 타입: ', dataset);
      // setMarker 초기화 작업
      console.log('마커 데이터셋', this.fixedCars);
      let imgUrl = null,
        className = null,
        content = null,
        imageOption = null,
        markerSet = null,
        length = 0;

      switch (dataset) {
        case 'fixedCars':
          dataset = this.fixedCars;
          className = 'carName';
          imageOption = { offset: new kakao.maps.Point(25, 45) };
          break;

        case 'fixedMarkers':
          this.fixedMarkers.location = this.$store.state.points;
          dataset = this.fixedMarkers;
          imgUrl =
            'https://user-images.githubusercontent.com/52916934/75136661-b5492700-5728-11ea-9e5a-2a0085acb79b.png';
          className = 'wayPointName';
          imageOption = { offset: new kakao.maps.Point(25, 35) };
          break;
      }

      // markerSet을 통해 마커 생성 / 삭제 여부 결정
      markerSet = dataset.delete;
      length = dataset.location.length;

      if (markerSet === true) {
        console.log('마커 생성 영역입니다.');
        for (let i = 0; i < length; i++) {
          // 변경되지 않는 마커값은 뛰어넘기로 함
          if (
            dataset === this.fixedCars &&
            dataset.location[i].change == false
          ) {
            console.log(`${i + 1} 번째 마커는 변경되지 않았습니다.`);
            continue;
          }

          // 현재 location 설정
          let markerPosition = new kakao.maps.LatLng(
            dataset.location[i].lat,
            dataset.location[i].lng,
          );

          // 마커 content 생성
          if (dataset === this.fixedCars) {
            const status = dataset.location[i].status;
            content = `<div class="markInfo">
                        <div class=${className} id=${dataset.location[i].name}>${dataset.location[i].name}</div>
                        <div class="carInfo">
                          <div>배터리: 90%</div>
                          <div>누적이동거리: 2.3KM</div>
                        </div>
                      </div>`;
            switch (status) {
              case '운행중':
                imgUrl =
                  'https://user-images.githubusercontent.com/52916934/75231587-0cb6c800-57f9-11ea-8000-cb0ee4167b3f.png';
                break;
              case '운행예약':
                imgUrl = '';
                break;
              case '운행대기':
                imgUrl =
                  'https://user-images.githubusercontent.com/52916934/75230899-d9c00480-57f7-11ea-8c07-88eec9c8b294.png';
                break;
              case '이상차량':
                imgUrl =
                  'https://user-images.githubusercontent.com/52916934/75231584-0a546e00-57f9-11ea-9143-dbc76c54e74e.png';
                content = `<div class="markInfo">
                            <div class=${className}>${dataset.location[i].name}</div>
                            <div class="carInfo">
                              <div>배터리: 90%</div>
                              <div>누적이동거리: 2.3KM</div>
                            </div>
                            <div class="autoControlDiv">
                              <div class="autoControlInfo">
                                원격제어
                                <div class="autoControlAcessButton">
                                <p>허가</p>
                                </div>
                              </div>
                            </div>
                          </div>`;
                break;
            }
          } else {
            content = `<div class="markInfo">
                        <div class=${className}>${dataset.location[i].name}</div>
                      </div>`;
          }

          // 마커 커스텀 이미지
          let imageSrc = imgUrl, // 마커이미지의 주소 (이미지 만료 : 2020-08-27)
            imageSize = new kakao.maps.Size(45, 45); // 마커이미지의 크기

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          );

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정 (커스텀)
          });

          // 유저가 장소 지정 시 커스텀 오버레이를 지도에 생성
          const customOverlay = new kakao.maps.CustomOverlay({
            map: this.map,
            position: markerPosition,
            content: content,
            yAnchor: 1,
          });
          // 마커 dataset 복사.
          dataset.markers.push(marker);
          dataset.customOverlay.push(customOverlay);
          // 마커를 지도에 생성
          marker.setMap(this.map);

          if (dataset == this.fixedCars) {
            // console.log('접속!');
            // this.$store.commit('setCarLocation', this.fixedCars.location);
          } else {
            dataset.delete = !markerSet;
          }
        }
      } else {
        // 시뮬레이션 과정중일땐 지도에 생성 후 자동삭제.
        console.log('마커 삭제 영역입니다.');
        if (dataset == this.fixedCars) {
          for (let i in dataset.location) {
            if (dataset.markers.length == 0) {
              break;
            } else if (dataset.location[i].change == true) {
              let data = dataset.markers[0].Pa.Qe.innerText;
              let count = data.indexOf(dataset.location[i].name) / 4;

              console.log('count', count);
              if (count != 0 && count != 1 && count != 2) break; // 초기설정 값이 없는 경우 마커 삭제 명령 취소

              dataset.markers[count].setMap(null);
              // dataset.markers[count + 1].setMap(null);
              dataset.customOverlay[count].setMap(null);
              // dataset.customOverlay[count + 1].setMap(null);
              dataset.markers.splice(count, 1);
              dataset.customOverlay.splice(count, 1);
            }
          }
          dataset.delete = !markerSet;
        } else {
          for (let i in dataset.markers) {
            dataset.markers[i].setMap(null);
            dataset.customOverlay[i].setMap(null);
          }
          // fixed 마커의 배열 초기화.
          dataset.markers.splice(0);
          dataset.customOverlay.splice(0);
          dataset.delete = !markerSet;
        }
      }
    },
    routeSimulation() {
      // 넘어올 때 path정보, 출발 ~ 도착지 정보 전송해줘야 함.
      if (this.setRoute.load === false) {
        this.setRoute.route = new kakao.maps.Polyline({
          map: this.map,
          // 여기를 동적으로 path값 넣어 줘야 함.
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
            new kakao.maps.LatLng(35.8963335197566, 128.62229259275298),
          ],
          strokeWeight: 8,
          strokeColor: '#42b883',
          strokeOpacity: 0.9,
          // strokeStyle: "dashed"
        });
        this.setRoute.route.setMap(this.map);

        // 루트에 마우스 오버시 info 출력
        let customOverlay = null;
        kakao.maps.event.addListener(
          this.setRoute.route,
          'mouseover',
          mouseEvent => {
            let markerPosition = new kakao.maps.LatLng(
              mouseEvent.latLng.Ha,
              mouseEvent.latLng.Ga,
            );

            let content = `<div class="route">
                             <div class="routeInfo">
                              <p>< 후문 ~ 정문 ></p>
                              <p>총 거리 : 0.3KM</p>
                              <p>이동시간 : 3분</p>
                             </div>
                          </div>`;

            customOverlay = new kakao.maps.CustomOverlay({
              map: this.map,
              position: markerPosition,
              content: content,
              yAnchor: 1,
            });
          },
        );

        // 루트에 마우스 아웃시 info 제거
        kakao.maps.event.addListener(
          this.setRoute.route,
          'mouseout',
          mouseEvent => {
            customOverlay.setMap(null);
          },
        );
      } else {
        this.setRoute.route.setMap(null);
      }
      this.setRoute.load = !this.setRoute.load;
    },
    zoomIn() {
      if (this.level === 1) return;
      else this.level--;
    },
    zoomOut() {
      if (this.level === 4) return;
      else this.level++;
    },
  },
  created() {
    bus.$on('set-Marker', MarkerType => {
      this.setMarker(MarkerType);
    });
    bus.$on('route-Simulation', () => {
      this.routeSimulation();
    });
    bus.$on('go-Back-Home', () => {
      this.goBackHome();
    });
    bus.$on('updateCar', locationData => {
      // fixedCars.delete 속성이 true/false로 바뀌어가면서 다음 marker를 찍어야 한다.
      // 여기 첫번째 들어갈 로직이 만약, 화면상에 차량이 띄워져있으면
      // 마커 지우고 -> 마커 재생성 과정이 필요하다.
      this.fixedCars.location = locationData;

      // 마커가 이미 떠 있는 상태  delete == true 면 초기화 작업 실행.
      if (this.fixedCars.delete == true) {
        this.fixedCars.delete = false;
        this.setMarker('fixedCars');
      }
      this.setMarker('fixedCars');
      this.fixedCars.delete = true;
    });
  },
};
</script>
