<template>
  <div>
    <div class="sidePushOn" @click="openBar()"></div>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :mini-variant="miniVariant"
      :right="right"
      absolute
    >
      <div class="sidePush" @click="sideControl()">
        <img v-if="drawer" src="../imgs/arrow_re.png" alt width="100%" />
        <img v-else src="../imgs/arrow.png" alt width="100%" />
      </div>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant ">
          <v-list-item-content class="sideHeader">
            <div>SYDER</div>
            <div>차량관리</div>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <img src="../imgs/car.png" alt width="8%" />
          <v-list-item-content>
            <div class="sideContentHeader">실시간 운행 현황</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="sideContentTable">
          <table>
            <tr>
              <td>호수</td>
              <td>운행상태</td>
              <td>도착예상시간</td>
            </tr>
            <tr>
              <td>1호차</td>
              <td>운행중</td>
              <td></td>
            </tr>
            <tr>
              <td>2호차</td>
              <td>운행 예약</td>
              <td></td>
            </tr>
            <tr>
              <td>3호차</td>
              <td>운행중</td>
              <td></td>
            </tr>
          </table>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      color: "rgba(177, 177, 177, 0.753)",
      right: false,
      miniVariant: false,
      background: false
    };
  },
  computed: {},
  methods: {
    sideControl() {
      if (this.drawer === true) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    }
  }
};
</script>

<style>
.v-navigation-drawer {
  overflow: visible;
  top: 37px !important;
  height: 71.5% !important;
  width: 400px !important;
  border: 1px solid rgba(0, 0, 0, 0.753);
}

.sidePush {
  position: absolute;
  top: 42%;
  right: -35px;
  width: 30px;
  height: 80px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid rgb(110, 110, 110);
  background-color: rgba(255, 255, 255, 0.74);
}

.sidePush > img {
    position: relative;
    top: 30%;
    padding: 5px;
}

.sideHeader,
.sideContentHeader {
  font-weight: bold;
  font-size: 0.9rem;
}

.sideHeader > div {
  padding: 3px;
}

.sideContentHeader {
  padding-left: 0.5rem;
}

.sideContentTable > table {
  text-align: center;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.sideContentTable > table > tr > td {
  background-color: rgba(255, 255, 255, 0.801);
  border: 2px solid rgb(112, 111, 111);
  width: 200px;
  height: 30px;
}

.sideContentTable > table > tr:nth-child(1) {
    background-color: rgb(117, 16, 250);
    font-weight: bold;
}

.sideContentTable > table > tr > td:nth-child(1) {
    width: 100px;
}
</style>