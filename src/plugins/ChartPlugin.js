import Chart from 'chart.js';

export default {
    install(Vue) {
        Vue.prototype.$_Chart = Chart;

        // prototype이란? 어떤 특정 메서드나, 객체 속성을 확장하는게 프로토 타입.
        // App.vue
        // 여기서 this.$_Chart로 접근하면 어디든지 접근 가능하게 됨.
    }
}