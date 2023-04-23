import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import * as Input from '../../../../../components/UI/Input'
import Select from '../../../../../components/UI/Select'
import { Errors } from '../../../../../utils/defines'
import MountainGroupService from '../../../../../services/MountainGroupService'
import MountainRangeService from '../../../../../services/MountainRangeService'

type Inputs = {
  name: string,
  mountain_group_id: number,
}

interface Props {}

const AddMountainRange: React.FC<Props> = () => {
  const { id } = useParams()
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const mountainRangeService = new MountainRangeService()
    // eslint-disable-next-line no-console
    console.log(data)
    mountainRangeService.addMountainRange(data).then(
      (r) => alert(`Added mountain range: ${JSON.stringify(r)}`),
    )
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  const [options, setOptions] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      const mountainGroupService = new MountainGroupService()
      const mountainGroups = await mountainGroupService.getMountainGroups()

      const tempOptions: Record<number, string> = {}

      mountainGroups.forEach((mountain) => {
        tempOptions[mountain.id] = mountain.name
      })

      setOptions(tempOptions)
    }
    fetchData()
  }, [])

  return (
    <div className="w-50">
      <h2 className="mb-4"> Dodaj Pasmo Górskie </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input.Component
            label="Nazwa pasma"
            type={Input.Type.TEXT}
            data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.name?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Select.Component
            label="Wybierz grupę górską"
            options={options}
            default={id}
            data={register('mountain_group_id', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.mountain_group_id?.message || undefined}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="me-3"
          href="/mountain-group/list"
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
    </div>
  )
}

export default AddMountainRange
