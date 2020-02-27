<template>
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
        <v-radio label="발신지 조회" :color="color" value="searchType1"></v-radio>
        <v-radio label="수신지 조회" :color="color" value="searchType2"></v-radio>
        {{ searchType }}
      </v-radio-group>
    </div>
  </div>
</template>

<script>
import VueDaumMap from "vue-daum-map";

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
      libraries: ["drawing"], // 추가로 불러올 라이브러리
      scrollwheel: false,
      //   ============== 다음 MAP API ===========
      searchType: "",
      color: "#ff9800"
    };
  },
  methods: {
    onLoad(map) {
      this.map = map;
    }
  }
};
</script>

<style>
.wayPoint {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.daumWayPoint {
  border: 8px solid rgba(3, 181, 235, 0.479);
  min-width: 660px;
  height: 600px;
}

.wayPointRight {
  width: 70%;
  border: 8px solid rgba(3, 181, 235, 0.479);
}

#wayPointRadio {
  /* background-color: red; */
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-family: "배달의민족 주아";
}

#wayPointRadio * {
  color: black;
  font-size: 1.5rem;
}
</style>