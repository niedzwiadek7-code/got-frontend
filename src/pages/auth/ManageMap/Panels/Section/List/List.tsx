import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import Section from '../../../../../../models/Section'
import { getPath, PathNames } from '../../../../../../utils/defines'

type Props = {}

const List: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()

  const { id } = useParams()
  const [section, setSection] = useState<(Section | undefined)>()
  const [loading, setLoading] = useState<(boolean)>(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const sectionService = apiService.mountainData.getSection(token)
        setSection(
          await sectionService.getOneSection(id),
        )
      }
      setLoading(false)
    }
    fetchData()
  })

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
      {
        section
          ? (
            <>
              <h2>
                Odcinek:
                {' '}
                {section.name}
              </h2>

              <p className="mt-3">
                Należy do pasma górskiego
                {' '}
                <span className="fw-bold">
                  {section.mountainRange?.name}
                </span>
              </p>

              <p className="">
                Należy do grupy górskiej
                {' '}
                <span className="fw-bold">
                  {section.mountainRange?.name}
                </span>
              </p>

              <p className="">
                Opis ocinka:
                {' '}
                <div className="fw-bold">
                  {section.description}
                </div>
              </p>

              <p className="">
                Punkty za trasę od punktu
                {' '}
                <span className="fw-bold">
                  {section.terrainPointA?.name}
                </span>
                {' '}
                do
                {' '}
                <span className="fw-bold">
                  {section.terrainPointB?.name}
                </span>
                :
                {' '}
                <span className="fw-bold">
                  {section.badge_points_a_to_b}
                </span>
              </p>

              <p className="mb-4">
                Punkty za trasę od punktu
                {' '}
                <span className="fw-bold">
                  {section.terrainPointB?.name}
                </span>
                {' '}
                do
                {' '}
                <span className="fw-bold">
                  {section.terrainPointA?.name}
                </span>
                :
                {' '}
                <span className="fw-bold">
                  {section.badge_points_b_to_a}
                </span>
              </p>

              <table
                className="table"
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                    >
                      Nazwa
                    </th>

                    <th
                      scope="col"
                    >
                      Szerokość geograficzna
                    </th>

                    <th
                      scope="col"
                    >
                      Długość geograficzna
                    </th>

                    <th
                      scope="col"
                    >
                      Wysokość
                    </th>

                    <th
                      className="text-center"
                      scope="col"
                    >
                      Edytuj
                    </th>

                    <th
                      className="text-center"
                      scope="col"
                    >
                      Usuń
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    className="align-middle"
                  >
                    <th
                      scope="row"
                    >
                      { section.terrainPointA?.name }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointA?.latitude }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointA?.longitude }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointA?.sea_level_height }
                    </th>

                    <th className="text-center">
                      <Button
                        variant="primary"
                        href={getPath(PathNames.TERRAIN_POINT_EDIT, {
                          id: section.terrainPointA?.id,
                        })}
                      >
                        Edytuj
                      </Button>
                    </th>

                    <th className="text-center">
                      <Button
                        variant="danger"
                        href={getPath(PathNames.TERRAIN_POINT_DELETE, {
                          id: section.terrainPointA?.id,
                        })}
                      >
                        Usuń
                      </Button>
                    </th>
                  </tr>

                  <tr
                    className="align-middle"
                  >
                    <th
                      scope="row"
                    >
                      { section.terrainPointB?.name }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointB?.latitude }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointB?.longitude }
                    </th>

                    <th
                      scope="row"
                    >
                      { section.terrainPointB?.sea_level_height }
                    </th>

                    <th className="text-center">
                      <Button
                        variant="primary"
                        href={getPath(PathNames.TERRAIN_POINT_EDIT, {
                          id: section.terrainPointB?.id,
                        })}
                      >
                        Edytuj
                      </Button>
                    </th>

                    <th className="text-center">
                      <Button
                        variant="danger"
                        href={getPath(PathNames.TERRAIN_POINT_DELETE, {
                          id: section.terrainPointB?.id,
                        })}
                      >
                        Usuń
                      </Button>
                    </th>
                  </tr>
                </tbody>
              </table>

              <Button
                variant="primary"
                href={getPath(PathNames.SECTION_EDIT, {
                  id: section.id,
                })}
                className="me-2 mt-2"
              >
                Edytuj odcinek
              </Button>

              <Button
                variant="danger"
                href={getPath(PathNames.SECTION_DELETE, {
                  id: section.id,
                })}
                className="me-2 mt-2"
              >
                Usuń odcinek
              </Button>

              <Button
                className="me-2 mt-2"
                href={getPath(PathNames.MOUNTAIN_RANGE, {
                  id: section.mountainRange?.id,
                })}
                variant="secondary"
              >
                Powrót
              </Button>
            </>
          ) : (
            <p>
              Nie udało się znaleźć podanego odcinka
            </p>
          )
      }
    </div>
  )
}

export default List
