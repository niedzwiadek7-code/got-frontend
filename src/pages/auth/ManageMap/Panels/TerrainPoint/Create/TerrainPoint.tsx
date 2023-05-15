import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { useNavigate } from 'react-router-dom'
import * as Input from '../../../../../../components/UI/Input'
import TextArea from '../../../../../../components/UI/TextArea'
import { Errors, getPath, PathNames } from '../../../../../../utils/defines'
import { useDependencies } from '../../../../../../context/dependencies'
import MapDefinition from '../../../../../../components/Map'
import { useAuth } from '../../../../../../context/auth'

type Inputs = {
  name: string,
  description: string,
  sea_level_height: number,
  latitude: string,
  longitude: string
}

interface Props {}

const TerrainPoint: React.FC<Props> = () => {
  const { getApiService, getToastUtils } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const toastUtils = getToastUtils()

  const navigate = useNavigate()
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  // @ts-ignore
  const [mapPoint, setMapPoint] = useState<MapDefinition.Elements.Point>(
    new MapDefinition.Elements.Point(
      '',
      '0',
      '0',
    ),
  )

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const terrainPointService = apiService.mountainData.getTerrainPoint(token)
    const terrainPoint = await terrainPointService.createTerrainPoint(data)

    toastUtils.Toast.showToast(
      toastUtils.types.SUCCESS,
      'Dodanie nowego punktu przebiegło pomyślnie',
    )

    navigate(getPath(PathNames.TERRAIN_POINT_EDIT, {
      id: terrainPoint.id,
    }))
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div>
      <h2 className="mb-4"> Dodaj Punkt </h2>

      <div className="row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-6"
        >
          <div className="mb-3">
            <Input.Component
              label="Nazwa punktu"
              type={Input.Type.TEXT}
              data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.name?.message || undefined}
              onChange={(e) => {
                setMapPoint(
                  new MapDefinition.Elements.Point(
                    e.target.value,
                    mapPoint.latitude,
                    mapPoint.longitude,
                  ),
                )
              }}
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
              onChange={(e) => {
                setMapPoint(
                  new MapDefinition.Elements.Point(
                    mapPoint.name,
                    e.target.value,
                    mapPoint.longitude,
                  ),
                )
              }}
            />
          </div>

          <div className="mb-3">
            <Input.Component
              label="Długość geograficzna"
              type={Input.Type.TEXT}
              data={register('longitude', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.longitude?.message || undefined}
              onChange={(e) => {
                setMapPoint(
                  new MapDefinition.Elements.Point(
                    mapPoint.name,
                    mapPoint.latitude,
                    e.target.value,
                  ),
                )
              }}
            />
          </div>

          <Button
            type="submit"
            variant="success"
          >
            Zapisz punkt
          </Button>
        </form>

        <div
          className="col-6"
        >
          <MapDefinition.Component
            points={[mapPoint]}
          />
        </div>
      </div>
    </div>
  )
}

export default TerrainPoint
