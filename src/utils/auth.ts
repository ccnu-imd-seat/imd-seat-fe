import Taro from '@tarojs/taro';

// 检查用户是否已登录，未登录则跳转到登录页
export function checkAuth() {
  try {
    const userInfo = Taro.getStorageSync('userInfo');
    const token = Taro.getStorageSync('token');
    console.log('Auth Check - userInfo:', userInfo);
    if (!userInfo || !userInfo.student_id || !token) {
      Taro.redirectTo({ url: '/pages/login/index' });
      return false;
    }
    return true;
  } catch (e) {
    Taro.redirectTo({ url: '/pages/login/index' });
    return false;
  }
}
