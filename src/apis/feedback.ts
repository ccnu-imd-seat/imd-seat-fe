import { request } from '../untils/request';
import type { paths } from '../types/openapi';

// 获取所有反馈
export function getFeedback(): Promise<paths['/api/v1/feedback']['get']['responses']['200']['content']['application/json']> {
  return request({
    method: 'GET',
    url: '/api/v1/feedback',
  });
}

// 提交反馈
export function postFeedback(
  params: NonNullable<paths['/api/v1/feedback']['post']['requestBody']>['content']['application/json']
): Promise<paths['/api/v1/feedback']['post']['responses']['200']['content']['application/json']['data']> {
  return request({
    method: 'POST',
    url: '/api/v1/feedback',
    data: params,
  });
}
