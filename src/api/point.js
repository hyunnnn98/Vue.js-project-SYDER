import { waypoint } from './index';

// 웨이포인트 추가 API
function setPoint(mapData) {
  return waypoint.post('', mapData);
}

// 전체 웨이포인트 불러오기 API
function getPoints() {
  return waypoint.get('');
}

function deletePoint(mapId) {
  return waypoint.delete(`/${mapId}`);
}

function updatePoint(mapId, mapData) {
  return waypoint.patch(`/${mapId}`, mapData);
}

export { setPoint, getPoints, deletePoint, updatePoint };
