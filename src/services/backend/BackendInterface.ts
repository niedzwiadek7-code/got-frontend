import { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'
import Trip from './Trip/Trip'

export interface BackendInterface {
  mountainData: MountainDataInterface
  getAuth: () => Auth,
  // eslint-disable-next-line no-unused-vars
  getTrip: (token: string | undefined) => Trip,
}
