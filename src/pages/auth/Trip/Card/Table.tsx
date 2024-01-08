import React from 'react'
import { Table } from 'react-bootstrap'
import TripEntry from '@/models/TripEntry'
import Row from './Row'
import { useTheme } from '../../../../context/theme'

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
  const theme = useTheme()

  return (
    <Table
      responsive
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
    >
      <thead
        style={{
          backgroundColor: theme.colors.background,
          filter: 'brightness(85%)',
          color: theme.colors.color,
        }}
      >
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

      <tfoot
        style={{
          backgroundColor: theme.colors.background,
          filter: 'brightness(85%)',
          color: theme.colors.color,
        }}
      >
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
