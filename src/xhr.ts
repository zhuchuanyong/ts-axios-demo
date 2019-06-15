import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()
  // 设置发送请求   请求方法 地址 是否异步
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
