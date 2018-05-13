// @flow
import { eachProps } from './objects'

export const isNodeElement = (node) => {
  return node && (
    node instanceof Element ||
    node.nodeType === 1 ||
    node === document
  )
}

export const el = (selector: string) => (
  selector &&
  document.createElement(selector)
)

export const addClass = (node, className: string|array) => {
  if (!node || !className) return node

  const classNames = typeof className === 'string' ?
    className.split(' ') :
    className

  if (!classNames) return node

  classNames.forEach(n => {
    n && node.classList.add(n)
  })

  return node
}

export const addPropsToNode = (node: object, props: object) => {
  eachProps(props, key => {
    const value = props[key]
    if (key === 'style') {
      eachProps(value, styleProp => {
        node.style[styleProp] = value[styleProp]
      })
    } else if (key === 'class') {
      addClass(node, value)
    } else {
      node.setAttribute(key, value)
    }
  })

  return node
}
