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
      <v-list dense nav>
        <!-- <v-list-item two-line :class="miniVariant">
          <v-list-item-content class="sideHeader">
            <div>
              {{ nowDate.year }}년 {{ nowDate.month }}월 {{ nowDate.date }}일
              {{ nowDate.day }}요일 차량관리
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider> -->
        <!-- 오늘의 배송 현황 -->
        <v-list-item class="sideContent py-2">
          <img src="../../imgs/postman.png" alt="자동차" />
          <v-list-item-content>
            <div class="sideContentHeader">오늘의 배송 현황</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item id="deliveryInfo">
          <table>
            <tr>
              <td>배송중</td>
              <td>배송완료</td>
              <td>취소율</td>
            </tr>
            <tr>
              <td><span>03</span>건</td>
              <td><span>29</span>건</td>
              <td>
                <span>13</span>%
                <div class="point cancel">-3.5%</div>
              </td>
            </tr>
            <tr>
              <td>대기고객</td>
              <td>평균대기시간</td>
              <td>평균도착시간</td>
            </tr>
            <tr>
              <td><span>03</span>명</td>
              <td>
                <span>11</span>분
                <div class="point wait">+3분</div>
              </td>
              <td>
                <span>25</span>분
                <div class="point arrive">+10분</div>
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
              <td>도착 예상시간</td>
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
        <v-divider></v-divider>
        <v-list-item class="sideContent">
          <img src="../../imgs/car.png" alt="자동차" />
          <v-list-item-content>
            <div class="sideContentHeader">대기고객 현황</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="sideContentTable">
          <table @click="openCarDetaileInfo()">
            <tr>
              <td>순위</td>
              <td>진행상태</td>
              <td>대기 예상시간</td>
              <td id="sideFullTable">도착 예상시간</td>
              <td id="sideFullTable">배정된 차량</td>
              <td id="sideFullTable">출발지</td>
              <td id="sideFullTable">도착지</td>
            </tr>
            <tr>
              <td>1</td>
              <td>예약완료</td>
              <td>05분</td>
              <td id="sideFullTable">11:40</td>
              <td id="sideFullTable">1호차</td>
              <td id="sideFullTable">정문</td>
              <td id="sideFullTable">도서관</td>
            </tr>
            <tr>
              <td>2</td>
              <td>수신자 동의 요청중</td>
              <td>11분</td>
              <td id="sideFullTable">11:53</td>
              <td id="sideFullTable">3호차</td>
              <td id="sideFullTable">본관</td>
              <td id="sideFullTable">후문</td>
            </tr>
            <tr>
              <td>3</td>
              <td>수신자 동의 요청중</td>
              <td>22분</td>
              <td id="sideFullTable">12:10</td>
              <td id="sideFullTable">2호차</td>
              <td id="sideFullTable">후문</td>
              <td id="sideFullTable">연서관</td>
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
      color: 'rgba(45, 211, 147, 0.87)',
      right: false,
      width: 350,
      miniVariant: false,
      background: false,
      hideOverlay: true,
      nowDate: {
        year: '',
        month: '',
        date: '',
        day: '',
      },
      moreInfo: false,
    };
  },
  mounted() {
    const nowDate = new Date();
    const addDayStr = ['일', '월', '화', '수', '목', '금', '토'];
    this.nowDate.year = nowDate.getFullYear();
    this.nowDate.month = nowDate.getMonth() + 1;
    this.nowDate.date = nowDate.getDate();
    this.nowDate.day = addDayStr[nowDate.getDay()];
  },
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
      const sideBar = document.querySelector('.v-navigation-drawer');
      const table = document.querySelectorAll('#sideFullTable');
      if (this.moreInfo) {
        sideBar.style.width = '350px';
        for (const td of table) {
          td.style.display = 'none';
        }
      } else {
        for (const td of table) {
          console.log(td);
          td.style.display = 'table-cell';
        }
        sideBar.style.width = '60%';
      }
      this.moreInfo = !this.moreInfo;
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
  font-size: 1.4rem;
}

.sideHeader > div {
  position: relative;
  top: 15px;
  padding: 3px;
  height: 100%;
}

.sideContent > img {
  width: 35px;
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
  background-color: rgba(255, 255, 255, 0.925);
  border: 2px solid rgb(112, 111, 111);
  width: 150px;
  height: 30px;
}

.sideContentTable > table > tr:hover {
  background-color: rgb(51, 255, 0);
}

.sideContentTable > table > tr:nth-child(1) {
  background-color: rgb(0, 0, 0);
  font-size: 1rem;
}

.sideContentTable > table > tr > td:nth-child(1) {
  width: 100px;
}

#carDetaileInfo > img {
  width: 25px;
  position: absolute;
  left: 205px;
  top: 5px;
  cursor: pointer;
}

#sideFullTable {
  display: none;
}

#deliveryInfo {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.445);
  width: 320px;
  height: 230px;
  padding: 20px 0px 10px 0px;
  margin-left: 5px;
}

#deliveryInfo > table {
  /* background-color: rgba(255, 255, 255, 0.842);
  border-radius: 10px; */
  margin: 0 auto;
  text-align: center;
}

#deliveryInfo > table > tr > td {
  padding: 4px 0px;
  width: 100px;
}

#deliveryInfo > table > tr > td > span {
  display: inline-block;
  font-size: 3rem;
}

/* 배송현황 수정사항 */
.point {
  width: 40px;
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  position: absolute;
  /* top: 150px; */
  right: 20px;
  color: rgb(3, 139, 3);
  font-size: 11px !important;
}

.point.cancel {
  color: red;
  top: 40px;
}

.point.wait {
  top: 150px;
  right: 120px;
}

.point.arrive {
  top: 150px;
}

/* .sideContentForm img {
  width: 400px;
  height: 130px;
} */
</style>
