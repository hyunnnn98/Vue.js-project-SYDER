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
      socket: io(process.env.VUE_APP_SERVER_URL),
      location: [
        {
          name: '1호차',
          lat: '35.89528963522',
          lng: '128.6235199856',
          status: '운행중',
        },
        {
          name: '2호차',
          lat: '35.89528963522',
          lng: '128.6235199856',
          status: '운행중',
        },
        {
          name: '3호차',
          lat: '35.89528963522',
          lng: '128.6235199856',
          status: '운행중',
        },
      ],
    };
  },
  mounted() {
    bus.$emit('end:spinner');
    this.socket.emit('connectCar', '1호차');

    // 지금 생각해보니 location을 왜 배열로 감싼건지 모르겠네... => 다음번 수정 때 오브젝트형식으로 바꾸자.
    this.socket.on('updateLocation', Info => {
      // const locationData = {
      //     carNumber = res.name,
      //     carLat = res.lat,
      //     carLng = res.lng
      // }
      console.log('서버로부터 데이터 받아왔음!');
      switch (Info.carNumber) {
        case '1호차':
          this.location[0].lat = Info.carLat;
          this.location[0].lng = Info.carLng;
          break;
        case '2호차':
          this.location[1].lat = Info.carLat;
          this.location[1].lng = Info.carLng;
          break;
        case '3호차':
          this.location[2].lat = Info.carLat;
          this.location[2].lng = Info.carLng;
          break;
      }
      console.log('위치 업데이트', this.location);
      bus.$emit('updateCar', this.location);
    });

    // 서버의 변경사항을 수신
    // this.socket.on('MESSAGE', (data) => {
    //     this.messages = [...this.messages, data];
    // });
    // 서버에 변경사항 전송
    // this.socket.emit('SEND_MESSAGE', {message});
  },
};
</script>

<style></style>
