import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import MountainGroup from '@/models/MountainGroup'
import { getPath, PathNames } from '../../../../../../../utils/defines'
import { useDependencies } from '../../../../../../../context/dependencies'
import { useAuth } from '../../../../../../../context/auth'
import * as Modal from '../../../../../../../components/UI/Modal'

interface Props {
  mountain: MountainGroup
}

const MountainRow: React.FC<Props> = (props) => {
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [deleted, setDeleted] = useState<boolean>(false)

  const deleteMountainGroup = async () => {
    try {
      const mountainGroupService = apiService.mountainData.getMountainGroup(token)
      await mountainGroupService.deleteMountainGroup(props.mountain.id.toString())

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Usunięcie grupy górskiej przebiegło pomyślnie',
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
    <>
      <tr
        style={{ verticalAlign: 'middle' }}
      >
        <th
          scope="col"
          className="fw-normal"
        >
          {props.mountain.name}
        </th>
        <th />
        <th />
        <th className="text-center">
          <Button
            variant="primary"
            href={getPath(PathNames.MOUNTAIN_GROUP_EDIT, {
              id: props.mountain.id,
            })}
          >
            Edytuj
          </Button>
        </th>
        <th className="text-center">
          <Modal.Component
            title="Usuń"
            message="Czy napewno chcesz usunąć grupę górską?"
            action={deleteMountainGroup}
            variant="danger"
          />
        </th>
      </tr>

      <tr>
        <th />
        <th
          colSpan={4}
        >
          <Button
            variant="outline-success"
            href={getPath(PathNames.MOUNTAIN_RANGE_ADD, {
              groupId: props.mountain.id,
            })}
            className="w-100"
          >
            Dodaj pasmo górskie
          </Button>
        </th>
      </tr>
    </>
  )
}

export default MountainRow
