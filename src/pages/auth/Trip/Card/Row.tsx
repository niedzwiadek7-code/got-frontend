import React from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import TripEntry from '@/models/TripEntry'

type Props = {
  count: number,
  tripEntry: TripEntry,
}

const Row: React.FC<Props> = (props) => (
  <tr>
    <td>
      {props.count}
    </td>
    <td>
      {props.tripEntry.section.name}
    </td>
    <td>
      {
        props.tripEntry.oppositeDirection ? (
          <FontAwesomeIcon className="ms-4" icon={faArrowLeft} />
        ) : (
          <FontAwesomeIcon className="ms-4" icon={faArrowRight} />
        )
      }
    </td>
    <td>
      {dayjs(props.tripEntry.date).format('DD.MM.YYYY')}
    </td>
    <td className="text-center">
      {
        props.tripEntry.oppositeDirection
          ? props.tripEntry.section.badge_points_b_to_a
          : props.tripEntry.section.badge_points_a_to_b
      }
    </td>
  </tr>
)

export default Row
