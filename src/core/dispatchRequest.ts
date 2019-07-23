/**
 * 入口文件
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transFormRequest, transFromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 对参数进行处理
  processConfig(config)
  return xhr(config).then(res => {
    // 对返回数据进行处理
    return transFromResponseData(res)
  }) // 发送请求
}
/**
 * 对请求参数进行处理
 * @param {object} config 请求参数
 */
function processConfig(config: AxiosRequestConfig): void {
  // 处理url
  config.url = transformURL(config)
  // 处理请求headers
  config.headers = transFromHeaders(config)
  // 处理data
  config.data = transFromRequestData(config)
}
/**
 * 对url进行处理
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 断言 url!不为空
  return buildURL(url!, params)
}

/**
 * 对data进行处理 转成字符串
 * @param config
 */
function transFromRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}

/**
 * 对请求headers进行处理
 * @param config
 */
function transFromHeaders(config: AxiosRequestConfig): any {
  //   headers={} 保证 headers存在 当不传headers 但data为对象时也进行处理
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transFromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transFromResponse(res.data)
  return res
}
// export default axios
