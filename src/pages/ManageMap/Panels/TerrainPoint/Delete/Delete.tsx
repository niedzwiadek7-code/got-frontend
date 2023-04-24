import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import defines from '../../../../../utils/defines'
import TerrainPoint from '../../../../../models/TerrainPoint'
import TerrainPointService from '../../../../../services/TerrainPointService'

type Props = {}

const Delete: React.FC<Props> = () => {
  const { id } = useParams()
  const [terrainPoint, setTerrainPoint] = useState<(TerrainPoint | undefined)>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<(boolean)>(true)

  const deleteTerrainPoint = async () => {
    if (id) {
      const terrainPointService = new TerrainPointService()
      try {
        await terrainPointService.deleteTerrainPoint(id)
        toast.info('Usunięto punkt', {
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
        toast.error('Istnieją odcinki powiązane z tym punktem. Usuń je, by usunąć ten odcinek', {
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
      const terrainPointService = new TerrainPointService()
      if (id) {
        setTerrainPoint(
          await terrainPointService.getTerrainPoint(id),
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
      <h2 className="mb-4"> Usuń odcinek </h2>
      {
        terrainPoint
          ? (
            <div>
              Czy na pewno chcesz usunąć ten odcinek
              <span className="fw-bold">
                {' '}
                {terrainPoint.name}
              </span>
              ?
            </div>
          )
          : (
            <span>
              Ten punkt został już usunięty
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
          terrainPoint
          && (
            <Button
              type="submit"
              variant="danger"
              onClick={deleteTerrainPoint}
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
