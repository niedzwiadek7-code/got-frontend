import { Button } from 'react-bootstrap'
import React from 'react'
import MountainGroup from '@/models/MountainGroup'

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
    <th className="w-25" />
    <th className="text-center">
      <Button
        variant="primary"
        href={`/mountain-group/edit/${props.mountain.id}`}
      >
        Edytuj
      </Button>
    </th>
    <th className="text-center">
      <Button
        variant="danger"
        href={`/mountain-group/delete/${props.mountain.id}`}
      >
        Usuń
      </Button>
    </th>
  </tr>
)

export default MountainRow
