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
    </v-card-actions>
  </v-card>
</template>

<script>
import bus from "../../utils/bus.js";
import CarInfo from "./CarInfo.vue";
import DrivingInfo from "./DrivingInfo.vue";
import ErrorLogInfo from "./ErrorLogInfo.vue";
import WayPointInfo from "./WayPointInfo.vue";
import DatePicker from "../DatePicker.vue";

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
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 1.1rem 3rem;
  font-family: "Jua";
  font-size: 2rem;
  border-radius: 20px;
  box-shadow: 0px 3px 8px rgb(165, 165, 165);
  background-color: rgba(45, 211, 147, 0.479);
}

.sub_main {
  width: auto;
}
</style>