<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :mini-variant="miniVariant"
      :right="right"
      :hide-overlay="hideOverlay"
      :width="width"
      absolute
      id="sidebar"
    >
      <div class="sidePush" @click="sideControl()">
        <img
          v-if="drawer"
          src="../../imgs/arrow_re.png"
          alt="화살표"
          width="100%"
        />
        <img v-else src="../../imgs/arrow.png" alt="화살표" width="100%" />
      </div>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant">
          <v-list-item-content class="sideHeader">
            <div>2020년 3월 2일 월요일 차량관리</div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- 오늘의 배송 현황 -->
        <v-list-item class="sideContent">
          <img src="../../imgs/postman.png" alt="자동차" />
          <v-list-item-content>
            <div class="sideContentHeader">오늘의 배송 현황</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item id="deliveryInfo">
          <table>
            <tr>
              <td>배송예약</td>
              <td>배송완료</td>
            </tr>
            <tr>
              <td>
                <p>03</p>
                건
              </td>
              <td>
                <p>29</p>
                건
              </td>
            </tr>
          </table>
        </v-list-item>
        <v-divider></v-divider>
        <!-- 실시간 운행 현황 -->
        <v-list-item class="sideContent">
          <img src="../../imgs/car.png" alt="자동차" />
          <v-list-item-content>
            <div class="sideContentHeader">실시간 운행 현황</div>
            <div id="carDetaileInfo" @click="openCarDetaileInfo()">
              <img
                id="carDetaileInfoImg"
                src="../../imgs/enlargement.png"
                alt="인포메이션"
              />
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="sideContentTable">
          <table @click="openCarDetaileInfo()">
            <tr>
              <td>호수</td>
              <td>운행상태</td>
              <td id="sideFullTable">출발지</td>
              <td id="sideFullTable">도착지</td>
              <td id="sideFullTable">출발시간</td>
              <td>도착예상시간</td>
              <td id="sideFullTable">발신자</td>
              <td id="sideFullTable">수신자</td>
            </tr>
            <tr v-for="car in cars" :key="car">
              <td>{{ car }}</td>
              <td>운행중</td>
              <td id="sideFullTable">정문</td>
              <td id="sideFullTable">도서관</td>
              <td id="sideFullTable">11:00</td>
              <td>11:23</td>
              <td id="sideFullTable">조승현</td>
              <td id="sideFullTable">이주용</td>
            </tr>
          </table>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: ['cars'],
  data() {
    return {
      drawer: false,
      color: 'rgba(177, 177, 177, 0.753)',
      right: false,
      width: 350,
      miniVariant: false,
      background: false,
      hideOverlay: true,
    };
  },
  computed: {},
  methods: {
    sideControl() {
      if (this.drawer === true) {
        this.closeCarDetaileInfo();
        // document.querySelector("#sideFullTable").style.display = "none";
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    openCarDetaileInfo() {
      const table = document.querySelectorAll('#sideFullTable');
      for (const td of table) {
        td.style.display = 'table-cell';
      }
      const sideBar = document.querySelector('.v-navigation-drawer');
      sideBar.style.width = '60%';
    },
    closeCarDetaileInfo() {
      const sideBar = document.querySelector('.v-navigation-drawer');
      sideBar.style.width = '350px';
      const table = document.querySelectorAll('#sideFullTable');
      for (const td of table) {
        td.style.display = 'none';
      }
    },
  },
};
</script>

<style>
.v-navigation-drawer {
  z-index: 200;
  overflow: visible !important;
  top: 42px !important;
  height: 731px !important;
  width: 400px;
  font-family: '배달의민족 주아';
}

.sidePush {
  position: absolute !important;
  top: 42%;
  right: -2.1rem;
  width: 30px;
  height: 80px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 1px 5px rgb(165, 165, 165);
  background-color: rgba(255, 255, 255, 0.822);
}

.sidePush > img {
  position: relative;
  top: 30%;
  padding: 5px;
}

.sideHeader,
.sideContentHeader {
  padding-top: 4px;
  font-size: 1.4rem;
  /* font-family: "배달의민족 주아"; */
}

.sideHeader > div {
  padding: 3px;
}

.sideContent > img {
  width: 50px;
  margin-left: 5px;
  margin-top: 4px;
}

.sideContentHeader {
  margin-top: 7px;
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
  width: 150px;
  height: 30px;
}

.sideContentTable > table > tr:hover {
  background-color: rgb(80, 80, 80);
}

.sideContentTable > table > tr:nth-child(1) {
  background-color: rgb(0, 130, 236);
  /* font-family: "배달의민족 주아"; */
  font-size: 1rem;
}

.sideContentTable > table > tr > td:nth-child(1) {
  width: 100px;
}

#carDetaileInfo > img {
  width: 20px;
  position: absolute;
  left: 220px;
  top: 20px;
  cursor: pointer;
}

#sideFullTable {
  display: none;
}

#deliveryInfo {
  /* background-color: red; */
  padding: 0px 0px 10px 0px;
}

#deliveryInfo > table {
  margin: 0 auto;
  text-align: center;
  font-family: '배달의민족 주아';
}

#deliveryInfo > table > tr > td {
  width: 100px;
  padding: 10px;
}

#deliveryInfo > table > tr > td > p {
  display: inline-block;
  font-size: 3rem;
}
</style>
