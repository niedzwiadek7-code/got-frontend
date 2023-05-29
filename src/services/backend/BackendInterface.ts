/* eslint-disable no-unused-vars */

import { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'
import Trip from './Trip/Trip'
import User from './User/User'

export interface BackendInterface {
  mountainData: MountainDataInterface
  getAuth: () => Auth,
  getTrip: (token: string | undefined) => Trip,
  getUser: (token: string | undefined) => User
}
