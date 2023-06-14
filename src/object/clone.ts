'use strict'
// TODO:需要继续完善
import { getType, isPrimitiveValue, isValidKey, isArray, isSymbol, isObject } from './type'
import { PRIMITIVE_VALUES } from './constant'
export function cloneDeep<T>(target: T, cache = new WeakMap()): T {
  // 基础类型：Symbol
  if (isSymbol(target)) {
    return Symbol(target.description) as T
  }
  // 基础类型：String,Number,Boolean,Null,Undefined
  if (isPrimitiveValue(target)) {
    return target
  }
  // 引用类型
  if (isObject(target)) {
    let result = {}
    Reflect.ownKeys(target).forEach(key => {
      if (isValidKey(key, target)) {
        result[key] = target[key]
      }
    })
  }
  if (isArray(target)) {
    type ST = typeof target
    let result: ST[] = [];
    target.forEach(item => {
      result.push(cloneDeep(item))
    })
    return result as T
  }
  return target
}
export function clone<T>(target: T): T {
  const dataType = getType(target)
  if (PRIMITIVE_VALUES.includes(dataType)) {
    return target
  }
  let res = {}
  if (dataType === 'Array') {
    res = []
  }
  for (const key in target) {
    //@ts-ignore
    res[key] = target[key]
  }
  return res as T
}
