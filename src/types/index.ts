import { request } from "https";
import { timeouts } from "retry";

/**
 * 参数类型定义
 */

/**
 * 自定义method类型
 * method 只能传入合法的字符串
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * @param url 地址
 * @param method 请求方法
 * @param data  post、patch 等类型请求的数据，放到 request body 中
 * @param params get、head 等类型请求的数据，拼接到 url
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

/**
 * 响应数据类型
 */
export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request: any
}
/**
 * axios 返回类型
 */
export interface AxiosPromise extends Promise<AxiosResponse> {

}
export interface AxiosError extends Error {
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any
  response?: AxiosResponse,
  isAxiosErrpr: boolean
}
