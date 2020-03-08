<template>
  <div class="carState">
    <tr>
      <td>운행 대기</td>
      <td>운행 예약</td>
      <td>운행 중</td>
      <td>이상 차량</td>
    </tr>
    <tr>
      <td>
        <!-- 운행 대기 -->
        <img src="@/imgs/parking.png" alt="car" />
        <p>1</p>
      </td>
      <td>
        <!-- 운행 예약 -->
        <img src="@/imgs/car.png" alt="car" />
        <p>0</p>
      </td>
      <td>
        <!-- 운행 중 -->
        <img src="@/imgs/car.png" alt="car" />
        <p>1</p>
      </td>
      <td>
        <!-- 이상 차량 -->
        <img src="@/imgs/accident.png" alt="car" />
        <p>1</p>
      </td>
    </tr>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
