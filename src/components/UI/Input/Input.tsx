import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Type } from './Type'
import Styles from './Input.module.scss'

type Props = {
  label: string,
  type: Type,
  // TODO: improve data type
  data: any,
  errorMessage?: (string | undefined),
  default?: (string | number),
}

const Input: React.FC<Props> = (props) => (
  <>
    <FloatingLabel
      controlId="input"
      label={props.label}
      className={`${Styles.container} mb-1`}
    >
      <Form.Control
        defaultValue={props?.default ? props.default : ''}
        type={props.type}
        placeholder={props.label}
        {...props.data}
      />
    </FloatingLabel>
    <span className="text-danger">
      {props?.errorMessage }
    </span>
  </>
)

Input.defaultProps = {
  errorMessage: undefined,
  default: undefined,
}

export default Input
