import React from 'react'
import { Table } from 'react-bootstrap'
import Row from './Row'
import User from '../../../../models/User'
import { useTheme } from '../../../../context/theme'

type Props = {
  users: User[]
}

const TableComponent: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Table
      responsive
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
    >
      <thead>
        <tr>
          <th>Numer legitymacji</th>
          <th>Imię i nazwisko</th>
          <th>Obsługiwane grupy górskie</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {
        props.users.map((user) => (
          <Row
            key={user.legitimationNumber}
            user={user}
          />
        ))
      }
      </tbody>
    </Table>
  )
}

export default TableComponent
