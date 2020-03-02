<template>
  <div>
    <div>운행 취소 비율</div>
    <canvas ref="conutChart" id="conutChart">
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donutChart: null
    };
  },
  mounted() {
    this.donutChart = new this.$_Chart(this.$refs.conutChart, {
      type: "doughnut",
      data: {
        labels: ["타임 아웃에 의한 취소", "사용자 의도에 따른 취소"],
        datasets: [
          {
            data: [61, 24],
            backgroundColor: [
              "rgba(24, 162, 235, 0.6)",
              "rgba(255, 50, 60, 0.6)"
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          labels: {
            fontFamily: "Jua",
            fontColor: "black",
            fontSize: 16
          },
          position: "right"
        },
        scales: {
          // yAxes: [
          //   {
          //     gridLines: {
          //       display: false
          //     },
          //     ticks: {
          //       fontStyle: "bold"
          //     }
          //   }
          // ],
          // xAxes: [
          //   {
          //     gridLines: {
          //       display: false
          //     },
          //     ticks: {
          //       display: false
          //     }
          //   }
          // ],
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      }
    });
  }
};
</script>

<style>
#conutChart {
  width: 90%;
  height: auto;
  max-width: 900px;
  margin: 1rem auto 1rem;
}

</style>