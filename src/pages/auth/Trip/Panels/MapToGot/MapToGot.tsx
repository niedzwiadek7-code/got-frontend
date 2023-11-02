import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Table } from 'react-bootstrap'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../../../context/auth'
import { useDependencies } from '../../../../../context/dependencies'
import Trip from '@/models/Trip'
import * as Loading from '../../../../../components/UI/Loading'

type Props = {}

const MapToGot: React.FC<Props> = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const [trip, setTrip] = useState<Trip | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const [tripsService] = useState(apiService.getTrip(token))
  const [gotBookService] = useState(apiService.getGotBook(token))

  const [entriesToMap, setEntriesToMap] = useState<{ [key: number]: boolean }>({})

  const getTrip = async () => {
    if (id) {
      setTrip(
        await tripsService.getTrip(id),
      )
    }
  }

  // eslint-disable-next-line max-len
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, tripEntryId: number) => {
    setEntriesToMap((prevCheckedItems) => ({
      ...prevCheckedItems,
      [tripEntryId]: event.target.checked,
    }))
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    // eslint-disable-next-line array-callback-return
    trip?.tripEntries.map(async (entry) => {
      if (entriesToMap[entry.id]) {
        await gotBookService.mapEntryToGot(1, 1, entry)
      }
    })
  }

  useEffect(() => {
    getTrip().then(() => {
      setLoading(false)
    })
  }, [id, tripsService])

  if (loading) {
    return <Loading.Component />
  }

  return (
    <div>
      <h2 className="mb-4">Wpisywanie wycieczki do GOT</h2>
      { trip && (
      <Form>
        <Table responsive>
          <thead className="bg-light">
            <tr>
              <th> Lp. </th>
              <th> Odcinek </th>
              <th> Kierunek </th>
              <th> Data </th>
              <th className="text-center"> Punkty </th>
              <th className="text-center"> Wpisz do GOT </th>
            </tr>
          </thead>
          <tbody>
            {
          trip.tripEntries.map((tripEntry, index) => (
            <tr key={tripEntry.id}>
              <td>{index + 1}</td>
              <td>{tripEntry.section.name}</td>
              <td>
                {
                  tripEntry.oppositeDirection ? (
                    <FontAwesomeIcon className="ms-4" icon={faArrowLeft} />
                  ) : (
                    <FontAwesomeIcon className="ms-4" icon={faArrowRight} />
                  )
                }
              </td>
              <td>
                {dayjs(tripEntry.date).format('DD.MM.YYYY')}
              </td>
              <td className="text-center">
                {
                  tripEntry.oppositeDirection
                    ? tripEntry.section.badge_points_b_to_a
                    : tripEntry.section.badge_points_a_to_b
                }
              </td>
              <td className="text-center">
                <Form.Check
                  key={tripEntry.id}
                  type="checkbox"
                  checked={entriesToMap[tripEntry.id] || false}
                  onChange={(e) => handleCheckboxChange(e, tripEntry.id)}
                />
              </td>
            </tr>
          ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className="text-center">
                <Button
                  className="me-2"
                  type="submit"
                  variant="success"
                  onClick={(e) => onSubmit(e)}
                >
                  Wpisz wybrane odcinki do książeczki GOT
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Form>
      )}
    </div>
  )
}

export default MapToGot
