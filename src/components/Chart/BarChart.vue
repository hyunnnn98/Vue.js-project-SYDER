<template>
  <div>
    <canvas ref="barChart" id="barChart"></canvas>
  </div>
</template>

<script>
export default {
  props: ['Type'],
  data() {
    return {
      barChart: null,
      chartType: null,
    };
  },
  mounted() {
    (this.chartType = this.Type),
      (this.barChart = new this.$_Chart(this.$refs.barChart, {
        type: this.chartType,
        data: {
          labels: ['공학관', '본관', '후문', '도서관', '연서관', '창조관'],
          datasets: [
            {
              data: [19, 16, 15, 10, 10, 5],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          title: {
            display: false,
            text: '웨이포인트 발신지 인기순위',
          },
          legend: {
            display: false,
            // 상단 네모난 제목박스 없애려면 fontSize 0으로 설정.
          },
          scales: {
            yAxes: [
              {
                barPercentage: 0.95,
                categoryPercentage: 0.95,
                gridLines: {
                  display: false,
                  // lineWidth: 0
                  // offsetGridLines: true
                },
                ticks: {
                  fontStyle: 'bold',
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1,
                categoryPercentage: 1,
                gridLines: {
                  display: false,
                  // lineWidth: 0
                  // offsetGridLines: true
                },
                ticks: {
                  // display: false,
                  // padding: 30,
                  suggestedMin: 0,
                  stepSize: 5,
                },
              },
            ],
          },
        },
      }));
  },
};
</script>

<style>
#barChart {
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  height: auto;
}
</style>
