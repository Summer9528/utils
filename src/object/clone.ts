'use strict'
import { getType } from './type'
import { PRIMITIVE_VALUES } from './constant'

export const cloneDeep = <T>(data: T): T => {
  if (typeof data !== 'object' || typeof data === null) {
    return data
  }
  if (typeof data === 'symbol') {
    return Symbol((data as Symbol).description) as T
  }
  const dataType = getType(data)
  let res = {}
  if (dataType === 'Array') {
    res = []
  }
  for (const key in data as object) {
    const el = data[key]
    const elType = getType(el)
    if (!PRIMITIVE_VALUES.includes(elType)) {
      res[key] = cloneDeep(el)
    } else {
      res[key] = el
    }
  }
  return res

}
export const cloneShallow = (data) => {
  const dataType = getType(data)
  if (PRIMITIVE_VALUES.includes(dataType)) {
    return data
  }
  let res = {}
  if (dataType === 'Array') {
    res = []
  }
  for (const key in data) {
    res[key] = data[key]
  }
  return res
}
