import { Button } from 'react-bootstrap'
import React from 'react'
import MountainGroup from '@/models/MountainGroup'
import { getPath, PathNames } from '../../../../../../../utils/defines'

interface Props {
  mountain: MountainGroup
}

const MountainRow: React.FC<Props> = (props) => (
  <tr
    style={{ verticalAlign: 'middle' }}
  >
    <th
      scope="col"
      className="fw-normal"
    >
      {props.mountain.name}
    </th>
    <th />
    <th />
    <th className="text-center">
      <Button
        variant="primary"
        href={getPath(PathNames.MOUNTAIN_GROUP_EDIT, {
          id: props.mountain.id,
        })}
      >
        Edytuj
      </Button>
    </th>
    <th className="text-center">
      <Button
        variant="danger"
        href={getPath(PathNames.MOUNTAIN_GROUP_DELETE, {
          id: props.mountain.id,
        })}
      >
        Usuń
      </Button>
    </th>
  </tr>
)

export default MountainRow
