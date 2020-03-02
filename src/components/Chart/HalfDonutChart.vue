<template>
  <div>
    <div>요일 별 운행 비율</div>
    <p id="dateData">
      전체
      <br />
      <strong>257</strong>건
    </p>
    <canvas ref="dateChart" id="dateChart"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      halfDonutChart: null,
      datasets:[
          {
            data: [61, 24, 32, 20, 50, 40, 30],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(146, 146, 146, 0.7)"
            ],
            borderColor: [
              // "rgba(255, 109, 132, 1)",
              // "rgba(255, 169, 64, 1)",
              // "rgba(255, 216, 86, 1)",
              // "rgba(75, 202, 192, 1)",
              // "rgba(54, 172, 235, 1)",
              // "rgba(153, 112, 255, 1)",
              // "rgba(146, 156, 146, 1)"
            ],
            borderWidth: 2
          }
        ]
    };
  },
  mounted() {
    this.halfDonutChart = new this.$_Chart(this.$refs.dateChart, {
      type: "doughnut",
      data: {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: this.datasets
      },
      options: {
        responsive: false,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 55,
        legend: {
          labels: {
            fontFamily: "Jua"
          },
          position: "right"
          // display: false
          // 상단 네모난 제목박스 없애려면 fontSize 0으로 설정.
        },
        scales: {
          animation: {
            animateScale: true,
            animateRotate: true
          }
        },
      }
    });
  }
};
</script>

<style>
#dateChart {
  margin: 1rem auto 1rem;
  width: 90%;
  max-width: 900px;
  height: auto;
  /* padding: 10px 0px 10px; */
}

#dateData {
  display: inline-block;
  position: absolute;
  top: 67%;
  right: 52%;
  font-size: 1.2rem;
}
</style>