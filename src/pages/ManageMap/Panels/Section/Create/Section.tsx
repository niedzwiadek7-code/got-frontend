import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as Input from '../../../../../components/UI/Input'
import TextArea from '../../../../../components/UI/TextArea'
import Select from '../../../../../components/UI/Select'
import { Errors, getPath, PathNames } from '../../../../../utils/defines'
import { Dependencies } from '../../../../../context/dependencies'
import MapDefinition from '../../../../../components/Map'

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
  const { getApiService } = useContext(Dependencies)
  const apiService = getApiService()

  const navigate = useNavigate()
  const [allPoints, setAllPoints] = useState<Record<number, string>>({})
  const [allMountainRanges, setAllMountainRanges] = useState<Record<number, string>>({})
  // @ts-ignore
  const [mapLine, setMapLine] = useState<MapDefinition.Elements.Line>(
    new MapDefinition.Elements.Line(
      '',
      1,
      1,
    ),
  )

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const sectionService = apiService.mountainData.section

    const transformedData = {
      name: data.name,
      description: data.description,
      mountain_range_id: data.mountainRange,
      badge_points_a_to_b: data.badgePoints_AtoB,
      badge_points_b_to_a: data.badgePoints_BtoA,
      terrain_point_a_id: data.terrainPoint_A,
      terrain_point_b_id: data.terrainPoint_B,
    }

    const section = await sectionService.createSection(transformedData)

    toast.success('Dodanie nowego odcinka przebiegło pomyślnie', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

    navigate(getPath(PathNames.SECTION_EDIT, {
      id: section.id,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const terrainPointsService = apiService.mountainData.terrainPoint
      const terrainPoints = await terrainPointsService.getTerrainPoints()
      const allPointsTemp: Record<number, string> = {}

      terrainPoints.forEach((terrainPoint) => {
        allPointsTemp[terrainPoint.id] = terrainPoint.name
      })

      setAllPoints(
        allPointsTemp,
      )

      const mountainRangeService = apiService.mountainData.mountainRange
      const mountainRanges = await mountainRangeService.getMountainRanges()
      const allMountainRangesTemp: Record<number, string> = {}

      mountainRanges.forEach((mountainRange) => {
        allMountainRangesTemp[mountainRange.id] = mountainRange.name
      })

      setAllMountainRanges(
        allMountainRangesTemp,
      )
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
    <div>
      <h2 className="mb-4"> Dodaj Odcinek </h2>

      <div className="row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-6"
        >
          <div className="mb-3">
            <Input.Component
              label="Nazwa odcinka"
              type={Input.Type.TEXT}
              data={register('name', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.name?.message || undefined}
              onChange={(e) => {
                setMapLine(
                  new MapDefinition.Elements.Line(
                    e.target.value,
                    mapLine.pointAId,
                    mapLine.pointBId,
                  ),
                )
              }}
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
              options={allMountainRanges}
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
              options={allPoints}
              default={mapLine.pointAId}
              data={register('terrainPoint_A', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.terrainPoint_A?.message || undefined}
              onChange={(e) => {
                setMapLine(
                  new MapDefinition.Elements.Line(
                    mapLine.name,
                    e.target.value,
                    mapLine.pointBId,
                  ),
                )
              }}
            />
          </div>

          <div className="mb-3">
            <Select.Component
              label="Wybierz punkt B"
              options={allPoints}
              default={mapLine.pointBId}
              data={register('terrainPoint_B', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
              errorMessage={errors?.terrainPoint_B?.message || undefined}
              onChange={(e) => {
                setMapLine(
                  new MapDefinition.Elements.Line(
                    mapLine.name,
                    mapLine.pointAId,
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
            Zapisz odcinek
          </Button>
        </form>

        <div className="col-6">
          <MapDefinition.Component
            lines={[
              mapLine,
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Section
