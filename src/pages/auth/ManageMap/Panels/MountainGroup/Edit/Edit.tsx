import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Input from '../../../../../../components/UI/Input'
import { Errors, getPath, PathNames } from '../../../../../../utils/defines'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import MountainGroup from '../../../../../../models/MountainGroup'

type Inputs = {
  mountainId: string,
  name: string
}

type Props = {}

const Edit: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()

  const [mountainGroup, setMountainGroup] = useState<(MountainGroup | undefined)>()
  const { id } = useParams()

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { mountainId, ...formData } = data
    const mountainGroupService = apiService.mountainData.getMountainGroup(token)
    await mountainGroupService.editMountainGroup(mountainId, formData)
    toast.success('Edycja grupy górskiej przebiegła pomyślnie', {
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

  useEffect(() => {
    const fetchData = async () => {
      const mountainGroupService = apiService.mountainData.getMountainGroup(token)
      if (id) {
        setMountainGroup(
          await mountainGroupService.getOneMountainGroup(id),
        )
      }
    }
    fetchData()
  }, [])

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div className="w-50">
      <h2 className="mb-4"> Edytuj grupę górską </h2>

      <input
        type="hidden"
        defaultValue={id}
        {...(register('mountainId'))}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input.Component
            label="Nazwa odcinka"
            type={Input.Type.TEXT}
            default={mountainGroup ? mountainGroup.name : undefined}
            data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.name?.message || undefined}
          />
        </div>

        <Button
          className="me-2"
          href={getPath(PathNames.MOUNTAIN_GROUP)}
          variant="primary"
        >
          Powrót
        </Button>

        <Button
          type="submit"
          variant="success"
        >
          Zapisz zmiany
        </Button>
      </form>
    </div>
  )
}

export default Edit
