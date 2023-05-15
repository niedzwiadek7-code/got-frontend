import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// TODO: Import path should use '@/.'
import { Button, Spinner } from 'react-bootstrap'
import { getPath, PathNames } from '../../../../../../utils/defines'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import MountainGroup from '@/models/MountainGroup'
import MountainRow from './MountainRow'
import MountainRangeRow from './MountainRangeRow'

type Props = {}

const MountainGroupComponent: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()

  const [mountainGroups, setMountainGroup] = useState<MountainGroup[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const mountainGroupService = apiService.mountainData.getMountainGroup(token)
      setMountainGroup(
        await mountainGroupService.getMountainGroupsWithMountainRanges(),
      )
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
    <div>
      <div
        className="text-end"
      >
        <Button
          variant="success"
          href="/mountain-group/add"
          className="mb-3"
        >
          Dodaj grupę górską
        </Button>
      </div>

      <h2 className="mb-4"> Grupy górskie: </h2>

      <table
        className="table"
      >
        <tbody>
          {mountainGroups.map((mountainGroup) => (
            <>
              <MountainRow.Component
                key={uuidv4()}
                mountain={mountainGroup}
              />

              <tr>
                <th />
                <th
                  colSpan={4}
                >
                  <Button
                    variant="outline-success"
                    href={getPath(PathNames.MOUNTAIN_RANGE_ADD, {
                      id: mountainGroup.id,
                    })}
                    className="w-100"
                  >
                    Dodaj pasmo górskie
                  </Button>
                </th>
              </tr>

              {
                mountainGroup.mountainRange.map((mountainRange) => (
                  <MountainRangeRow.Component
                    mountain={mountainRange}
                    key={uuidv4()}
                  />
                ))
              }
            </>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MountainGroupComponent
