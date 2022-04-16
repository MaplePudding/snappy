import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';

class Request {
  instance: AxiosInstance;

  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (c: AxiosRequestConfig) => {
        console.log('request interceptors');
        return c;
      },
      (err: unknown) => err,
    );

    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );

    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('response interceptors');
        return res.data;
      },
      (err: unknown) => err,
    );
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        /* eslint-disable */
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
              /* eslint-disable */
            res = config.interceptors.responseInterceptors<T>(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default Request;
