'use strict'
export const getType = (data) => {
  const res = Object.prototype.toString.call(data)
  const reg = /(?<=object )[A-Za-z]{1,}(?=\])/
  return res.match(reg)[0]
}
