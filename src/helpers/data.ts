import { isObject } from './util'
/**
 * 对data 做转换  转成json字符串
 * @param data 
 */
export function transFormRequest(data: any): any {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * 对响应的数据做转换
 * @param data 
 */
export function transFromResponse(data: any): any {
  // 当为json字符串时转换成json
  if (typeof data === "string") {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do not
    }
  }
  return data
}
