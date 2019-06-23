import { isObject } from './util'
export function transFormRequest(data: any): any {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
