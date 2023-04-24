import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Section from '../../../../../models/Section'
import { GlobalFunctions, getPath, PathNames } from '../../../../../utils/defines'
import SectionService from '../../../../../services/SectionService'

type Props = {}

const DeleteSection: React.FC<Props> = () => {
  const { id } = useParams()
  const [section, setSection] = useState<(Section | undefined)>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<(boolean)>(true)

  const deleteSection = async () => {
    if (id) {
      const sectionService = new SectionService()
      await sectionService.deleteSection(id)
      toast.info('Usunięto odcinek', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      await GlobalFunctions.wait(500)
      // TODO: should use global paths
      navigate(getPath(PathNames.MOUNTAIN_RANGE, {
        id: section?.mountain_range_id,
      }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const sectionService = new SectionService()
      if (id) {
        setSection(
          await sectionService.getOneSection(id),
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="mt-3 text-center">
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
        section
          ? (
            <div>
              Czy na pewno chcesz usunąć odcinek
              <span className="fw-bold">
                {' '}
                {section.name}
              </span>
              ?
            </div>
          )
          : (
            <span>
              Ten odcinek został już usunięty
            </span>
          )
      }

      <div className="mt-3">
        <Button
          className="me-2"
          // TODO: should use global paths
          href={getPath(PathNames.MOUNTAIN_GROUP)}
          variant="primary"
        >
          Powrót
        </Button>

        {
          section
          && (
            <Button
              type="submit"
              variant="danger"
              onClick={deleteSection}
            >
              Usuń
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default DeleteSection
