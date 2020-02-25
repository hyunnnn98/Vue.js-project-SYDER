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
        <img v-if="drawer" src="../imgs/arrow_re.png" alt="화살표" width="100%" />
        <img v-else src="../imgs/arrow.png" alt="화살표" width="100%" />
      </div>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant ">
          <v-list-item-content class="sideHeader">
            <!-- <div>SYDER</div> -->
            <div>차량관리</div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="sideContent">
          <img src="../imgs/car.png" alt="자동차" />
          <v-list-item-content>
            <div class="sideContentHeader">실시간 운행 현황</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="sideContentTable">
          <table>
            <tr>
              <td>호수</td>
              <td>운행상태</td>
              <td class="sideFullTable">출발지</td>
              <td class="sideFullTable">도착지</td>
              <td class="sideFullTable">출발시간</td>
              <td>도착예상시간</td>
              <td class="sideFullTable">발신자</td>
              <td class="sideFullTable">수신자</td>
            </tr>
            <tr v-for="car in cars" :key="car">
              <td>{{ car }}</td>
              <td>운행중</td>
              <td class="sideFullTable">정문</td>
              <td class="sideFullTable">도서관</td>
              <td class="sideFullTable">11:00</td>
              <td>11:23</td>
              <td class="sideFullTable">조승현</td>
              <td class="sideFullTable">이주용</td>
            </tr>
          </table>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: ["cars"],
  data() {
    return {
      drawer: false,
      color: "rgba(177, 177, 177, 0.853)",
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
  top: 30px !important;
  height: 691px !important;
  width: 430px !important;
  border: 1px solid rgba(0, 0, 0, 0.753);
}

.sidePush {
  position: absolute;
  top: 42%;
  right: -1.9rem;
  width: 30px;
  height: 80px;
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 0px 1px 2px rgb(165, 165, 165);
  background-color: rgba(255, 255, 255, 0.74);
}

.sidePush > img {
  position: relative;
  top: 30%;
  padding: 5px;
}

.sideHeader,
.sideContentHeader {
  /* font-weight: bold; */
  font-size: 1.4rem;
  font-family: "배달의민족 주아";
}

.sideHeader > div {
  padding: 3px;
}

.sideContent > img {
  width: 50px;
  margin-left: 5px;
}

.sideContentHeader {
  padding-left: 0.5rem;
}

.sideContentTable > table {
  text-align: center;
  border-collapse: collapse;
  font-size: 0.9rem;
  cursor: pointer;
}

.sideContentTable > table > tr > td {
  background-color: rgba(255, 255, 255, 0.795);
  border: 2px solid rgb(112, 111, 111);
  width: 200px;
  height: 30px;
}

.sideContentTable > table > tr:hover {
  background-color: rgb(80, 80, 80);
}

.sideContentTable > table > tr:nth-child(1) {
  background-color: rgb(0, 130, 236);
  font-weight: bold;
}

.sideContentTable > table > tr > td:nth-child(1) {
  width: 100px;
}

.sideFullTable {
  display: none;
}

.v-navigation-drawer:hover {
  width: 1100px !important;
}

.v-navigation-drawer:hover .sideFullTable {
  display: table-cell;
}
</style>