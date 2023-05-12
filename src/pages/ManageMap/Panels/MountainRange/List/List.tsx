import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { Dependencies } from '../../../../../context/dependencies'
import MountainRange from '../../../../../models/MountainRange'
import { getPath, PathNames } from '../../../../../utils/defines'

interface Props {}

const List: React.FC<Props> = () => {
  const { getApiService } = useContext(Dependencies)
  const apiService = getApiService()

  const [mountainRange, setMountainRange] = useState<(MountainRange | undefined)>(undefined)
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const mountainRangeService = apiService.mountainData.mountainRange
        setMountainRange(
          await mountainRangeService.getOneMountainRange(id),
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

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
        mountainRange
          ? (
            <div>
              <div
                className="text-end"
              >
                <Button
                  className="me-2 mb-2"
                  href={getPath(PathNames.MOUNTAIN_RANGE, {
                    id,
                  })}
                  variant="primary"
                >
                  Edytuj pasmo górskie
                </Button>
              </div>

              <h2 className="mb-3">
                Pasmo górskie:
                {' '}
                {mountainRange.name}
              </h2>
              <p className="mb-4">
                Należy do grupy górskiej
                {' '}
                <span className="fw-bold">
                  {mountainRange.mountain_group?.name}
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
                      Nazwa odcinka
                    </th>

                    <th
                      className="text-center"
                      scope="col"
                    >
                      Przeglądaj
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
                  {
                    mountainRange.sections.map((section) => (
                      <tr
                        className="align-middle"
                        key={uuidv4()}
                      >
                        <th
                          scope="row"
                        >
                          { section.name }
                        </th>

                        <th className="text-center">
                          <Button
                            variant="secondary"
                            href={getPath(PathNames.SECTION, {
                              id: section.id,
                            })}
                          >
                            Przeglądaj
                          </Button>
                        </th>

                        <th className="text-center">
                          <Button
                            variant="primary"
                            href={getPath(PathNames.SECTION_EDIT, {
                              id: section.id,
                            })}
                          >
                            Edytuj
                          </Button>
                        </th>

                        <th className="text-center">
                          <Button
                            variant="danger"
                            href={getPath(PathNames.SECTION_DELETE, {
                              id: section.id,
                            })}
                          >
                            Usuń
                          </Button>
                        </th>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <Button
                className="me-2"
                href={getPath(PathNames.MOUNTAIN_GROUP)}
                variant="primary"
              >
                Powrót
              </Button>
            </div>
          )
          : (
            <h2>
              Nie znaleziono takiej grupy górskiej
            </h2>
          )
      }
    </div>
  )
}

export default List
