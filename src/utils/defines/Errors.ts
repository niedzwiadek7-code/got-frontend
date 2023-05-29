/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

export enum Errors {
  REQUIRED = 'required',
  MIN_LENGTH = 'minLength',
}

export const ErrorsMap = {
  REQUIRED: (value: boolean = true) => ({
    required: {
      value,
      message: 'To pole jest wymagane',
    },
  }),
  MIN_LENGTH: (value: number) => ({
    minLength: {
      value,
      message: 'To pole jest za krótkie',
    },
  }),
}

export const getValidationObj = (errors: Array<Record<string, any>>) => {
  let registerValidationObj = {}

  errors.forEach((error) => {
    registerValidationObj = {
      ...registerValidationObj,
      ...error,
    }
  })

  return registerValidationObj
}
