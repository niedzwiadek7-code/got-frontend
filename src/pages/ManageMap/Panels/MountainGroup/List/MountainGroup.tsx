import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// TODO: Import path should use '@/.'
import MountainGroupService from '../../../../../services/MountainGroupService'
import MountainGroup from '@/models/MountainGroup'
import MountainRow from './MountainRow'
import MountainRangeRow from './MountainRangeRow'

type Props = {}

const MountainGroupComponent: React.FC<Props> = () => {
  const [mountainGroups, setMountainGroup] = useState<MountainGroup[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const mountainGroupService = new MountainGroupService()
      setMountainGroup(
        await mountainGroupService.getMountainGroupsWithMountainRanges(),
      )
    }
    fetchData()
  }, [])

  return (
    <div className="w-50">
      <h2 className="mb-4"> Grupy górskie: </h2>

      <table
        className="table"
      >
        <thead>
          <tr>
            <th scope="col">
              Grupa górska
            </th>

            <th scope="col">
              Pasmo górskie
            </th>

            <th scope="col" className="text-center" />

            <th scope="col" className="text-center" />
          </tr>
        </thead>
        <tbody>
          {mountainGroups.map((mountainGroup) => (
            <>
              <MountainRow.Component
                key={uuidv4()}
                mountain={mountainGroup}
              />

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
