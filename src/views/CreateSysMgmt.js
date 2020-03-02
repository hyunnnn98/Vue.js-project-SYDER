import SysMgmt from "./SysMgmt.vue";
import bus from "../utils/bus.js";

export default function createSysMgmt(data) {
    return {
        name: 'Analysis' + data.name,
        mounted() {
            bus.$emit("set:pageTitle", data.title)
            console.log('새로운페이지 하이오더 컴포넌트 생성!!', data.name)
        },
        render(createElement) {
            return createElement(SysMgmt);
        }
    }
}