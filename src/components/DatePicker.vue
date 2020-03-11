<template>
  <div class="date">
    <date-picker
      :inline="false"
      :value="date"
      :language="ko"
      :calendar-button="true"
      :calendar-button-icon="button"
      :format="customFormatter"
      :highlighted="highlighted"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import moment from 'moment';
import { ko } from 'vuejs-datepicker/dist/locale';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      ko: ko,
      date: new Date(),
      button: 'fa fa-calendar',
      highlighted: {
        to: new Date(2020, 3, 5), // Highlight all dates up to specific date
        from: new Date(2020, 3, 26), // Highlight all dates after specific date
        days: [7, 0], // Highlight Saturday's and Sunday's
        // daysOfMonth: [15, 20, 31], // Highlight 15th, 20th and 31st of each month
        dates: [
          // Highlight an array of dates
          new Date(),
        ],
        // customPredictor: function(date) {
        //   // highlights the date if it is a multiple of 4
        //   if (date.getDate() % 7 == 0) {
        //     return true;
        //   }
        // },
        // includeDisabled: true // Highlight disabled dates
      },
    };
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('YYYY년 MM월 DD일 ');
    },
  },
};
</script>

<style>
.date {
  position: absolute;
  right: 5rem;
  top: 1rem;
  width: 230px;
}

.vdp-datepicker {
  font-family: 'Jua';
  text-align: center;
}

.vdp-datepicker > div > input {
  border-bottom: 4px solid rgb(255, 230, 0);
  width: 230px;
  height: 40px;
  text-align: center;
  font-size: 1.5rem;
}

.vdp-datepicker__calendar {
  position: relative;
  left: -40px;
}

.vdp-datepicker__calendar-button {
  position: absolute;
  top: 7px;
  right: 12px;
}
</style>
