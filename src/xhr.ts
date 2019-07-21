
/**
 * 发送逻辑
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

/**
 *
 * @param config 请求参数
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()

    // 设置 responseType
    if (responseType) {
      request.responseType = responseType
    }

    // 设置发送请求   请求方法 地址 是否异步
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleload() {
      // readyState为4 说明可以拿到响应结果
      if (request.readyState !== 4) {
        return
      }

      // 设置返回值
      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 处理header格式
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request

      }
      resolve(response)
    }
    //  设置header
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toUpperCase() === "content-type") {
        // 数据为空 不设置header
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })

}
