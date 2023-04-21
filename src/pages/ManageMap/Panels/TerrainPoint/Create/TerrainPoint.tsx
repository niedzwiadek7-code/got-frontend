import React from 'react'
import { Button } from 'react-bootstrap'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
// TODO: Import path should use '@/.'
import { useNavigate } from 'react-router-dom'
import * as Input from '../../../../../components/UI/Input'
import TextArea from '../../../../../components/UI/TextArea'
import { Errors } from '../../../../../utils/defines'
import TerrainPointService from '../../../../../services/TerrainPointService'

type Inputs = {
  name: string,
  description: string,
  sea_level_height: number,
  latitude: string,
  longitude: string
}

interface Props {}

const TerrainPoint: React.FC<Props> = () => {
  const navigate = useNavigate()
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const terrainPointService = new TerrainPointService()
    const terrainPoint = await terrainPointService.createTerrainPoint(data)
    toast.success('Dodanie nowego punktu przebiegło pomyślnie', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
    navigate(`/terrain-point/edit/${terrainPoint.id}`)
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div className="w-50">
      <h2 className="mb-4"> Dodaj Punkt </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input.Component
            label="Nazwa punktu"
            type={Input.Type.TEXT}
            data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.name?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <TextArea.Component
            label="Opis"
            height={150}
            data={register('description', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.description?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Input.Component
            label="Wysokość nad poziomem morza"
            type={Input.Type.NUMBER}
            data={register('sea_level_height', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.sea_level_height?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Input.Component
            label="Szerokość geograficzna"
            type={Input.Type.TEXT}
            data={register('latitude', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.latitude?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Input.Component
            label="Długość geograficzna"
            type={Input.Type.TEXT}
            data={register('longitude', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.longitude?.message || undefined}
          />
        </div>

        <Button
          type="submit"
          variant="success"
        >
          Zapisz punkt
        </Button>
      </form>
    </div>
  )
}

export default TerrainPoint
