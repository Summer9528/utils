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
  return null
}
export function formatTree(tree = [], fieldConfig: object = {}) {
  const newTree = []
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i]
    const obj = {}
    for (const key in fieldConfig) {
      if (Object.prototype.hasOwnProperty.call(fieldConfig, key)) {
        // @ts-ignore
        const newKey = fieldConfig[key];
        if (getType(item[key]) === 'Array') {
          // @ts-ignore
          obj[newKey] = formatTree(item[key], fieldConfig)
        }
      }
    }
    newTree[i] = obj
  }
  return newTree
}
