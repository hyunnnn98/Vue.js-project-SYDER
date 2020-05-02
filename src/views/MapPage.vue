<template>
  <div class="realTime">
    <real-map></real-map>
  </div>
</template>

<script>
import RealMap from '@/components/RealMap';
import bus from '@/utils/bus.js';
import io from 'socket.io-client';

export default {
  components: {
    RealMap,
  },
  data() {
    return {
      socket: io('http://hyun9803.iptime.org:3333/admin'),
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

    // 서버의 변경사항을 수신
    // this.socket.on('MESSAGE', data => {
    //   this.messages = [...this.messages, data];
    // });
    // 서버에 변경사항 전송
    // this.socket.emit('SEND_MESSAGE', { message });
  },
};
</script>

<style></style>
