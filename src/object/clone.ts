'use strict'
// TODO:need to continue to improve
import { getType } from './type'
import { PRIMITIVE_VALUES } from './constant'
export function isType<T>(target: T): void { }
export function cloneDeep<T>(target: T): T {

  const clonedObjectType: string = getType(target)
  console.log('target', clonedObjectType, target);

  if (typeof target !== 'object' || typeof target === null) {
    return target
  }
  if (clonedObjectType === 'Symbol') {
    return Symbol((target as Symbol).description) as T
  }
  if (clonedObjectType === 'Array') {
    type ST = typeof target
    let result: ST[] = [];
    (target as ST[]).forEach(item => {
      result.push(cloneDeep(item))
    })
    return result as T
  }
  if (clonedObjectType === 'Object') {
    let result = {}
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        // TODO: need to solve this problem in future
        //@ts-ignore
        result[key] = cloneDeep(target[key])
      }
    }
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
