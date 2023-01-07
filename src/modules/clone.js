'use strict'
import { getType } from './type'
import { PRIMITIVE_VALUES } from './constant'
export const clone = (data, deep = false) => {
  const dataType = getType(data)
  if (PRIMITIVE_VALUES.includes(dataType)) {
    return data
  }
  if (!deep) {
    const res = cloneShallow(data)
    return res
  } else {
    let res = {}
    if (dataType === 'Array') {
      res = []
    }
    for (const key in data) {
      const ele = data[key]
      const eleType = getType(ele)
      if (!PRIMITIVE_VALUES.includes(eleType)) {
        res[key] = clone(ele, true)
      } else {
        res[key] = ele
      }
    }
    return res
  }
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
