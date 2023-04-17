import { Button } from 'react-bootstrap'
import React from 'react'
import MountainRange from '@/models/MountainRange'

interface Props {
  mountain: MountainRange
}

const MountainRangeRow: React.FC<Props> = (props) => (
  <tr
    className="align-middle"
  >
    <th className="w-25" />
    <th
      scope="row"
      className="fw-normal"
    >
      {props.mountain.name}
    </th>
    <th className="text-center">
      <Button
        variant="success"
        href={`/mountain-range/${props.mountain.id}`}
      >
        Przeglądaj
      </Button>
    </th>
    <th className="text-center">
      <Button
        variant="danger"
        href={`/mountain-range/delete/${props.mountain.id}`}
      >
        Usuń
      </Button>
    </th>
  </tr>
)

export default MountainRangeRow
