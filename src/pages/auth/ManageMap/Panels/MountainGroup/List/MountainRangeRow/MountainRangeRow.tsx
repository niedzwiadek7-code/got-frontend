import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import MountainRange from '@/models/MountainRange'
import { getPath, PathNames } from '../../../../../../../utils/defines'
import * as Modal from '../../../../../../../components/UI/Modal'
import { useAuth } from '../../../../../../../context/auth'
import { useDependencies } from '../../../../../../../context/dependencies'

interface Props {
  mountain: MountainRange
}

const MountainRangeRow: React.FC<Props> = (props) => {
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [deleted, setDeleted] = useState<boolean>(false)

  const deleteMountainRange = async () => {
    try {
      const mountainRangeService = apiService.mountainData.getMountainRange(token)
      await mountainRangeService.deleteMountainRange(props.mountain.id.toString())

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Usunięcie pasma górskiego przebiegło pomyślnie',
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
        <Modal.Component
          title="Usuń"
          message="Czy napewno chcesz usunąć pasmo górskie?"
          action={deleteMountainRange}
          variant="danger"
        />
      </th>
    </tr>
  )
}

export default MountainRangeRow
