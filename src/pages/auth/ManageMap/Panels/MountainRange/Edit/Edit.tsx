import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import * as Input from '../../../../../../components/UI/Input'
import Select from '../../../../../../components/UI/Select'
import { Errors, getPath, PathNames } from '../../../../../../utils/defines'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import MountainRange from '@/models/MountainRange'

type Inputs = {
  mountainId: string,
  name: string,
  mountain_group_id: number,
}

interface Props {}

const Edit: React.FC<Props> = () => {
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const toastUtils = getToastUtils()

  const { id } = useParams()
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState<boolean>(true)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { mountainId, ...formData } = data
    const mountainRangeService = apiService.mountainData.getMountainRange(token)
    await mountainRangeService.editMountainRange(mountainId, formData)

    toastUtils.Toast.showToast(
      toastUtils.types.SUCCESS,
      'Edycja pasma górskiego przebiegła pomyślnie',
    )
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  const [mountainRange, setMountainRange] = useState<(MountainRange | undefined)>(undefined)
  const [options, setOptions] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const mountainRangeService = apiService.mountainData.getMountainRange(token)
        setMountainRange(
          await mountainRangeService.getOneMountainRange(id),
        )
      }

      const mountainGroupService = apiService.mountainData.getMountainGroup(token)
      const mountainGroups = await mountainGroupService.getMountainGroups()

      const tempOptions: Record<number, string> = {}

      mountainGroups.forEach((mountain) => {
        tempOptions[mountain.id] = mountain.name
      })

      setOptions(tempOptions)
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
    <div className="w-50">
      <h2 className="mb-4"> Edytuj Pasmo Górskie </h2>

      {
        mountainRange
          ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="hidden"
                defaultValue={id}
                {...(register('mountainId'))}
              />

              <div className="mb-3">
                <Input.Component
                  label="Nazwa pasma"
                  type={Input.Type.TEXT}
                  default={mountainRange.name}
                  data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
                  errorMessage={errors?.name?.message || undefined}
                />
              </div>

              <div className="mb-3">
                <Select.Component
                  label="Wybierz grupę górską"
                  options={options}
                  default={mountainRange.id}
                  data={register('mountain_group_id', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
                  errorMessage={errors?.mountain_group_id?.message || undefined}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="me-3"
                href={getPath(PathNames.MOUNTAIN_GROUP)}
              >
                Powrót
              </Button>

              <Button
                type="submit"
                variant="success"
              >
                Zapisz pasmo
              </Button>
            </form>
          )
          : (
            <p>
              Nie znaleziono podanego pasma górskiego
            </p>
          )
      }
    </div>
  )
}

export default Edit
