import { routes } from './index';

// 경로 추가 API
function setPath(mapData) {
  return routes.post('', mapData);
}

// 전체 웨이포인트 불러오기 API
function getPaths() {
  return routes.get('', {
    params: {
      guard: 'admin',
    },
  });
}

function deletePaths(pathId) {
  return routes.delete(`/${pathId}`, {
    params: {
      guard: 'admin',
    },
  });
}

export { setPath, getPaths, deletePaths };
