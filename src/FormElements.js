// @flow
import renderForm from './renderForm'

const defaultOptions = {
  fieldGroupClassName: '',
  fieldClassName: '',
  formClassName: '',
  labelClassName: '',
  nestedGroupClassName: '',
  nestedFieldClassName: '',
  shouldNestFieldWithinLabel: true,
  submitClassName: '',
  onWillRender: () => {},
  onDidRender: () => {},
}

const FormElements = (
  selector:string = '',
  elements:array = [],
  options:object = defaultOptions
) => {
  if (!selector) return
  const mountNode = document.querySelector(selector)
  if (!mountNode) return

  const props = {...defaultOptions, ...options}
  const {
    fieldGroupClassName,
    fieldClassName,
    formClassName,
    labelClassName,
    nestedGroupClassName,
    nestedFieldClassName,
    submitClassName,
    onWillRender,
    onDidRender,
    shouldNestFieldWithinLabel,
  } = props

  const classNames = {
    fieldGroupClassName,
    fieldClassName,
    formClassName,
    labelClassName,
    nestedGroupClassName,
    nestedFieldClassName,
    submitClassName,
  }

  onWillRender(mountNode,{ elements, options })

  renderForm(mountNode, elements, { classNames, shouldNestFieldWithinLabel })

  onDidRender(mountNode,{ elements, options })
}

window.Formit = FormElements

export default FormElements
