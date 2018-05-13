// @flow
import { el, addClass, addPropsToNode } from './dom'
import {
  createFormTokenName,
  createFormId
} from './id'

export const createFragment = (html: string) => {
  const fragment = document.createDocumentFragment()
  const containerNode = el('div')
  containerNode.innerHTML = html
  Array.from(containerNode.childNodes).forEach(n => {
    fragment.appendChild(n)
  })

  return fragment
}

export const createField = (props: object) => {
  const {
    fieldClassName,
    submitClassName,
    type,
    ...rest
  } = props
  const nodeType = type.toLowerCase() === 'textarea' ?
    'textarea' :
    'input'
  const node = el(nodeType)
  if (nodeType !== 'textarea') { node.type = type }
  const className = type === 'submit' ? submitClassName : fieldClassName

  addPropsToNode(node, rest)
  addClass(node, createFormTokenName('Field'))
  addClass(node, className)

  return node
}

export const createLabel = (label: string, props: object) => {
  if (!label) return
  const node = el('label')
  const { ...rest } = props
  addPropsToNode(node, rest)
  addClass(node, createFormTokenName('Label'))

  const labelNode = el('div')
  labelNode.innerHTML = label
  addClass(labelNode, createFormTokenName('Label__text'))
  node.appendChild(labelNode)

  return node
}

