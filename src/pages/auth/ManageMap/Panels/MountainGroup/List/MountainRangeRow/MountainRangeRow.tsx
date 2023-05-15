import { Button } from 'react-bootstrap'
import React from 'react'
import MountainRange from '@/models/MountainRange'
import { getPath, PathNames } from '../../../../../../../utils/defines'

interface Props {
  mountain: MountainRange
}

const MountainRangeRow: React.FC<Props> = (props) => (
  <tr
    className="align-middle"
  >
    <th />
    <th
      scope="row"
      className="fw-normal"
    >
      {props.mountain.name}
    </th>
    <th className="text-center">
      <Button
        variant="secondary"
        href={getPath(PathNames.MOUNTAIN_RANGE, {
          id: props.mountain.id,
        })}
      >
        Przeglądaj
      </Button>
    </th>
    <th className="text-center">
      <Button
        variant="primary"
        href={getPath(PathNames.MOUNTAIN_RANGE_EDIT, {
          id: props.mountain.id,
        })}
      >
        Edytuj
      </Button>
    </th>
    <th className="text-center">
      <Button
        variant="danger"
        href={getPath(PathNames.MOUNTAIN_RANGE_DELETE, {
          id: props.mountain.id,
        })}
      >
        Usuń
      </Button>
    </th>
  </tr>
)

export default MountainRangeRow
