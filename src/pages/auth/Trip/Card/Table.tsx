import React from 'react'
import { Table } from 'react-bootstrap'
import TripEntry from '@/models/TripEntry'
import Row from './Row'

type Props = {
  tripEntries: TripEntry[]
}

const TableComponent: React.FC<Props> = (props) => {
  const sumPoints = props.tripEntries.reduce((sum, entry) => {
    const points = entry.oppositeDirection
      ? entry.section.badge_points_b_to_a
      : entry.section.badge_points_a_to_b
    return sum + points
  }, 0)

  return (
    <Table responsive>
      <thead className="bg-light">
        <tr>
          <th> Lp. </th>
          <th> Odcinek </th>
          <th> Kierunek </th>
          <th> Data </th>
          <th className="text-center"> Punkty </th>
        </tr>
      </thead>

      <tbody>
        {
          props.tripEntries.map((tripEntry, index) => (
            <Row
              key={tripEntry.id}
              count={index + 1}
              tripEntry={tripEntry}
            />
          ))
        }
      </tbody>

      <tfoot className="bg-light">
        <tr>
          <th />
          <th />
          <th />
          <th />
          <th className="text-center">
            Razem:
            {' '}
            {
              sumPoints
            }
          </th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default TableComponent
