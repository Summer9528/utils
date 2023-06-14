'use strict'
export enum ValueType {
  'Object' = 'Object',// object value
  'Array' = 'Array',// object value subclass of object
  'Function' = 'Function',// object value subclass of object
  'RegExp' = 'RegExp',// object value subclass of object
  'Date' = 'Date',// object value subclass of object
  'Map' = 'Map',// object value subclass of object
  'Set' = 'Set',// object value subclass of object
  'WeekMap' = 'WeekMap',// object value subclass of object
  'WeekSet' = 'WeekSet',// object value subclass of object
  'String' = 'String',// primitive value
  'Boolean' = 'Boolean',// primitive value
  'Number' = 'Number',// primitive value
  'Symbol' = 'Symbol',// primitive value
  'Null' = 'Null',// primitive value
  'Undefined' = 'Undefined',// primitive value
}
// primitive value
export const PRIMITIVE_VALUES: string[] = [
  ValueType.Null,
  ValueType.Undefined,
  ValueType.Boolean,
  ValueType.Number,
  ValueType.String,
  ValueType.Symbol
]
// object value
export const OBJECT_VALUES: string[] = [
  ValueType.Object,
  ValueType.Array,
  ValueType.Function,
  ValueType.Date,
  ValueType.RegExp,
  ValueType.Map,
  ValueType.Set,
  ValueType.WeekMap,
  ValueType.WeekSet
]
