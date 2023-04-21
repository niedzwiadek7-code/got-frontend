import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import MountainRange from '../../../../../models/MountainRange'
import MountainRangeService from '../../../../../services/MountainRangeService'
import defines from '../../../../../utils/defines'

type Props = {}

const DeleteMountainRange: React.FC<Props> = () => {
  const { id } = useParams()
  const [mountainRange, setMountainRange] = useState<(MountainRange | undefined)>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<(boolean)>(true)

  const deleteMountainRange = async () => {
    console.log(id)
    if (id) {
      const mountainRangeService = new MountainRangeService()
      try {
        await mountainRangeService.deleteMountainRange(id)
        toast.info('Usunięto pasmo górskie', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } catch (err) {
        toast.error('Istnieją odcinki powiązane z tym pasmem górskim. Usuń je, by usunąć to pasmo górskie', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
      await defines.GlobalFunctions.wait(500)
      // TODO: should use global paths
      navigate('/mountain-group/list')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const mountainRangeService = new MountainRangeService()
      if (id) {
        setMountainRange(
          await mountainRangeService.getOneMountainRange(id),
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
      <h2 className="mb-4"> Usuń pasmo górskie </h2>
      {
        mountainRange
          ? (
            <div>
              Czy na pewno chcesz usunąć pasmo górskie
              <span className="fw-bold">
                {' '}
                {mountainRange.name}
              </span>
              ?
            </div>
          )
          : (
            <span>
              To pasmo górskie zostało już usunięte
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
          mountainRange
          && (
            <Button
              type="submit"
              variant="danger"
              onClick={deleteMountainRange}
            >
              Usuń
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default DeleteMountainRange
