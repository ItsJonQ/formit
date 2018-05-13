// @flow
import { addClass } from './utilities/dom'
import renderFormElement from './renderFormElement'

const renderForm = (
  mountNode: object,
  els: object,
  options: object
) => {
  if (!mountNode) return

  if (options && options.classNames) {
    const { formClassName } = options.classNames
    console.log(formClassName)
    addClass(mountNode, formClassName)
  }

  els.forEach((prop, index) => {
    const element = renderFormElement(prop, index, options)
    mountNode.appendChild(element)
  })
}

export default renderForm
