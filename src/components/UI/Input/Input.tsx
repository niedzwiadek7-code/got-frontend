import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Type } from './Type'
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
}

const Input: React.FC<Props> = (props) => (
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
        })}
      />
    </FloatingLabel>
    <span className="text-danger">
      {props?.errorMessage }
    </span>
  </div>
)

Input.defaultProps = {
  errorMessage: undefined,
  default: undefined,
  onChange: () => {},
}

export default Input
