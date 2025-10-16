import Taro from '@tarojs/taro';

// 基础 URL
const BASE_URL = 'https://seat.muxixyz.com';

interface RequestOptions {
  method: keyof Taro.request.Method;
  url: string;
  data?: any;
  header?: Record<string, string>;
  params?: Record<string, any>;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  [key: string]: any;
}

// 错误码映射表
const ERROR_CODE_MAP: Record<number, string> = {
  // 用户模块 1000-1999
  1001: '学号或密码错误',
  1002: '用户不存在',
  1003: '身份验证失败',
  1004: '鉴权失败',

  // 爬虫模块 2000-2999
  2001: '爬虫错误',
  2002: 'ccnu服务器错误',

  // 数据库模块 3000-3999
  3001: '数据库查询失败',
  3002: '数据库创建失败',
  3003: '数据库更新失败/删除失败',

  // 预约模块 4000-4999
  4001: '预约请求不合规',
  4002: '已经签到过了',
  4003: '您还未签到',

  // 默认错误码
  5000: '非预设错误',
};

export async function request<T = any>({
  method,
  url,
  data,
  header = {},
  params,
}: RequestOptions): Promise<T> {
  let requestUrl = url.startsWith('http')
    ? url
    : BASE_URL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');

  if (params) {
    const queryString = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString;
  }

  // if (!header['DEBUG_MODE']) {
  //   // console.log('[request]', { method, url: requestUrl, data, header, params });
  // } else {
  //   // console.log('[request]', {
  //     method,
  //     url: requestUrl,
  //     data,
  //     DEBUG_MODE: header['DEBUG_MODE'],
  //     params,
  //   });
  // }

  const token = Taro.getStorageSync('token');
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await Taro.request<ApiResponse<T>>({
      url: requestUrl,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header,
      },
    });

    const { statusCode, data: resData, header: resHeader } = res;

    // console.log('X-JWT-Token header:', resHeader['x-jwt-token'] || resHeader['X-JWT-Token']);
    const newToken =
    resHeader['x-jwt-token'] ||
    resHeader['X-JWT-Token'] ||
    resHeader['X-Jwt-Token'];
    // console.log('New Token from response header:', newToken ? newToken : 'No token in header');
    if (newToken) {
      Taro.setStorageSync('token', newToken);
      // console.log('Token updated in storage.');
    }

    if (statusCode >= 200 && statusCode < 300) {
      if (resData.code === 0 || resData.code === 200) {
        return resData.data;
      } else {
        // 取对应错误信息，找不到则使用默认错误码信息或返回接口消息
        const errorMsg =
          ERROR_CODE_MAP[resData.code] ||
          resData.message ||
          ERROR_CODE_MAP[5000];

        Taro.showToast({
          title: errorMsg,
          icon: 'none',
        });

        const error = new Error(errorMsg) as Error & { code: number };
        error.code = resData.code || 5000;
        throw error;
      }
    } else {
      const errorMsg = resData?.message || `请求错误，状态码 ${statusCode}`;
      Taro.showToast({
        title: errorMsg,
        icon: 'none',
      });
      const error = new Error(errorMsg);
      throw error;
    }
  } catch (err: any) {
    Taro.showToast({
      title: err?.message || '网络异常',
      icon: 'none',
    });
    throw err;
  }
}
