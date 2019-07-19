/**
 * 类型判断
 */
const toString = Object.prototype.toString // 把Object.prototype.toString 缓存
// 类型保护 val is Date 确保val 为Date
/**
 * 是否为时间类型
 * @param val 参数
 * @return boolean
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 是否是对象类型
 * @param val
 * @return boolean
 */
export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
