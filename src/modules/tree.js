/*
    node id label value children
*/
export const getElement = (id, tree = []) => {
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i]
    if (element.id === id) {
      return element
    } else if (element.children && element.children.length) {
      const res = getElement(id, element.children)
      if (res !== null) {
        return res
      }
    } else {
      return null
    }
  }
}
// props: [{name,oldName}]
export const formatTree = (props, tree = [], childrenName = '') => {
  const newTree = []
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i]
    const obj = {}
    for (let j = 0; j < props.length; j++) {
      const { name, oldName } = props[j]
      if (oldName !== childrenName) {
        obj[name] = element[oldName]
      } else {
        obj[name] = formatTree(props, element[oldName], childrenName)
      }
    }
    newTree[i] = obj
  }
  return newTree
}
