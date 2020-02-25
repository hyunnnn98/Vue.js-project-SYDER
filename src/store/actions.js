import { fetchWayPoint } from '../api/index.js';

export default {
    FETCH_WAY({ commit }) {
        return fetchWayPoint()
            .then(res => {
                commit('SET_WAY', res.data);
                return res;
            })
            .catch(err => {
                console.log('error: ', err)
            })
    }
}