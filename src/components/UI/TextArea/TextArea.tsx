import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

interface Props {
  label: string,
  height: number,
  // TODO: improve data type
  data: any,
  errorMessage?: (string | undefined),
  default?: string,
}

const TextArea: React.FC<Props> = (props) => (
  <>
    <FloatingLabel
      controlId="textArea"
      label={props.label}
      className="mb-1"
    >
      <Form.Control
        as="textarea"
        placeholder={props.label}
        defaultValue={props.default}
        style={{ height: props.height }}
        {...props.data}
      />
    </FloatingLabel>
    <span className="text-danger">
      {props?.errorMessage }
    </span>
  </>
)

TextArea.defaultProps = {
  errorMessage: undefined,
  default: '',
}

export default TextArea
