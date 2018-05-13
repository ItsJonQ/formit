// @flow

/**
 * Utilities: DOM
 */
const el = (selector: string) => document.createElement(selector)
const addClass = (node, className) => node.classList.add(className)

const addPropsToNode = (node: object, props: object) => {
  Object.keys(props).forEach(key => {
    node.setAttribute(key, props[key])
  })

  return node
}

/**
 * Utilities: ID
 */
const createFormTokenName = token => `FormElements-${token}`
const createFormId = (id: number) => createFormTokenName(id)


const createLabel = (label: string, props: object) => {
  if (!label) return
  const node = el('label')
  addPropsToNode(node, props)
  addClass(node, createFormTokenName('Label'))

  const labelNode = el('div')
  labelNode.innerHTML = label
  addClass(labelNode, createFormTokenName('Label__text'))
  node.appendChild(labelNode)

  return node
}

const createField = (props: object) => {
  const { type, ...rest } = props
  const nodeType = type.toLowerCase() === 'textarea' ?
    'textarea' :
    'input'
  const node = el(nodeType)
  if (nodeType !== 'textarea') { node.type = type }
  addPropsToNode(node, rest)
  addClass(node, createFormTokenName('Field'))

  return node 
}

const renderFormElement = (props: object, index: number) => {
  const node = el('div')
  const { label, type, ...rest } = props
  const id = createFormId(index)
  const labelNode = createLabel(label, { for: id })
  const fieldNode = createField({ type, id, ...rest })

  if (!labelNode && !fieldNode) return null

  addClass(node, createFormTokenName(`FieldGroup`))
  addClass(node, createFormTokenName(`id-${index}`))

  if (labelNode) {
    node.appendChild(labelNode)
  }
  if (fieldNode) {
    if (labelNode) {
      labelNode.appendChild(fieldNode)
    } else {
      node.appendChild(fieldNode)
    }
  }

  return node
}

const renderForm = (mountNode: object, props: object) => {
  props.forEach((prop, index) => {
    const element = renderFormElement(prop, index)
    mountNode.appendChild(element)
  })
}

/**
 * Main factory
 */
const Form = (selector = '', props = []) => {
  if (!selector) return
  const mountNode = document.querySelector(selector)
  if (!mountNode) return

  renderForm(mountNode, props)
}


/**
 * Example
 */
Form('#form', [
  {
    label: 'First name',
    type: 'text',
    autofocus: true
  },
  {
    label: 'Last name',
    type: 'text',
  },
  {
    label: 'Email',
    type: 'email',
    required: true
  },
  {
    label: 'Address',
    type: 'text',
  },
  {
    type: 'submit',
  },
])
