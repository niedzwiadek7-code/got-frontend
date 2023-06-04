import React from 'react'
import { Spinner } from 'react-bootstrap'

type Props = {}

const Loading: React.FC<Props> = () => (
  <div className="mt-3 text-center">
    <Spinner
      animation="border"
      role="status"
      className="text-center"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)

export default Loading
