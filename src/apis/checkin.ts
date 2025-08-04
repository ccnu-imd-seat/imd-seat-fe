import { request } from '../utils/request';
import type { paths } from '../../types/openapi';

// 扫码签到
export function checkin(
  params?: paths['/api/v1/checkin']['get']['parameters']['query'],
  options?: { header?: { DEBUG_MODE?: string; DEBUG_DAY?: string } }
): Promise<
  paths['/api/v1/checkin']['get']['responses']['200']['content']['application/json']['data']
> {
  return request({
    method: 'GET',
    url: '/api/v1/checkin',
    params,
     header: {
      ...(options && options.header ? options.header : {}),
    },
  });
}
