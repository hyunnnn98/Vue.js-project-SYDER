import { fetchWayPoint } from '../api/index.js';

export default {
    async FETCH_WAY({ commit }) {
        try {
            const response = await fetchWayPoint();
            // console.log('엑시오스를 통한 응답: ', response);
            commit('SET_WAY', response.data);
            return response;
        } catch (error) {
            console.log('error: ', error)
        }
        // return fetchWayPoint()
        //     .then(res => {
        //         commit('SET_WAY', res.data);
        //         return res;
        //     })
        //     .catch(err => {
        //         console.log('error: ', err)
        //     })
    }
}