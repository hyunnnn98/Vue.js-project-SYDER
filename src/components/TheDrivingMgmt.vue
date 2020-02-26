<template>
  <v-card class="mgmt_main" outlined>
    <v-list-item two-line>
      <p class="title">{{ title }}</p>
    </v-list-item>
    <v-card-actions>
      <v-btn text>Chart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import bus from "../utils/bus.js";

export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
      // console.log("title: ", title);
      // console.log('getData: ', this.$route)
    }
  },
  created() {
    bus.$on("set:pageTitle", payload => {
      console.log("set:payload: ", payload);
      this.getTitle(payload);
    });
    // 이벤트버스 계속 쌓이는거 처리해야 함!!
  },
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
</style>