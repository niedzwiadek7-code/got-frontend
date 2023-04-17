import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import * as Input from '../../../../components/UI/Input'
import TextArea from '../../../../components/UI/TextArea'
import Select from '../../../../components/UI/Select'
import { Errors } from '../../../../utils/defines'

type Inputs = {
  name: string,
  description: string,
  mountainRange: number,
  badgePoints_AtoB: number,
  badgePoints_BtoA: number,
  terrainPoint_A: number,
  terrainPoint_B: number,
}

interface Props {}

const Section: React.FC<Props> = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data))

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div className="w-50">
      <h2 className="mb-4"> Dodaj Odcinek </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input.Component
            label="Nazwa odcinka"
            type={Input.Type.TEXT}
            data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.name?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <TextArea.Component
            label="Opis odcinka"
            height={150}
            data={register('description')}
            errorMessage={errors?.description?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Select.Component
            label="Wybierz pasmo górskie"
            options={{
              1: 'name',
              2: 'another name',
            }}
            data={register('mountainRange', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.mountainRange?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Input.Component
            label="Punkty do uzyskania (od A do B)"
            type={Input.Type.NUMBER}
            data={register('badgePoints_AtoB')}
            errorMessage={errors?.badgePoints_AtoB?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Input.Component
            label="Punkty do uzyskania (od B do A)"
            type={Input.Type.NUMBER}
            data={register('badgePoints_BtoA')}
            errorMessage={errors?.badgePoints_BtoA?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Select.Component
            label="Wybierz punkt A"
            options={{
              1: 'point A',
              2: 'point B',
            }}
            data={register('terrainPoint_A', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.terrainPoint_A?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Select.Component
            label="Wybierz punkt B"
            options={{
              1: 'point A',
              2: 'point B',
            }}
            data={register('terrainPoint_B', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.terrainPoint_B?.message || undefined}
          />
        </div>

        <Button
          type="submit"
          variant="success"
        >
          Zapisz odcinek
        </Button>
      </form>
    </div>
  )
}

export default Section
