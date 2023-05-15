/* eslint-disable no-unused-vars */

import { MountainDataInterface } from './MountainDataInterface'

import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section'
import TerrainPoint from './TerrainPoint'

export * from './MountainDataInterface'

export default class MountainData implements MountainDataInterface {
  getMountainGroup: (token: string | undefined) => MountainGroup

  getMountainRange: (token: string | undefined) => MountainRange

  getSection: (token: string | undefined) => Section

  getTerrainPoint: (token: string | undefined) => TerrainPoint

  constructor() {
    this.getMountainGroup = (token: string | undefined) => new MountainGroup(token || '')
    this.getMountainRange = (token: string | undefined) => new MountainRange(token || '')
    this.getSection = (token: string | undefined) => new Section(token || '')
    this.getTerrainPoint = (token: string | undefined) => new TerrainPoint(token || '')
  }
}
