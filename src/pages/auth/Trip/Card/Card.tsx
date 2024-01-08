import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Trip from '@/models/Trip'
import Styles from './Card.module.scss'
import Table from './Table'
import { getPath, PathNames } from '../../../../utils/defines'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import * as Modal from '../../../../components/UI/Modal'
import GotBook from '@/models/GotBook'
import { useTheme } from '../../../../context/theme'

type Props = {
  trip: Trip
  gotBook: GotBook | null
}

const CardComponent: React.FC<Props> = (props) => {
  const { getToastUtils, getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [deleted, setDeleted] = useState<boolean>(false)
  const theme = useTheme()
  console.log(theme)

  const deleteTrip = async () => {
    try {
      const tripService = apiService.getTrip(token)
      await tripService.deleteTrip(props.trip.id.toString())

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Wycieczkę usunięto pomyślnie',
      )

      setDeleted(true)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieocezekiwany błąd',
      )
    }
  }

  if (deleted) {
    return <> </>
  }

  return (
    <Card
      className={`${Styles.content} mb-3`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
    >
      <Card.Header
        className={Styles.header}
      >
        {props.trip.name.toUpperCase()}
      </Card.Header>

      <Card.Body
        className="px-5"
      >
        <p className="mt-2 mb-4">
          {props.trip.description}
        </p>

        <h5>
          Przebieg wycieczki
        </h5>

        <Table
          tripEntries={props.trip.tripEntries}
        />

        <div className="text-end mt-2">
          { props.gotBook && (
          <Button
            variant="success"
            className="me-2 mb-1"
            href={getPath(PathNames.TRIP_MAP_TO_GOT, {
              id: props.trip.id,
            })}
          >
            Wpisz do książeczki GOT
          </Button>
          )}
          <Button
            variant="primary"
            className="me-2 mb-1"
            href={getPath(PathNames.TRIP_EDIT, {
              id: props.trip.id,
            })}
          >
            Edytuj
          </Button>

          <Modal.Component
            title="Usuń wycieczkę"
            message="Czy napewno chcesz usunąć tę wycieczkę"
            action={deleteTrip}
            variant="danger"
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardComponent
