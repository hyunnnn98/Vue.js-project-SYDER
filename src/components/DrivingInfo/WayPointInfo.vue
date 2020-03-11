<template>
  <div class="mgmt_main">
    <p class="title">웨이포인트 조회</p>
    <div class="wayPoint">
      <VueDaumMap
        class="daumWayPoint"
        :appKey="appKey"
        :center.sync="center"
        :level.sync="level"
        :mapTypeId="mapTypeId"
        :libraries="libraries"
        :scrollwheel="scrollwheel"
        @load="onLoad"
      ></VueDaumMap>
      <div class="wayPointRight">
        <v-radio-group v-model="searchType" id="wayPointRadio">
          <v-radio
            label="발신지 조회"
            :color="color"
            value="searchType1"
          ></v-radio>
          <v-radio
            label="수신지 조회"
            :color="color"
            value="searchType2"
          ></v-radio>
          <!-- {{ searchType }} -->
        </v-radio-group>
        <!-- <bar-chart class="wayPointChart" :Type="type"></bar-chart> -->
      </div>
    </div>
  </div>
</template>

<script>
import VueDaumMap from 'vue-daum-map';
import bus from '@/utils/bus';

export default {
  components: { VueDaumMap },
  data: () => {
    return {
      //   ============== 다음 MAP API ===========
      map: null, // 지도 객체. 지도가 로드되면 할당
      appKey: process.env.VUE_APP_DAUM_APPKEY, // appkey
      center: { lat: 35.89608081958812, lng: 128.62192439342738 }, // 지도의 중심 좌표
      level: 2, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: ['drawing'], // 추가로 불러올 라이브러리
      scrollwheel: false,
      //   ============== 다음 MAP API ===========
      searchType: '',
      color: '#ff9800',
      // ================ Chart.Js ===============
      type: 'horizontalBar',
    };
  },
  methods: {
    onLoad(map) {
      this.map = map;
    },
  },
};
</script>

<style>
.wayPoint {
  display: flex;
  justify-content: space-around;
}

.daumWayPoint {
  /* border: 3px solid rgba(51, 51, 50, 0.479); */
  border-radius: 15px;
  box-shadow: 0px 3px 10lopx rgba(0, 0, 0, 0.438);
  border-top-left-radius: 20px;
  min-width: 860px;
  height: 600px;
}

.wayPointRight {
  width: 35%;
  border: 3px solid rgba(51, 51, 50, 0.479);
  border-bottom-right-radius: 20px;
}

#wayPointRadio {
  position: relative;
  top: 0rem;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 10px;
  font-family: 'Jua';
}

#wayPointRadio * {
  color: black;
  font-size: 1.5rem;
}
</style>
