import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import MountainGroup from '../../../../../models/MountainGroup'
import MountainGroupService from '../../../../../services/MountainGroupService'
import defines from '../../../../../utils/defines'

type Props = {}

const Delete: React.FC<Props> = () => {
  const { id } = useParams()
  const [mountainGroup, setMountainGroup] = useState<(MountainGroup | undefined)>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<(boolean)>(true)

  const deleteMountainGroup = async () => {
    if (id) {
      const mountainGroupService = new MountainGroupService()
      await mountainGroupService.deleteMountainGroup(id)
      toast.info('Usunięto grupę górską', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      await defines.GlobalFunctions.wait(500)
      // TODO: should use global paths
      navigate('/mountain-group/list')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const mountainGroupService = new MountainGroupService()
      if (id) {
        setMountainGroup(
          await mountainGroupService.getOneMountainGroup(id),
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="w-50 mt-3 text-center">
        <Spinner
          animation="border"
          role="status"
          className="text-center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4"> Usuń grupę górską </h2>
      {
        mountainGroup
          ? (
            <div>
              Czy na pewno chcesz usunąć grupę górską
              <span className="fw-bold">
                {' '}
                {mountainGroup.name}
              </span>
              ?
            </div>
          )
          : (
            <span>
              Ta grupa górska została już usunięta
            </span>
          )
      }

      <div className="mt-3">
        <Button
          className="me-2"
          // TODO: should use global paths
          href="/mountain-group/list"
          variant="primary"
        >
          Powrót
        </Button>

        {
          mountainGroup
          && (
            <Button
              type="submit"
              variant="danger"
              onClick={deleteMountainGroup}
            >
              Usuń
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default Delete
