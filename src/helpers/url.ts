/**
 * 处理url请求参数
 */
import { isDate, isObject } from './util'

// 编码转换
/**
 * 对于字符 @、:、$、,、、[、]，允许出现在 url 中
 * @param val  字符
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 *
 * @param url url地址
 * @param params 要拼接到url上的参数
 */
export function buildURL(url: string, params?: any): string {
  // 不存在参数 直接返回url
  if (!params) {
    return url
  }
  // 定义变量储存url参数 ['a=xx','b=hh']
  const parts: string[] = []

  // 循环处理参数
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 当某一参数值为空时 忽略参数 不添加到url中
    if (val === null || val === undefined || val === '') {
      return
    }
    //  判断是否是数组 不是数组统一成数组
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' // key不太理解
    } else {
      values = [val]
    }
    //   判断类型并把参数值转成字符串
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      //把参数的字段和值转成a=xx存入 parts数组 并进行特殊字符转换
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 把转化后的参数转成字符串 形如  a=hah&id=231
  let serializedParams = parts.join('&')

  // 判断url是否存在#哈希标志 如果存在#哈希  则去掉
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 存在#
    if (markIndex !== -1) {
      // 删除#   保存#之前字符
      url = url.slice(0, markIndex)
    }
    //  对url的? 进行处理 /a/about?a=xx&b=hh
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
