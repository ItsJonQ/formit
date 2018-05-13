// @flow

import FormElements from './src/FormElements'

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
      autofocus: true,
      html: `
        <div>hello</div>
      `
    },
    {
      label: 'Middle name',
      type: 'text',
      placeholder: 'M',
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
  formClassName: 'container',
  fieldGroupClassName: 'form-group',
  fieldClassName: 'form-control',
  nestedGroupClassName: 'row',
  nestedFieldClassName: 'col-sm-4',
  submitClassName: 'btn btn-primary',
  shouldNestFieldWithinLabel: false,
  onDidRender: (node) => { console.log('done', node) }
})
