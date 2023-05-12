import { BackendInterface } from './BackendInterface'
import MountainData, { MountainDataInterface } from './MountainData'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  mountainData: MountainDataInterface

  constructor() {
    this.mountainData = new MountainData()
  }
}
