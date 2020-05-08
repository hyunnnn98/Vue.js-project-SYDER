<template>
  <div class="SYSTEM-MAIN">
    <h1 class="page-header">웨이포인트 관리 페이지</h1>
    <div class="SYSTEM-CONTENT">
      <!-- 다음 웹 -->
      <daum-map
        @clickMap="clickMap"
        @loadUpdatePoint="loadUpdatePoint"
        :customPoint="customData"
        :setPoints="setPoints"
        :resetPoints="resetPoints"
      >
      </daum-map>
      <!-- 웨이포인트 추가 DIV -->
      <div class="SYSTEM-RIGHT">
        <!-- 좌표 계기판 -->
        <button
          v-if="setPoints"
          class="btn btn-danger mb-4"
          @click="setPointsAPI"
        >
          전체 웨이포인트 지우기
        </button>
        <button v-else class="btn btn-success mb-4" @click="setPointsAPI">
          전체 웨이포인트 표시하기
        </button>
        <ul class="plus mb-2">
          <p>지도를 클릭하여 <strong>위도 경도</strong>를 입력하세요.</p>
          <li>
            <input
              class="form-control"
              id="lat"
              type="text"
              placeholder="위도"
              v-model="lat"
            />
          </li>
          <li>
            <input
              class="form-control"
              id="lng"
              type="text"
              placeholder="경도"
              v-model="lng"
            />
          </li>
          <li>
            <input
              class="form-control"
              id="POINT-NAME"
              type="text"
              placeholder="웨이포인트 이름을 입력하세요"
              v-model="point"
            />
          </li>
          <p class="log">{{ logMessage }}</p>
        </ul>
        <template v-if="update">
          <button class="btn btn-success mb-2 " @click="setUpdatePoint">
            수정
          </button>
          <button class="btn btn-danger mb-2 " @click="setDeletePoint">
            삭제
          </button>
          <button class="btn btn-primary mb-2 " @click="initForm">취소</button>
        </template>
        <template v-else>
          <button class="btn btn-primary mb-2" @click="submitForm">추가</button>
        </template>
        <p class="text-info p-2">
          ※마커를 클릭할 시 자동으로 입력됩니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DaumMap from '@/components/System/common/DaumMap.vue';
import { getPoints, setPoint, updatePoint, deletePoint } from '@/api/point';

export default {
  components: {
    DaumMap,
  },
  data() {
    return {
      // *** 맵 관련 Data ***
      lat: '',
      lng: '',
      point: '',
      id: '',
      logMessage: '',
      update: false,

      // *** 사용자 설정 customData ***
      customData: {
        markerType: 'fixedPoint',
        location: {
          lat: '',
          lng: '',
          name: '',
        },
      },
      setPoints: false,
      resetPoints: false,
    };
  },
  methods: {
    clickMap(data) {
      this.lat = data.click_Lat;
      this.lng = data.click_Lng;
    },
    setPointsAPI() {
      this.setPoints = !this.setPoints;
    },
    async submitForm() {
      // 유효성 검사
      if (this.lat === '' || this.lng === '' || this.point === '') {
        this.logMessage = `위도,경도,이름을 입력하세요.`;
        return;
      }
      // setPoint API
      const mapData = this.customData.location;
      mapData.lat = this.lat;
      mapData.lng = this.lng;
      mapData.name = this.point;
      mapData.guard = 'admin';
      try {
        const { data } = await setPoint(mapData);
        // console.log('submitForm: ', data);
        this.logMessage = `${this.point}지점이 추가되었습니다.`;
        this.initForm();
        this.resetPoints = !this.resetPoints;
      } catch (error) {
        this.logMessage = error.message;
      }
    },
    initForm() {
      (this.lat = ''), (this.lng = ''), (this.point = '');
      if (this.update === true) this.update = false;
    },
    // resetAPI(data) {
    //   console.log('resetAPI 진입!');
    //   data === 'setCustomReset'
    //     ? (this.setCustomPoint = !this.setCustomPoint)
    //     : (this.setPoints = !this.setPoints);
    // },
    loadUpdatePoint(point_Number) {
      console.log('getDaupdatePoint: ', point_Number);
      this.lat = this.$store.state.points[point_Number].lat;
      this.lng = this.$store.state.points[point_Number].lng;
      this.point = this.$store.state.points[point_Number].name;
      this.id = this.$store.state.points[point_Number].id;
      this.update = true;
    },
    async setUpdatePoint() {
      // this.initForm();
      // const mapData = [(lat = this.lat), (lng = this.lng)];
      const mapData = {
        lat: this.lat,
        lng: this.lng,
        guard: 'admin',
      };
      const { data } = await updatePoint(this.id, mapData);
      this.logMessage = data.message;
      this.resetPoints = !this.resetPoints;
    },
    async setDeletePoint() {
      const { data } = await deletePoint(this.id);
      this.logMessage = data.message;
      this.initForm();
      this.resetPoints = !this.resetPoints;
    },
  },
};
</script>

<style></style>
