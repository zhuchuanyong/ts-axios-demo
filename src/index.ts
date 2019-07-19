/**
 * 入口文件
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'
function axios(config: AxiosRequestConfig) {
  //对参数进行处理
  processConfig(config)
  xhr(config) //发送请求
}
/**
 * 对请求参数进行处理
 * @param {object} config 请求参数
 */
function processConfig(config: AxiosRequestConfig): void {
  // 处理url
  config.url = transformURL(config)
  config.data = transFromRequestData(config)
}
/**
 * 对url进行处理
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transFromRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}
export default axios
