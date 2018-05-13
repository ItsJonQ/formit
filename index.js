// @flow

/**
 * Utilities: DOM
 */
const el = (selector: string) => (
  selector &&
  document.createElement(selector)
)
const addClass = (node, className: string) => (
  node &&
  className &&
  node.classList.add(className)
)

const eachProps = (props: object, callback: func) =>
  Object.keys(props).forEach(callback)

const addPropsToNode = (node: object, props: object) => {
  eachProps(props, key => {
    const value = props[key]
    if (key === 'style') {
      eachProps(value, styleProp => {
        node.style[styleProp] = value[styleProp]
      })
    } else {
      node.setAttribute(key, value)
    }
  })

  return node
}

/**
 * Utilities: ID
 */
const createFormTokenName = (token: number | string) => `FormElements-${token}`
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
  const { fieldClassName, submitClassName, type, ...rest } = props
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

const renderFormElement = (
  props: object,
  index: number,
  classNames: object = {}
) => {
  const {
    fieldGroupClassName,
    fieldClassName,
    labelClassName,
    submitClassName
  } = classNames

  const node = el('div')
  addClass(node, createFormTokenName(`FieldGroup`))
  addClass(node, createFormTokenName(`id-${index}`))
  addClass(node, fieldGroupClassName)

  if (Array.isArray(props)) {
    const nodes = props.map((p, i) =>
      renderFormElement(p, `${index}-${i}`, classNames)
    )
    if (nodes) {
      nodes.forEach(n => node.appendChild(n))
    }
    addClass(node, 'has-fieldGroups')
    return node
  }

  const { label, type, ...rest } = props
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
    submitClassName
  })

  if (!labelNode && !fieldNode) return null

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

const renderForm = (
  mountNode: object,
  els: object,
  classNames: object
) => {
  els.forEach((prop, index) => {
    const element = renderFormElement(prop, index, classNames)
    mountNode.appendChild(element)
  })
}

/**
 * Main factory
 */
const defaultOptions = {
  fieldGroupClassName: '',
  fieldClassName: '',
  labelClassName: '',
  submitClassName: '',
  onRendered: () => {}
}

const FormElements = (
  selector:string = '',
  els:array = [],
  options:object = defaultOptions
) => {
  if (!selector) return
  const mountNode = document.querySelector(selector)
  if (!mountNode) return

  const props = {...defaultOptions, ...options}
  const {
    onRendered,
    ...otherProps
  } = props
  const classNames = {...otherProps}

  renderForm(mountNode, els, classNames)

  onRendered(mountNode)
}


/**
 * Example
 */
FormElements('#form', [
  /**
   * Name group
   */
  [
    {
      label: 'First name',
      type: 'text',
      placeholder: 'First',
      autofocus: true
    },
    {
      label: 'Middle name',
      type: 'text',
      placeholder: 'M',
      style: {
        width: '20px'
      }
    },
    {
      label: 'Last name',
      placeholder: 'Last',
      type: 'text',
    },
  ],
  /**
   * Name group
   */
  {
    label: 'Email',
    type: 'email',
    placeholder: 'email@domain.com',
    required: true
  },
  {
    type: 'submit',
    value: 'Go!'
  },
], {
  fieldGroupClassName: 'form-group',
  fieldClassName: 'form-control',
  submitClassName: 'btn',
  onRendered: () => { console.log('done') }
})
