// @flow
import { isNodeElement, el, addClass, addPropsToNode } from './utilities/dom'
import {
  createFormTokenName,
  createFormId
} from './utilities/id'
import {
  createFragment,
  createField,
  createLabel
} from './utilities/elements'

const renderFormElement = (
  props: object,
  index: number,
  options: object = {},
  isNested: boolean = false
) => {

  const {
    classNames,
    shouldNestFieldWithinLabel
  } = options

  const {
    fieldGroupClassName,
    fieldClassName,
    labelClassName,
    nestedFieldClassName,
    nestedGroupClassName,
    submitClassName
  } = classNames

  const node = el('div')
  addClass(node, createFormTokenName(`FieldGroup`))
  addClass(node, createFormTokenName(`id-${index}`))
  addClass(node, fieldGroupClassName)

  if (Array.isArray(props)) {
    const nodes = props.map((p, i) =>
      renderFormElement(p, `${index}-${i}`, options, true)
    )
    if (nodes) {
      nodes.forEach(n => node.appendChild(n))
    }
    addClass(node, 'has-fieldGroups')
    addClass(node, nestedGroupClassName)
    return node
  }

  const { html, label, type, ...rest } = props
  const id = createFormId(index)
  const labelNode = createLabel(label, {
    class: labelClassName,
    for: id,
  })
  const fieldNode = createField({
    type,
    id,
    ...rest,
    fieldClassName,
    submitClassName,
  })

  if (!labelNode && !fieldNode) return null

  maybeAddLabel(node, labelNode)
  maybeAddField(node, labelNode, fieldNode, shouldNestFieldWithinLabel)
  maybeAddHTML(node, html)

  if (isNested) {
    addClass(node, nestedFieldClassName)
  }

  return node
}

const maybeAddLabel = (node, label) => {
  if (label) {
    node.appendChild(label)
  }
}

const maybeAddField = (node, label, field, shouldNest = true) => {
  if (label && shouldNest) {
    label.appendChild(field)
  } else {
    node.appendChild(field)
  }
}

const maybeAddHTML = (node, html) => {
  if (html && (typeof html === 'string' || isNodeElement(html))) {
    const htmlFragment = typeof html === 'string' ? createFragment(html) : html
    if (htmlFragment) {
      node.appendChild(htmlFragment)
    }
  }
}

export default renderFormElement
