import { request } from '../untils/request';
import type { paths } from '../types/openapi';

// 扫码签到
export function checkin(
  params?: paths['/api/v1/checkin']['get']['parameters']['query']
): Promise<paths['/api/v1/checkin']['get']['responses']['200']['content']['application/json']> {
  return request({
    method: 'GET',
    url: '/api/v1/checkin',
    params,
  });
}
