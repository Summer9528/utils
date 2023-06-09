'use strict'
import { getType } from './type'
import { PRIMITIVE_VALUES } from './constant'

export const cloneDeep = <T>(clonedObject: T): T => {
  const clonedObjectType: string = getType(clonedObject)
  if (typeof clonedObject !== 'object' || typeof clonedObject === null) {
    return clonedObject
  }
  if (clonedObjectType === 'Symbol') {
    return Symbol((clonedObject as Symbol).description) as T
  }
  if (clonedObjectType === 'Array') {
    let result: any[] = [];
    (clonedObject as any[]).forEach(item => {
      result.push(cloneDeep(item as any))
    })
    return result as T
  }
  if (clonedObjectType === 'Object') {
    let result: object = {}
    for (const key in clonedObject) {
      if (Object.prototype.hasOwnProperty.call(clonedObject, key)) {
        const element = clonedObject[key]
        result[key] = element
      }
    }

  }
  for (const key in clonedObject as object) {
    const el = clonedObject[key]
    const elType = getType(el)
    if (!PRIMITIVE_VALUES.includes(elType)) {
      clonedObject[key] = cloneDeep(el)
    } else {
      clonedObject[key] = el
    }
  }
  return res

}

