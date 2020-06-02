<template>
  <div class="realTime">
    <div class="socket_message">{{ message }}</div>
    <real-map></real-map>
  </div>
</template>

<script>
import RealMap from '@/components/mapControl/RealMap';
import bus from '@/utils/bus.js';
import io from 'socket.io-client';

export default {
  components: {
    RealMap,
  },
  data() {
    return {
      message: '서버 연결에 실패했습니다.',
      socket: io('http://13.124.124.67:80/admin'),
      location: [
        {
          name: '1호차',
          lat: '35.89619659025773',
          lng: '128.62042088452992',
          status: '운행중',
          change: '',
        },
        {
          name: '2호차',
          lat: '35.895967013250626',
          lng: '128.62040512961283',
          status: '운행중',
          change: '',
        },
        {
          name: '3호차',
          lat: '35.89585283325085',
          lng: '128.6205190895765',
          status: '운행중',
          change: '',
        },
      ],
    };
  },
  mounted() {
    bus.$emit('end:spinner');

    this.socket.on('connect_error', function() {
      // TODO 서버 연결 실패시 토스트 메세지 출력
      console.log('Connection error!');
      let message = document.querySelector('.socket_message');
      message.style.visibility = 'visible';
      message.style.opacity = '1';

      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
          message.style.visibility = 'hidden';
        }, 2000);
      }, 5000);
    });

    this.socket.on('getLocation', Info => {}); // TODO 맵 새로고침 했을 때 차량 위치 표시하기
    this.socket.on('updateLocation', Info => {
      console.log('서버로부터 데이터 받아왔음!');
      let carNum = 0;
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i].name == Info.carNumber) {
          this.location[i].change = true;
          this.location[i].lat = Info.carLat;
          this.location[i].lng = Info.carLng;
          console.log('바꿀차량의 정보', this.location[i]);
        } else {
          this.location[i].change = false;
        }
      }

      console.log('위치 업데이트', this.location);
      bus.$emit('updateCar', this.location);
    });
  },
};
</script>

<style>
.socket_message {
  visibility: hidden;
  opacity: 0;
  text-align: center;
  position: absolute;
  top: 8.5%;
  left: 45%;
  z-index: 100000;
  background-color: white;
  box-shadow: 0px 1px 5px rgb(165, 165, 165);
  color: red;
  border-radius: 9px;
  height: 20px;
  line-height: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px 15px;
  transition: visibility 0s, opacity 0.5s linear;
}
</style>
