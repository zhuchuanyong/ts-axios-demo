/**
 * 发送逻辑
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
/**
 *
 * @param config 请求参数
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    // 设置 responseType
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    // 设置发送请求   请求方法 地址 是否异步
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleload() {
      // readyState为4 说明可以拿到响应结果
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
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
      handleResponse(response)
      // resolve()
    }

    // 处理网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 处理超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABOREND', request))
    }
    //  设置header
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'content-type') {
        // 数据为空 不设置header
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    /**
     * 状态码异常处理
     * @param response
     */
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `response filed  width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
        // reject(new Error(`response filed  width status code ${response.status}`))
      }
    }
  })
}
