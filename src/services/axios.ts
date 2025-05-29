import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // 可根据实际情况调整
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 自动携带 token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    // 可统一处理错误
    return Promise.reject(error);
  }
);

export default instance;
