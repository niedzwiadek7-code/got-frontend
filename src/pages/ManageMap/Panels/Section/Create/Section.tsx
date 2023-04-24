import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as Input from '../../../../../components/UI/Input'
import TextArea from '../../../../../components/UI/TextArea'
import Select from '../../../../../components/UI/Select'
import TerrainPointService from '../../../../../services/TerrainPointService'
import { Errors, getPath, PathNames } from '../../../../../utils/defines'
import SectionService from '../../../../../services/SectionService'
import MountainRangeService from '../../../../../services/MountainRangeService'

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
  const navigate = useNavigate()
  const [allPoints, setAllPoints] = useState<Record<number, string>>({})
  const [allMountainRanges, setAllMountainRanges] = useState<Record<number, string>>({})

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const sectionService = new SectionService()

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
      const terrainPointsService = new TerrainPointService()
      const terrainPoints = await terrainPointsService.getTerrainPoints()
      const allPointsTemp: Record<number, string> = {}

      terrainPoints.forEach((terrainPoint) => {
        allPointsTemp[terrainPoint.id] = terrainPoint.name
      })

      setAllPoints(
        allPointsTemp,
      )

      const mountainRangeService = new MountainRangeService()
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
            data={register('terrainPoint_A', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.terrainPoint_A?.message || undefined}
          />
        </div>

        <div className="mb-3">
          <Select.Component
            label="Wybierz punkt B"
            options={allPoints}
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
