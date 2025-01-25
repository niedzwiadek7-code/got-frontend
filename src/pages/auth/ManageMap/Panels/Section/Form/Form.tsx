import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import * as Input from '../../../../../../components/UI/Input'
import TextArea from '../../../../../../components/UI/TextArea'
import Select from '../../../../../../components/UI/Select'
import { getPath, PathNames } from '../../../../../../utils/defines'
import { useDependencies } from '../../../../../../context/dependencies'
import * as MapDefinition from '../../../../../../components/Map'
import { useAuth } from '../../../../../../context/auth'
import Section from '@/models/Section'
import * as Loading from '../../../../../../components/UI/Loading'
import * as Modal from '../../../../../../components/UI/Modal'

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

const Form: React.FC<Props> = () => {
  const { rangeId } = useParams()
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const { id } = useParams()
  const [section, setSection] = useState<(Section | undefined)>()
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  const [allPoints, setAllPoints] = useState<Record<number, string>>({})
  const [allMountainRanges, setAllMountainRanges] = useState<Record<number, string>>({})
  const [defaultMountainRangeId, setDefaultMountainRangeId] = useState<string | undefined>()

  const [mapLine, setMapLine] = useState<MapDefinition.Elements.Line>(
    new MapDefinition.Elements.Line(
      '',
      1,
      1,
    ),
  )
  const [sectionService] = useState(apiService.mountainData.getSection(token))
  const [terrainPointsService] = useState(apiService.mountainData.getTerrainPoint(token))
  const [mountainRangeService] = useState(apiService.mountainData.getMountainRange(token))

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const localSection: Section = await sectionService.getOneSection(id)

        if (localSection) {
          setSection(localSection)
          setMapLine(
            new MapDefinition.Elements.Line(
              localSection.name || '',
              localSection.terrain_point_a_id,
              localSection.terrain_point_b_id,
            ),
          )
        }
      }

      const terrainPoints = await terrainPointsService.getTerrainPoints()
      const allPointsTemp: Record<number, string> = {}

      terrainPoints.forEach((terrainPoint) => {
        allPointsTemp[terrainPoint.id] = terrainPoint.name
      })

      setAllPoints(
        allPointsTemp,
      )

      const mountainRanges = await mountainRangeService.getMountainRanges()
      const allMountainRangesTemp: Record<number, string> = {}

      mountainRanges.forEach((mountainRange) => {
        allMountainRangesTemp[mountainRange.id] = mountainRange.name
      })

      setAllMountainRanges(
        allMountainRangesTemp,
      )
      setLoading(false)
    }
    fetchData()
  }, [id, sectionService, terrainPointsService, mountainRangeService])

  useEffect(() => {
    const fetchData = async () => {
      const terrainPoints = await terrainPointsService.getTerrainPoints()
      const allPointsTemp: Record<number, string> = {}

      terrainPoints.forEach((terrainPoint) => {
        allPointsTemp[terrainPoint.id] = terrainPoint.name
      })

      setAllPoints(
        allPointsTemp,
      )

      const mountainRanges = await mountainRangeService.getMountainRanges()
      const allMountainRangesTemp: Record<number, string> = {}

      mountainRanges.forEach((mountainRange) => {
        allMountainRangesTemp[mountainRange.id] = mountainRange.name
      })

      setAllMountainRanges(
        allMountainRangesTemp,
      )

      setDefaultMountainRangeId(rangeId)
    }
    fetchData()
  }, [terrainPointsService, mountainRangeService])

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const transformedData = {
      name: data.name,
      description: data.description,
      mountain_range_id: data.mountainRange,
      badge_points_a_to_b: data.badgePoints_AtoB,
      badge_points_b_to_a: data.badgePoints_BtoA,
      terrain_point_a_id: data.terrainPoint_A,
      terrain_point_b_id: data.terrainPoint_B,
    }

    try {
      if (id) {
        const sectionResult = await sectionService.editSection(id, transformedData)
        toastUtils.Toast.showToast(
          toastUtils.types.INFO,
          'Edycja odcinka przebiegła pomyślnie',
        )
        navigate(getPath(PathNames.SECTION, {
          id: sectionResult.id,
        }))
      } else {
        const sectionResult = await sectionService.createSection(transformedData)
        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          'Dodanie nowego odcinka przebiegło pomyślnie',
        )

        navigate(getPath(PathNames.SECTION, {
          id: sectionResult.id,
        }))
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieocezekiwany błąd',
      )
    }
  }

  const deleteSection = async () => {
    try {
      await sectionService.deleteSection(id || '')

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Usunięcie odcinka przebiegło pomyślnie',
      )

      if (section) {
        navigate(getPath(PathNames.MOUNTAIN_RANGE, {
          id: section.mountainRange?.id,
        }))
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieocezekiwany błąd',
      )
    }
  }

  if (loading) {
    return <Loading.Component />
  }

  return (
    <div>
      <h2 className="mb-4">
        {section ? 'Edytuj odcinek' : 'Dodaj Odcinek'}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="mb-3">
              <Input.Component
                label="Nazwa odcinka"
                type={Input.Type.TEXT}
                register={register}
                name="name"
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
                default={section?.name}
                validation={['required', 'min:3']}
              />
            </div>

            <div className="mb-3">
              <TextArea.Component
                label="Opis odcinka"
                height={150}
                register={register}
                name="description"
                errorMessage={errors?.description?.message || undefined}
                default={section?.description}
              />
            </div>

            <div className="mb-3">
              <Select.Component
                label="Wybierz pasmo górskie"
                default={defaultMountainRangeId || section?.mountain_range_id}
                options={allMountainRanges}
                register={register}
                name="mountainRange"
                errorMessage={errors?.mountainRange?.message || undefined}
                sortOptions
              />
            </div>

            <div className="mb-3">
              <Select.Component
                label="Wybierz punkt A"
                options={allPoints}
                register={register}
                name="terrainPoint_A"
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
                default={section?.terrain_point_a_id || mapLine.pointAId}
                sortOptions
              />
            </div>

            <div className="mb-3">
              <Select.Component
                label="Wybierz punkt B"
                options={allPoints}
                register={register}
                name="terrainPoint_B"
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
                default={section?.terrain_point_b_id || mapLine.pointBId}
                sortOptions
              />
            </div>

            <div className="mb-3">
              <Input.Component
                label="Punkty do uzyskania (od A do B)"
                type={Input.Type.NUMBER}
                register={register}
                name="badgePoints_AtoB"
                errorMessage={errors?.badgePoints_AtoB?.message || undefined}
                default={section?.badge_points_a_to_b}
              />
            </div>

            <div className="mb-3">
              <Input.Component
                label="Punkty do uzyskania (od B do A)"
                type={Input.Type.NUMBER}
                register={register}
                name="badgePoints_BtoA"
                errorMessage={errors?.badgePoints_BtoA?.message || undefined}
                default={section?.badge_points_b_to_a}
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 mb-2" style={{ minHeight: '40vh' }}>
            <MapDefinition.Component
              lines={[
                mapLine,
              ]}
              zoom={13}
            />
          </div>
        </div>

        {
          section ? (
            <>
              <Button
                type="submit"
                variant="primary"
                className="me-3"
              >
                Edytuj odcinek
              </Button>

              <Modal.Component
                title="Usuń odcinek"
                message="Czy napewno chcesz usunąć odcinek?"
                action={deleteSection}
                variant="danger"
              />
            </>
          ) : (
            <Button
              type="submit"
              variant="success"
            >
              Zapisz odcinek
            </Button>
          )
        }
      </form>
    </div>
  )
}

export default Form
