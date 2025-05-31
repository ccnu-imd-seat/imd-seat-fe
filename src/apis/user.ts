import { request } from '../untils/request';
import type { paths } from '../types/openapi';

export function login(
  params: NonNullable<paths['/api/v1/login']['post']['requestBody']>['content']['application/json']
): Promise<paths['/api/v1/login']['post']['responses']['200']['content']['application/json']['data']> {
  return request({
    method: 'POST',
    url: '/api/v1/login',
    data: params,
  });
}
