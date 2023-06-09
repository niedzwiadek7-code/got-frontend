import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Type } from './Type'
import { Errors } from './Errors'
import Styles from './Input.module.scss'

type Props = {
  label: string,
  type: Type,
  errorMessage?: (string | undefined),
  default?: (string | number),

  register: any,
  name: string,
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void,
  validation?: string[],
}

const Input: React.FC<Props> = (props) => {
  let errorsObj: Record<string, any> = {};

  (props.validation || []).forEach((err) => {
    const [errName, value] = err.split(':')

    if (errName === 'pattern') {
      console.log(props.name, new RegExp(value))
      console.log(new RegExp(value).test('53.15'))
    }

    if (Errors[errName]) {
      if (value) {
        errorsObj = {
          ...errorsObj,
          ...Errors[errName](value),
        }
      } else {
        errorsObj = {
          ...errorsObj,
          ...Errors[errName](),
        }
      }
    }
  })

  return (
    <div>
      <FloatingLabel
        controlId={props.name}
        label={props.label}
        className={`${Styles.container} mb-1`}
      >
        <Form.Control
          defaultValue={props?.default ? props.default : ''}
          type={props.type}
          placeholder={props.label}
          {...props.register(props.name, {
            onChange: props.onChange,
            ...errorsObj,
          })}
        />
      </FloatingLabel>
      <span className="text-danger">
        {props?.errorMessage }
      </span>
    </div>
  )
}

Input.defaultProps = {
  validation: [],
  errorMessage: undefined,
  default: undefined,
  onChange: () => {},
}

export default Input
