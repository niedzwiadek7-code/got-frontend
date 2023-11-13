import React, { useState } from 'react'
import { Table, Form } from 'react-bootstrap'
import Row from './Row'
import Badge from '../../../../models/Badge'

type Props = {
  badges: Badge[]
  refreshBadgesList: () => void
}

const TableComponent: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchId, setSearchId] = useState('')

  const filteredBadges = props.badges.filter(
    (badge) => badge.name.toLowerCase().includes(searchTerm.toLowerCase())
    && (searchId === '' || badge.id.toString() === searchId),
  )

  return (
    <div>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Szukaj odznaki..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="Szukaj po Kodzie odznaki..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="mt-2"
        />
      </Form.Group>
      <Table responsive>
        <thead>
          <tr>
            <th>Kod odznaki</th>
            <th>Nazwa</th>
            <th>Punktowy próg</th>
            <th>Następny kod odznaki</th>
            <th>Poprzedni kod odznaki</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {filteredBadges.map((badge) => (
            <Row key={badge.id} badge={badge} refreshBadgesList={props.refreshBadgesList} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TableComponent
