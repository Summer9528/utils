import { getType } from './type'
interface Item {
  id: string | number,
  [property: string | number]: any
}
export function getElementById(id: string | number, treeData: Item[] = []): Item | null {
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i]
    if (item.id === id) {
      return item
    } else if (item.children && item.children.length) {
      const res = getElementById(id, item.children)
      if (res !== null) {
        return res
      }
    } else {
      return null
    }
    return null
  }
}
export function isValidKey(key: string | number | symbol, obj: object): key is keyof typeof obj {
  return key in obj
}
function getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
export function formatTree(tree = [], fieldConfig: object = {}) {
  const newTree = []
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i]
    const obj = {}
    Object.keys(fieldConfig).forEach((oldProp) => {
      const newProp = fieldConfig[oldProp]
      if (fieldConfig.hasOwnProperty(oldProp)) {
        if (getType(item[oldProp]) === 'Array') {
          obj[newProp] = formatTree(item[oldProp], fieldConfig)
        }
      }
    })
    newTree[i] = obj
  }
  return newTree
}
