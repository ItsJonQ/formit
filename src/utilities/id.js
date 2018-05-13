// @flow

export const NAMESPACE = 'FormElements'

export const createFormTokenName = (token: number | string) => `${NAMESPACE}-${token}`

export const createFormId = (id: number) => createFormTokenName(id)
