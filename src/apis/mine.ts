import { request } from '../untils/request';
import type { paths } from '../types/openapi';

// 获取我的预约
export function getMyReservations(): Promise<paths['/api/v1/mine/reservations']['get']['responses']['200']['content']['application/json']['data']> {
  return request({
    method: 'GET',
    url: '/api/v1/mine/reservations',
  });
}

// 获取信誉分
export function getScore(): Promise<paths['/api/v1/mine/score']['get']['responses']['200']['content']['application/json']> {
  return request({
    method: 'GET',
    url: '/api/v1/mine/score',
  });
}
