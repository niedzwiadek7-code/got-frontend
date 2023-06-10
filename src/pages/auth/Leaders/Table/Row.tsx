import { Button } from 'react-bootstrap'
import React from 'react'
import User from '../../../../models/User'
import { getPath, PathNames } from '../../../../utils/defines'

type Props = {
  user: User,
}

const Row: React.FC<Props> = (props) => (
  <tr className="align-middle">
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
          .map((role) => (
            <div
              key={role.name}
            >
              {`${role.name} od ${role.assignmentDate}`}
            </div>
          ))
      }
    </td>
    <td>
      <Button
        variant="primary"
        className="float-end"
        href={getPath(PathNames.LEADER_EDIT, {
          id: props.user.id,
        })}
      >
        Edytuj uprawnienia
      </Button>
    </td>
  </tr>
)

export default Row
