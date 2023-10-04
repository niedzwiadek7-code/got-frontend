import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// TODO: Import path should use '@/.'
import { Button } from 'react-bootstrap'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import * as Loading from '../../../../../../components/UI/Loading'
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
  const [mountainGroupService] = useState(apiService.mountainData.getMountainGroup(token))

  useEffect(() => {
    const fetchData = async () => {
      setMountainGroup(
        await mountainGroupService.getMountainGroupsWithMountainRanges(),
      )
      setLoading(false)
    }
    fetchData()
  }, [mountainGroupService])

  if (loading) {
    return (
      <Loading.Component />
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

              {
                mountainGroup.mountain_ranges.map((mountainRange) => (
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
