'use strict'
import { PRIMITIVE_VALUES, OBJECT_VALUES } from "./constant"
export function getType(value: any): string {
  const str: string = Object.prototype.toString.call(value)
  const reg = /(?<=object )[A-Za-z]{1,}(?=\])/
  const res: RegExpMatchArray = str.match(reg) as RegExpMatchArray
  return res[0]
}
export function isPrimitiveValue(target: any): boolean {
  const targetType = getType(target)
  if (PRIMITIVE_VALUES.includes(targetType)) {
    return true
  }
  return false
}
export function isObjectValue(target: any): boolean {
  const targetType = getType(target)
  if (OBJECT_VALUES.includes(targetType)) {
    return true
  }
  return false
}
export function isString(target: unknown): target is string {
  return typeof target === 'string'
}
export function isNumber(target: unknown): target is number {
  return typeof target === 'number'
}
export function isBigInt(target: unknown): target is bigint {
  return typeof target === 'bigint'
}
export function isBoolean(target: unknown): target is boolean {
  return typeof target === 'boolean'
}
export function isSymbol(target: unknown): target is symbol {
  return typeof target === 'symbol'
}
export function isNull(target: unknown): target is null {
  return target === null
}
export function isUndefined(target: unknown): target is undefined {
  return typeof target === 'undefined'
}
export function isObject(target: unknown): target is object {
  return getType(target) === 'Object'
}
export function isArray(target: unknown): target is [] {
  return target instanceof Array
}

export function isFunction(target: unknown): target is Function {
  return typeof target === 'function'
}
export function isDate(target: unknown): target is Date {
  return target instanceof Date
}
export function isRegExp(target: unknown): target is RegExp {
  return target instanceof RegExp
}
export function isMap(target: unknown): target is Map<unknown, unknown> {
  return target instanceof Map
}
export function isSet(target: unknown): target is Set<unknown> {
  return target instanceof Set
}
export function isType<T>(target: T,) {
}
export function isValidKey(key: string | number | symbol, obj: object): key is keyof typeof obj {
  return key in obj
}

