import { request } from '../utils/request';

// 获取管理员数据
export async function getSupremeData() {
  return request({
    method: 'GET',
    url: '/api/v1/reservation/get_supreme_data',
  });
}

// 获取管理员名单
export async function getAdminList() {
  return request({
    method: 'GET',
    url: '/api/v1/reservation/get_supreme_list',
  });
}
