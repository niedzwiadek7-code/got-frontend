import { BackendInterface } from './BackendInterface'
import MountainData, { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  mountainData: MountainDataInterface

  getAuth: () => Auth

  constructor() {
    this.mountainData = new MountainData()
    this.getAuth = () => new Auth()
  }
}
