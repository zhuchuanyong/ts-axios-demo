const toString = Object.prototype.toString // 把Object.prototype.toString 缓存
// 是否是时间类型
// 类型保护 val is Date 确保val 为Date
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// 是否是对象
export function isObject(val: any): val is Object {
    return toString.call(val)==='[object Object]'
}
