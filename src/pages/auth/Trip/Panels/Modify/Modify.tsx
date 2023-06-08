import React, { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
// import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Errors, PathNames, getPath } from '../../../../../utils/defines'
import * as Input from '../../../../../components/UI/Input'
import * as Checkbox from '../../../../../components/UI/Checkbox'
import * as Modal from '../../../../../components/UI/Modal'
import MapDefinition from '../../../../../components/Map'
import TextArea from '../../../../../components/UI/TextArea'
import * as types from './types'
import Select from '../../../../../components/UI/Select'
import { useDependencies } from '../../../../../context/dependencies'
import { useAuth } from '../../../../../context/auth'
import * as Loading from '../../../../../components/UI/Loading'
import Trip from '@/models/Trip'

type Props = {}

type SectionObj = {
  name: string
  a_to_b: number
  b_to_a: number
}

const Modify: React.FC<Props> = () => {
  const {
    control, register, handleSubmit, formState: { errors }, watch,
  } = useForm<types.Inputs>()
  const {
    fields, append, remove, update,
  } = useFieldArray({
    control,
    name: 'tripElements',
  })

  const navigate = useNavigate()
  const { id } = useParams()
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [allSections, setAllSections] = useState<Record<number, SectionObj>>({})
  const [trip, setTrip] = useState<Trip | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useState(() => {
    const fetchData = async () => {
      if (id) {
        const tripsService = apiService.getTrip(token)
        setTrip(
          await tripsService.getTrip(id),
        )
      }

      const sectionService = apiService.mountainData.getSection(token)
      const sections = await sectionService.getSections()

      const allSectionsTemp: Record<number, SectionObj> = {}

      sections.forEach((section) => {
        allSectionsTemp[section.id] = {
          name: section.name,
          a_to_b: section.badge_points_a_to_b,
          b_to_a: section.badge_points_b_to_a,
        }
      })

      setAllSections(allSectionsTemp)

      setLoading(false)
    }

    fetchData()
  })

  useEffect(() => {
    trip?.tripEntries.forEach((entry, index) => {
      update(index, {
        section: entry.sectionId,
        date: entry.date,
        oppositeDirection: entry.isBlocked,
      })
    })
  }, [trip])

  if (loading) {
    return <Loading.Component />
  }

  const defaultTripElement: types.TripElement = {
    section: 0,
    date: new Date(),
    oppositeDirection: false,
  }

  const deleteTrip = async () => {
    try {
      const tripService = apiService.getTrip(token)
      await tripService.deleteTrip(id || '')

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Wycieczkę usunięto pomyślnie',
      )

      navigate(
        getPath(PathNames.TRIP_ADD),
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieocezekiwany błąd',
      )
    }
  }

  const onSubmit: SubmitHandler<types.Inputs> = async (data) => {
    try {
      const tripService = apiService.getTrip(token)

      if (id) {
        await tripService.updateTrip(id, data)

        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          'Edycja wycieczki przebiegła pomyślnie',
        )
      } else {
        const tripRes = await tripService.createTrip(data)

        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          'Utworzenie wycieczki przebiegło pomyślnie',
        )

        navigate(
          getPath(PathNames.TRIP_EDIT, {
            id: tripRes.id,
          }),
        )
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieocezekiwany błąd',
      )
    }
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div>
      <h2 className="mb-4">
        {
          trip ? 'Edycja wycieczki' : 'Tworzenie wycieczki'
        }
      </h2>

      <div className="row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-6"
        >
          <div className="mb-3">
            <Input.Component
              label="Nazwa wycieczki"
              type={Input.Type.TEXT}
              default={trip?.name}
              data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.name?.message || undefined}
            />
          </div>

          <div className="mb-3">
            <TextArea.Component
              label="Opis"
              height={150}
              default={trip?.description}
              data={register('description')}
              errorMessage={errors?.description?.message || undefined}
            />
          </div>

          <h5 className="mb-3">
            Odcinki wycieczki
          </h5>

          {
            fields.map((tripElement, index) => {
              const fieldName = `tripElements.${index}`
              const sectionFieldName = `${fieldName}.section` as 'tripElements.0.section'
              const dateFieldName = `${fieldName}.date` as 'tripElements.0.date'
              const oppositeDirectionFieldName = `${fieldName}.oppositeDirection` as 'tripElements.0.oppositeDirection'
              const watchSectionField = watch(sectionFieldName)
              const watchOppositeDirectionField = watch(oppositeDirectionFieldName)

              return (
                <div
                  key={fieldName}
                  className="mb-3"
                >
                  <div className="mb-2 d-flex gap-2">
                    <Select.Component
                      label="Wybierz odcinek"
                      options={Object.fromEntries(
                        Object.entries(allSections).map(
                          ([sectionId, value]) => [sectionId, value.name],
                        ),
                      )}
                      data={
                        register(
                          sectionFieldName,
                          { required: ErrorMessageMap.get(Errors.REQUIRED) },
                        )
                      }
                      errorMessage={errors?.tripElements?.[index]?.section?.message || undefined}
                    />

                    <Input.Component
                      label="Wybierz datę"
                      type={Input.Type.DATE}
                      data={
                        register(
                          dateFieldName,
                          { required: ErrorMessageMap.get(Errors.REQUIRED) },
                        )
                      }
                      errorMessage={errors?.tripElements?.[index]?.date?.message || undefined}
                      onChange={(e) => console.log(e)}
                    />

                    <Button
                      variant="outline-danger"
                      onClick={() => remove(index)}
                    >
                      Usuń
                    </Button>
                  </div>

                  <div className="mb-2 d-flex justify-content-between">
                    <div className="fw-bold">
                      {
                        watchOppositeDirectionField
                          ? allSections[watchSectionField]?.b_to_a
                          : allSections[watchSectionField]?.a_to_b
                      }
                      {' '}
                      punktów
                    </div>

                    <Checkbox.Component
                      label="W kierunku przeciwnym?"
                      data={
                        register(
                          oppositeDirectionFieldName,
                        )
                      }
                      errorMessage={
                        errors?.tripElements?.[index]?.oppositeDirection?.message || undefined
                      }
                    />
                  </div>
                  <hr />
                </div>
              )
            })
          }

          <div className="fw-bold mb-3">
            Razem:
            {' '}
            {
              watch('tripElements').reduce((sum, elem) => {
                const value = elem.oppositeDirection
                  ? allSections[elem.section]?.b_to_a
                  : allSections[elem.section]?.a_to_b
                return sum + (value || 0)
              }, 0)
            }
            {' '}
            punktów
          </div>

          <Button
            className="d-block mb-3"
            onClick={() => append(defaultTripElement)}
            variant="outline-primary"
          >
            Dodaj odcinek
          </Button>

          <Button
            className="me-2"
            type="submit"
            variant={trip ? 'primary' : 'success'}
          >
            {
              trip ? 'Edytuj wycieczkę' : 'Stwórz wycieczkę'
            }
          </Button>

          {
            trip && (
              <Modal.Component
                title="Usuń wycieczkę"
                message="Czy napewno chcesz usunąć tę wycieczkę"
                action={deleteTrip}
                variant="danger"
              />
            )
          }
        </form>

        <div className="col-6">
          <MapDefinition.Component />
        </div>
      </div>
    </div>
  )
}

export default Modify
