'use strict'
export const getType = (data: any): string => {
  if (data === null) {
    return 'null'
  }
  const res: string = Object.prototype.toString.call(data)
  const reg = /(?<=object )[A-Za-z]{1,}(?=\])/
  return (res.match(reg) as any[])[0]
}
