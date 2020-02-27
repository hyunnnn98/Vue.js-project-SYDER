<template>
  <div class="date">
    <date-picker
      :inline="false"
      :value="date"
      :language="ko"
      :calendar-button="true"
      :calendar-button-icon="button"
      :format="customFormatter"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";
import moment from "moment";
import { ko } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      ko: ko,
      date: new Date(),
      button: "fa fa-calendar"
    };
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("YYYY년 MM월 DD일 ");
    }
  }
};
</script>

<style>
.date {
  position: absolute;
  right: 15rem;
  top: 2.5rem;
  border-bottom: 4px solid rgb(255, 230, 0);
}

.vdp-datepicker {
  font-family: "배달의민족 주아";
}

.vdp-datepicker > div > input {
  width: 100%;
  height: 30px;
  text-align: center;
  padding-right: 13px;
  font-size: 2rem;
}

.vdp-datepicker__calendar {
  right: 1.5rem;
  top: 2.1rem;
}

.vdp-datepicker__calendar-button {
  position: absolute;
  top: 7px;
  right: 12px;
}
</style>