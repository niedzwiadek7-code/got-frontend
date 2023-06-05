import { BackendInterface } from './BackendInterface'
import MountainData, { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'
import Trip from './Trip/Trip'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  mountainData: MountainDataInterface

  getAuth: () => Auth

  // eslint-disable-next-line no-unused-vars
  getTrip: (token: string | undefined) => Trip

  constructor() {
    this.mountainData = new MountainData()
    this.getAuth = () => new Auth()
    this.getTrip = (token: string | undefined) => new Trip(token || '')
  }
}
