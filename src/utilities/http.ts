import Axios, { AxiosRequestConfig } from 'axios';

export const baseUrl = '/api/v1';

export const get = <T>(
  url: string,
  queryParams?: Object,
  config?: AxiosRequestConfig
) =>
  Axios.get<T>(`${baseUrl}${url}`, {
    params: queryParams,
    headers: { 'Access-Control-Allow-Origin': '*' },
    ...config
  });

export const post = <T>(
  url: string,
  queryParams?: Object,
  body?: any,
  config?: AxiosRequestConfig
) =>
  Axios.post<T>(`${baseUrl}${url}`, body, { params: queryParams, ...config });

export const put = <T>(
  url: string,
  queryParams?: Object,
  body?: any,
  config?: AxiosRequestConfig
) => Axios.put<T>(`${baseUrl}${url}`, body, { params: queryParams, ...config });

export const deleteRequest = <T>(
  url: string,
  queryParams?: Object,
  config?: AxiosRequestConfig
) => Axios.delete(`${baseUrl}${url}`, { params: queryParams, ...config });
