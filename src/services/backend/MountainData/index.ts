import { MountainDataInterface } from './MountainDataInterface'

import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section'
import TerrainPoint from './TerrainPoint'

export * from './MountainDataInterface'

export default class MountainData implements MountainDataInterface {
  mountainGroup: MountainGroup

  mountainRange: MountainRange

  section: Section

  terrainPoint: TerrainPoint

  constructor() {
    this.mountainGroup = new MountainGroup()
    this.mountainRange = new MountainRange()
    this.section = new Section()
    this.terrainPoint = new TerrainPoint()
  }
}
