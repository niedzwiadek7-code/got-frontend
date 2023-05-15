import { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'

export interface BackendInterface {
  mountainData: MountainDataInterface
  getAuth: () => Auth
}
