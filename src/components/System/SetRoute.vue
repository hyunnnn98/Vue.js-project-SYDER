<template>
  <div class="SYSTEM-MAIN">
    <h1 class="page-header">경로 관리 페이지</h1>
    <div class="SYSTEM-CONTENT">
      <!-- 다음 웹 -->
      <daum-map @clickMap="clickMap"></daum-map>
      <!-- 웨이포인트 추가 DIV -->
      <div class="SYSTEM-RIGHT">
        <!-- 좌표 계기판 -->
        <button class="btn btn-primary mb-4">경로 지정 활성</button>
        <ul class="plus mb-1">
          <p>
            경로 지정 활성 버튼을 누튼 뒤<br />
            지도를 클릭하여
            <strong>위도 경도</strong>를 지정하세요.
          </p>
          <li>
            <select class="form-control" name="start_point" id="start_point">
              <option value="" disabled selected style="display:none"
                >출발지점</option
              >
              <option value="">정문</option>
              <option value="">후문</option></select
            >
          </li>
          <li>
            <select class="form-control" name="endPoint" id="endPoint">
              <option value="" disabled selected style="display:none"
                >도착지점</option
              >
              <option value="">정문</option>
              <option value="">후문</option></select
            >
          </li>
          <li>
            <textarea
              class="form-control"
              id="locations"
              type="text"
              rows="9"
              v-model="locations"
              placeholder="위도 / 경도"
            />
          </li>
          <p class="log">{{ logMessage }}</p>
        </ul>
        <button class="btn btn-primary mb-2" @click="submitForm">추가</button>
        <button class="btn btn-primary disabled">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import DaumMap from '@/components/System/common/DaumMap.vue';

export default {
  components: {
    DaumMap,
  },
  data() {
    return {
      // *** 맵 관련 Data ***
      start_point: '',
      end_point: '',
      locations: [],
      lat: '',
      lng: '',
      point: '',
      //   API 함수 관련 Data
      logMessage: '',
    };
  },
  methods: {
    clickMap(data) {
      console.log('getData: ', data);
      this.lat = data.click_Lat;
      this.lng = data.click_Lng;
    },
    submitForm() {
      if (this.lat === '' || this.lng === '' || this.point === '') {
        this.logMessage = `위도,경도,이름을 입력하세요.`;
        return;
      }
      this.logMessage = `${this.point}지점이 추가되었습니다.`;
      this.initForm();
    },
    initForm() {
      (this.lat = ''), (this.lng = ''), (this.point = '');
    },
  },
};
</script>

<style></style>
