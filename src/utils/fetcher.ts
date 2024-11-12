import { useMessage } from 'naive-ui';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig as AxiosRequestConfig
} from 'axios';
import axios from 'axios';

export type FetchResult<T> = {
  code: number;
  bizdata: T;
  message: string;
  succeed: boolean;
  timestamp: number;
  uri: string;
  error?: any;
};

export enum RequestErrorStatusEmun {
  '请求失败' = 400,
  '未授权，请登录' = 401,
  '拒绝访问' = 403,
  '请求地址出错' = 404,
  '请求方法未允许' = 405,
  '请求的格式不可得' = 406,
  '请求被代理拒绝' = 407,
  '请求超时' = 408,
  '请求资源与服务器状态冲突' = 409,
  '请求资源被永久删除' = 410,
  '请求资源长度未定义' = 411,
  '请求资源体积太大' = 413,
  '请求资源URL太长' = 414,
  '请求资源不支持请求项目格式' = 415,
  '请求次数超过限制' = 429,
  '服务器错误' = 500,
  '服务未实现' = 501,
  '网关错误' = 502,
  '服务不可用' = 503,
  '网关超时' = 504,
  'HTTP版本不受支持' = 505,
  '服务器内部配置错误' = 506,
  '服务器无法存储完成请求所需存储的内容' = 507
}

const refreshTokenUrl = '/api/auth/refreshToken';

export function refreshToken() {
  return ApiClient.post<any, { accessToken: string; refreshToken: string }>(refreshTokenUrl);
}

const msgHander = useMessage();
const ApiClient: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000
});

// request interceptor
ApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const Authorization = localStorage.getItem('accessToken');
    Object.assign(config.headers, { Authorization });
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// refresh token
interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
const queue: PendingTask[] = [];
let valve = false;

// response interceptor
ApiClient.interceptors.response.use(
  (response: AxiosResponse<FetchResult<any>>) => {
    // 文件或者其它不是 json 的直接返回这个 json
    if (response.config.responseType !== 'json') {
      return response;
    }

    const results = response.data;
    if (results.succeed === false) {
      msgHander.error(results.message);
      return Promise.reject(results.bizdata);
    }
    return results.bizdata;
  },
  async (error: AxiosError<FetchResult<any>>) => {
    const { response, config } = error;
    const { data } = response || {};

    if (valve) {
      return new Promise((resolve) => {
        // 之后未鉴权的请求保持 await resolve
        queue.push({ config: config!, resolve });
      });
    }

    // 服务器返回的 code
    const status = data?.code;
    if (status === 401 && config?.url !== refreshTokenUrl) {
      valve = true;
      try {
        const res = await refreshToken();
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      } catch (error) {
        // 退出

        return error;
      }
      valve = false;

      // 重新认证回来后，继续执行队列中的请求
      // 重新认证回来后，缓存密钥
      ApiClient(config);
      queue.forEach((task) => {
        task.resolve(ApiClient(task.config));
      });
    }
    const msg = RequestErrorStatusEmun[status || 400];
    msgHander.error(msg);

    return Promise.reject(error.response?.data);
  }
);

export default ApiClient;
