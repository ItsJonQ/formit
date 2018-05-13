// @flow
export const eachProps = (props: object, callback: func) =>
  Object.keys(props).forEach(callback)
