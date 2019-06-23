import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transFromRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transFromRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}
export default axios
