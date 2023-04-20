import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// TODO: Import path should use '@/.'
// import { Button } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
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
                    href={`/mountain-range/add/${mountainGroup.id}`}
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
