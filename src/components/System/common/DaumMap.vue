<template>
  <div>
    <VueDaumMap
      class="MAP"
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      :scrollwheel="scrollwheel"
      @load="onLoad"
      @click="clickMap"
    ></VueDaumMap>
    {{ setCustomPoint }}
    {{ setPoints }}
  </div>
</template>

<script>
import VueDaumMap from 'vue-daum-map';

export default {
  props: ['allPoints', 'setPoints', 'customPoint', 'setCustomPoint'],
  components: {
    VueDaumMap,
  },
  watch: {
    setPoints: function(data) {
      console.log('setPoints에 접근!', data);
      if (data == true) {
        this.testAPI(this.allPoints);
        this.$emit('resetAPI', 'setPoints');
      }
    },
    setCustomPoint: function(data) {
      console.log('setCustomPoint에 접근!', data);
      if (data == true) {
        this.testAPI(this.customPoint);
        this.$emit('resetAPI', 'setCustomReset');
      }
      // setCustomReset 상위 컴포넌트로 토스
    },
  },
  data: () => {
    return {
      //   *** 다음 MAP API ***
      map: null, // 지도 객체. 지도가 로드되면 할당
      appKey: process.env.VUE_APP_DAUM_APPKEY, // appkey
      center: { lat: 35.89608081958812, lng: 128.62192439342738 }, // 지도의 중심 좌표
      level: 2, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: ['drawing'], // 추가로 불러올 라이브러리
      scrollwheel: false,

      // *** custom Methods Data ***
      clicked: {
        click_Lat: '',
        click_Lng: '',
      },
      // *** API Data ***
      fixedPoints: {
        markers: [],
        customOverlay: [],
      }, // 전체 웨이포인트 담을 배열. +) 추가, 삭제 시 자동으로 서버에 업데이트하도록 구현하기.
    };
  },
  methods: {
    onLoad(map) {
      this.map = map;
      // const markerUpdate = document.querySelector('#update');
      // const markerDelete = document.querySelector('#delete');
      // const a = markerUpdate.dataset;
      // console.log('a: ', a);
    },
    clickMap(data) {
      console.log(data[0].latLng);
      const xyValue = data[0].latLng;
      this.clicked.click_Lat = xyValue.Ha;
      this.clicked.click_Lng = xyValue.Ga;
      // setPoint 상위 컴포넌트로 토스
      this.$emit('clickMap', this.clicked);
    },
    testAPI(data) {
      // 프롭스로 받아온 데이터 실행.
      this.setMarker(data);
    },
    setMarker(dataset) {
      // 데이터 셋 구성 전, 웨이포인트 관리 API를 통해, 받아온 dataset을 저장해두기 (배열형태로)
      //                                                => fixedPoint[] -> dataset.location에 들어가야함.
      // *** 데이터셋에 들어가야할 것들 ***
      // 1. 마커 종류(일반 웨이포인트 마커, 출발, 도착 마커) ==> dataset.markerType로 만들자.
      // 2. location[위도(click_Lat), 경도(click_Lng)], 마커 이름(props로 내려 받야아 함)
      //     => 파라메터의 markerName -> location.name에 들어가야함.

      // 3. 전체 dataset 구조 => dataset > {markerType: "", location: [{Lng,Lat,name}, ... (반복)],}
      console.log('setMarker 메서드 영역: ', dataset);
      // 마커 설정 초기화 작업
      let imgUrl = null,
        className = null,
        content = null,
        imageOption = null,
        markerSet = null;
      // length = 0;

      switch (dataset.markerType) {
        case 'startPoint':
          // dataset = this.startPoint;
          className = 'wayPointName';
          imgUrl = '출발지 IMG 예정..';
          imageOption = { offset: new kakao.maps.Point(25, 45) };
          break;

        case 'endPoint':
          // dataset = this.endPoint;
          className = 'wayPointName';
          imgUrl = '도착지 IMG 예정..';
          imageOption = { offset: new kakao.maps.Point(25, 45) };
          break;

        case 'fixedPoint':
          // dataset = this.fixedMarkers;
          className = 'wayPointName';
          imgUrl =
            'https://user-images.githubusercontent.com/52916934/75136661-b5492700-5728-11ea-9e5a-2a0085acb79b.png';
          imageOption = { offset: new kakao.maps.Point(25, 35) };
          break;
      }

      // 결정된 Dataset의 location[]을 통해 마커 찍을 마커 length 결정.
      const arrayLength = dataset.location.length;
      for (let i = 0; i < arrayLength; i++) {
        // console.log('for문 진입!', i);
        // 현재 location 설정
        // console.log('location: ', dataset.location);
        let markerPosition = new kakao.maps.LatLng(
          dataset.location[i].lat,
          dataset.location[i].lng,
        );
        // 마커 content 생성
        if (dataset.markerType === 'fixedPoint') {
          content = `<div class="markInfo">
                        <div class=${className}>${dataset.location[i].name}</div>
                        <div class="markUpdate">
                              <button id="update" class='btn btn-success mt-2'>수정</button>
                              <button id="delete" class='btn btn-danger mt-2'>삭제</button>
                        </div>
                        
                      </div>`;
        } else {
          let setName = '';
          dataset.markerType === 'startPoint'
            ? (setName = '출발')
            : (setName = '도착');
          content = `<div class="markInfo">
                        <div class=${className}>${setName}</div>
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
        this.fixedPoints.markers.push(marker);
        this.fixedPoints.customOverlay.push(customOverlay);
        // 마커를 지도에 생성
        marker.setMap(this.map);
      }

      // // 마커에 클릭이벤트를 등록
      const markers = this.fixedPoints.markers;
      console.log('markers: ', markers);

      for (let clickedMarkerNumber in markers) {
        kakao.maps.event.addListener(
          markers[clickedMarkerNumber],
          'click',
          () => {
            console.log('click!!!', clickedMarkerNumber);
            // 클릭했을 때 해당 마커의 위도, 경도, 이름 input박스에 로드.
            this.$emit('updatePoint', clickedMarkerNumber);
          },
        );
      }
      // *** 마커 삭제 관련 method ***
      // 시뮬레이션 과정중일땐 지도에 생성 후 자동삭제.
      // console.log("getData: ", this.fixedMarkers[0].markers.length);
      // for (let i in dataset.markers) {
      //   dataset.markers[i].setMap(null);
      //   dataset.customOverlay[i].setMap(null);
      // }
      // fixed 마커의 배열 초기화.
      // dataset.markers.splice(0);
      // dataset.customOverlay.splice(0);
    },
  },
};
</script>

<style></style>
