import { isObject } from './util'
/**
 * headers对大小写不敏感 要统一
 * @param headers 
 * @param normalizeName 
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach((name) => {
        // 当name不等于normalizeName  但name normalizeName转换成大写时相等
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
            //  把首字母大写的转成首字母小写的
            headers[normalizeName] = headers[name]
            // 删除首字母小写的
            delete headers[name]
        }
    })
}
/**
 * 设置header
 * @param headers 
 * @param data 
 */
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    if (isObject(data)) {
        // 当存在headers 并且不存在headers['Content-Type'] 设置Content-Type
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers

}
/**
 * 
 * @param headers 
 * 
 */
export function parseHeaders(headers: string): any {
    // 将header字符串
    // date: Fri, 05 Apr 2019 12:40:49 GMT
    // etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
    // connection: keep-alive
    // x-powered-by: Express
    // content-length: 13
    // content-type: application/json; charset=utf-8
    // // 转成
    //  {
    //     date: 'Fri, 05 Apr 2019 12:40:49 GMT',
    //     etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
    //     connection: 'keep-alive',
    //     'x-powered-by': 'Express',
    //     'content-length': '13',
    //     'content-type': 'application/json; charset=utf-8'
    // }
    let parsed = Object.create(null)
    if (!headers) {
        return parsed
    }
    headers.split('\r\n').forEach((line) => {
        let [key, value] = line.split(':')
        key = key.trim().toLowerCase()  // 转小写
        if (!key) {
            return
        }
        if (value) {
            value = value.trim()
        }
        parsed[key] = value
    })
    return parsed

}