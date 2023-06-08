'use strict'
export enum DataType {
  'Object' = 'Object',// object value
  'Array' = 'Array',// object value subclass of object
  'Function' = 'Function',// object value subclass of object
  'RegExp' = 'RegExp',// object value subclass of object
  'Date' = 'Date',// object value subclass of object
  'String' = 'String',// primitive value
  'Boolean' = 'Boolean',// primitive value
  'Number' = 'Number',// primitive value
  'Symbol' = 'Symbol',// primitive value
  'Null' = 'Null',// primitive value
  'Undefined' = 'Undefined',// primitive value
}
// 值类型、基本类型
export const PRIMITIVE_VALUES = [
  'Null',
  'Undefined',
  'Boolean',
  'Number',
  'BigInt',
  'String',
  'Symbol'
]
// 引用数据类型、对象类型
export const OBJECT_VALUES = []
