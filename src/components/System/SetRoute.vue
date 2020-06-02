<template>
  <div class="SYSTEM-MAIN">
    <!-- <h1 class="page-header">경로 관리 페이지</h1> -->
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
            <select
              class="form-control"
              name="start_point"
              v-model="start_point"
            >
              <option value="" disabled selected style="display:none">
                출발지점
              </option>
              <option v-for="(point, index) in points" :key="index">
                {{ point.name }}
              </option>
            </select>
          </li>
          <li>
            <select class="form-control" name="endPoint" v-model="end_point">
              <option value="" disabled selected style="display:none"
                >도착지점</option
              >
              <option v-for="(point, index) in points" :key="index">
                {{ point.name }}
              </option>
            </select>
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
import { setPath, getPaths, deletePaths } from '@/api/routes';
import axios from 'axios';

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
      points: null,
      //   API 함수 관련 Data
      logMessage: '',
    };
  },
  async mounted() {
    await this.$store.dispatch('FETCH_POINTS');
    this.points = this.$store.state.points;
  },
  methods: {
    clickMap(data) {
      console.log('getData: ', data);
      this.lat = data.click_Lat;
      this.lng = data.click_Lng;
      const location_data = {
        lat: data.click_Lat,
        lng: data.click_Lng,
      };
      this.locations.push(location_data);
    },
    async submitForm() {
      let num_start_point, num_end_point;
      await this.points.forEach(v => {
        if (this.start_point == v.name) num_start_point = v.id;
        else if (this.end_point == v.name) num_end_point = v.id;
      });

      setPath({
        starting_point: num_start_point,
        arrival_point: num_end_point,
        travel_time: 10,
        travel_distance: 13,
      })
        .then(res => {
          const set_data = {
            path_id: res.data.route.id,
            start_point: num_start_point,
            end_point: num_end_point,
            path_info: this.locations,
            travel_time: 10,
            travel_distance: 13,
          };
          axios
            .post('http://13.124.124.67/point/set', set_data)
            .then(res => {
              this.logMessage = `${this.start_point} - ${this.end_point}지점이 추가되었습니다.`;
            })
            .catch(err => {
              this.logMessage = `서버 에러로 실패하였습니다..`;
            });
        })
        .catch(err => {
          this.logMessage = `기존 경로와 일치합니다. 다른경로를 등록해주세요`;
        });
      this.initForm();
    },
    initForm() {
      (this.lat = ''), (this.lng = ''), (this.point = '');
    },
  },
};
</script>

<style></style>
