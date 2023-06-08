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
  if (PRIMITIVE_VALUES.includes(dataType)) {
    return data
  }
  let res = {}
  if (dataType === 'Array') {
    res = []
  }
  // const keys: (keyof data as object)[] = Object.keys(data as object)
  // keys.forEach(key => {
  //   const ele = data[key]
  //   const eleType = getType(ele)
  //   if (!PRIMITIVE_VALUES.includes(eleType)) {
  //     res[key] = clone(ele, true)
  //   } else {
  //     res[key] = ele
  //   }
  // })
  for (const key in data as object) {
    const ele = data[key] as any
    const eleType = getType(ele)
    if (!PRIMITIVE_VALUES.includes(eleType)) {
      res[key] = clone(ele, true)
    } else {
      res[key] = ele
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
