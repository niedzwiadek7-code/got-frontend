/* eslint-disable no-unused-vars */

import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section'
import TerrainPoint from './TerrainPoint'

export interface MountainDataInterface {
  getMountainGroup: (token: string | undefined) => MountainGroup,
  getMountainRange: (token: string | undefined) => MountainRange,
  getSection: (token: string | undefined) => Section,
  getTerrainPoint: (token: string | undefined) => TerrainPoint
}
