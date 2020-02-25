import axios from 'axios';

const config = {
    baseUrl: "http://13.124.189.186/php/"
};

function fetchWayPoint() {
    return axios.get(`${config.baseUrl}/return_locate.php`);
}

export {
    fetchWayPoint
}