import { Button } from 'react-bootstrap'
import React from 'react'
import User from '../../../../models/User'

type Props = {
  user: User,
}

const Row: React.FC<Props> = (props) => (
  <tr>
    <td>
      {props.user.legitimationNumber}
    </td>
    <td>
      {props.user.firstName}
      {' '}
      {props.user.lastName}
    </td>
    <td>
      {
        (props.user.roles || [])
          .filter((e) => e.value)
          .map((e) => e.name)
          .join(', ')
      }
    </td>
    <td>
      <Button
        variant="primary"
        className="float-end"
      >
        Edytuj uprawnienia
      </Button>
    </td>
  </tr>
)

export default Row
