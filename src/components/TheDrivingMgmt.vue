<template>
  <v-card class="mgmt_main" outlined>
    <v-list-item two-line>
      <p class="title">{{ title }}</p>
      <p>
        <date-picker></date-picker>
      </p>
    </v-list-item>
    <v-card-actions class="sub_main">
      <driving-info v-if="this.routeName === 'driving'"></driving-info>
      <car-info v-else-if="this.routeName === 'carInfo'"></car-info>
      <way-point-info v-else-if="this.routeName === 'searchWayPoint'"></way-point-info>
      <error-log-info v-else-if="this.routeName ==='errorLog'"></error-log-info>
      <!-- <v-card outlined ></v-card>
      <v-card outlined ></v-card>
      <v-card outlined></v-card>
      <v-card outlined></v-card> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import bus from "../utils/bus.js";
import CarInfo from "./DrivingInfo/CarInfo.vue";
import DrivingInfo from "./DrivingInfo/DrivingInfo.vue";
import ErrorLogInfo from "./DrivingInfo/ErrorLogInfo.vue";
import WayPointInfo from "./DrivingInfo/WayPointInfo.vue";
import DatePicker from "./DatePicker.vue";

export default {
  components: {
    DatePicker, CarInfo, DrivingInfo, ErrorLogInfo, WayPointInfo
  },
  data() {
    return {
      title: "",
      routeName: "",
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
    }
  },
  created() {
    bus.$on("set:pageTitle", payload => {
      console.log("set:payload: ", payload);
      this.getTitle(payload);
    });
    this.routeName = this.$route.name;
    console.log("this.routeName: ", this.routeName);
  }
};
</script>

<style>
.mgmt_main {
  width: 100%;
}

.title {
  display: inline-block;
  background-color: rgba(3, 181, 235, 0.479);
  padding: 1.5rem 5rem;
  margin-top: 1rem;
  font-family: "배달의민족 주아";
  font-size: 2.5rem;
  border-radius: 20px;
  box-shadow: 0px 1px 2px rgb(165, 165, 165);
}

.sub_main {
  width: auto;
}
</style>