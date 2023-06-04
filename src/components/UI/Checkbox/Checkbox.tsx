import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form } from 'react-bootstrap'

type Props = {
  label: string,
  data: any,
  errorMessage?: string,
  default?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void,
}

const Checkbox: React.FC<Props> = (props) => {
  const id = uuidv4()

  return (
    <div>
      <Form.Check
        type="checkbox"
        id={id}
        label={props.label}
        {...props.data}
        defaultValue={props.default}
      />

      <span className="text-danger">
        {props?.errorMessage }
      </span>
    </div>
  )
}

Checkbox.defaultProps = {
  errorMessage: undefined,
  default: false,
  onChange: () => {},
}

export default Checkbox
