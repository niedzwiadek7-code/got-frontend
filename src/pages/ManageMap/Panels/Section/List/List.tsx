import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import SectionService from '../../../../../services/SectionService'
import Section from '../../../../../models/Section'

type Props = {}

const List: React.FC<Props> = () => {
  const { id } = useParams()
  const [section, setSection] = useState<(Section | undefined)>()
  const [loading, setLoading] = useState<(boolean)>(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const sectionService = new SectionService()
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
                        href={`/terrain-points/edit/${section.terrainPointA?.id}`}
                      >
                        Edytuj
                      </Button>
                    </th>

                    <th className="text-center">
                      <Button
                        variant="danger"
                        href={`/terrain-points/delete/${section.terrainPointA?.id}`}
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
                        href={`/terrain-points/edit/${section.terrainPointB?.id}`}
                      >
                        Edytuj
                      </Button>
                    </th>

                    <th className="text-center">
                      <Button
                        variant="danger"
                        href={`/terrain-points/delete/${section.terrainPointB?.id}`}
                      >
                        Usuń
                      </Button>
                    </th>
                  </tr>
                </tbody>
              </table>

              <Button
                className="me-2 mt-2"
                href={`/mountain-range/${section.mountainRange?.id}`}
                variant="primary"
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
