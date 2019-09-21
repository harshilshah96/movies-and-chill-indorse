import Axios, { AxiosRequestConfig } from 'axios';

export const baseUrl = 'https://api.themoviedb.org/3';

export const get = <T>(
  url: string,
  queryParams?: Object,
  config?: AxiosRequestConfig
) =>
  Axios.get<T>(`${baseUrl}${url}`, {
    params: {
      api_key: 'a72a9b065bc5b83a805c43ab87dac73d',
      language: 'en-US',
      ...queryParams
    },
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
