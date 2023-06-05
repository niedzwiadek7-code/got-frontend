import React, { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
// import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Errors } from '../../../../../utils/defines'
import * as Input from '../../../../../components/UI/Input'
import * as Checkbox from '../../../../../components/UI/Checkbox'
import MapDefinition from '../../../../../components/Map'
import TextArea from '../../../../../components/UI/TextArea'
import * as types from './types'
import Select from '../../../../../components/UI/Select'
import { useDependencies } from '../../../../../context/dependencies'
import { useAuth } from '../../../../../context/auth'
import * as Loading from '../../../../../components/UI/Loading'
import Trip from '@/models/Trip'

type Props = {}

const Modify: React.FC<Props> = () => {
  const {
    control, register, handleSubmit, formState: { errors },
  } = useForm<types.Inputs>()
  const {
    fields, append, remove, update,
  } = useFieldArray({
    control,
    name: 'tripElements',
  })

  const { id } = useParams()
  const { token } = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const [allSections, setAllSections] = useState<Record<number, string>>({})
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

      const allSectionsTemp: Record<number, string> = {}

      sections.forEach((section) => {
        allSectionsTemp[section.id] = section.name
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

  const onSubmit: SubmitHandler<types.Inputs> = async (data) => {
    const tripService = apiService.getTrip(token)
    await tripService.createTrip(data)
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

              return (
                <div
                  key={fieldName}
                  className="mb-3"
                >
                  <div className="mb-2 d-flex gap-2">
                    <Select.Component
                      label="Wybierz odcinek"
                      options={allSections}
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

                  <hr />
                </div>
              )
            })
          }

          <Button
            onClick={() => append(defaultTripElement)}
            variant="outline-primary"
          >
            Dodaj odcinek
          </Button>

          <Button
            className="d-block mt-3"
            type="submit"
            variant="success"
          >
            Stwórz wycieczkę
          </Button>
        </form>
      </div>

      <div
        className="col-6"
      >
        <MapDefinition.Component />
      </div>
    </div>
  )
}

export default Modify
