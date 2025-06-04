import { request } from '../utils/request';
import type { paths } from '../../types/openapi';

// 预定座位
export function reserve(
  params: NonNullable<
    paths['/api/v1/reservation/reserve']['post']['requestBody']
  >['content']['application/json'],
  options?: { header?: { DEBUG_MODE?: string } }
): Promise<
  paths['/api/v1/reservation/reserve']['post']['responses']['200']['content']['application/json']['data']
> {
  return request({
    method: 'POST',
    url: '/api/v1/reservation/reserve',
    data: params,
    header: {
      ...(options && options.header ? options.header : {}),
    },
  });
}

// 取消预约
export function cancelReservation(
  id: string
): Promise<
  paths['/api/v1/reservation/cancel/{id}']['delete']['responses']['200']['content']['application/json']
> {
  return request({
    method: 'DELETE',
    url: `/api/v1/reservation/cancel/${id}`,
  });
}

// 获取可预约日期
export function getReservationDays(
  params?: paths['/api/v1/reservation/days']['get']['parameters']['query'],
  options?: { header?: { DEBUG_MODE?: string } }
): Promise<
  paths['/api/v1/reservation/days']['get']['responses']['200']['content']['application/json']['data']
> {
  return request({
    method: 'GET',
    url: '/api/v1/reservation/days',
    params,
    header: {
      ...(options && options.header ? options.header : {}),
    },
  });
}

// 获取座位数据
export function getSeats(
  params?: paths['/api/v1/reservation/seats']['get']['parameters']['query']
): Promise<
  paths['/api/v1/reservation/seats']['get']['responses']['200']['content']['application/json']['data']
> {
  return request({
    method: 'GET',
    url: '/api/v1/reservation/seats',
    params,
  });
}

// 获取可预约房间
export function getRooms(): Promise<
  paths['/api/v1/reservation/rooms']['get']['responses']['200']['content']['application/json']['data']
> {
  return request({
    method: 'GET',
    url: '/api/v1/reservation/rooms',
  });
}
