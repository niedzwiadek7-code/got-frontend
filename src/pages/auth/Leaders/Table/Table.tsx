import React from 'react'
import { Table } from 'react-bootstrap'
import Row from './Row'
import User from '../../../../models/User'

type Props = {
  users: User[]
}

const TableComponent: React.FC<Props> = (props) => (
  <Table responsive>
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

export default TableComponent
