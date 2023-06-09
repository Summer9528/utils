'use strict'
export const getType = (value: any): string => {
  if (value === null) {
    return 'Null'
  }
  const res: string = Object.prototype.toString.call(value)
  const reg = /(?<=object )[A-Za-z]{1,}(?=\])/
  return (res.match(reg) as any[])[0]
}
