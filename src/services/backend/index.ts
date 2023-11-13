/* eslint-disable no-unused-vars */

import { BackendInterface } from './BackendInterface'
import MountainData, { MountainDataInterface } from './MountainData'
import Auth from './Auth/Auth'
import User from './User/User'
import Trip from './Trip/Trip'
import Badge from './Badge/Badge'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  mountainData: MountainDataInterface

  getAuth: () => Auth

  getUser: (token: string | undefined) => User

  getTrip: (token: string | undefined) => Trip

  getBadge: (token: string | undefined) => Badge

  constructor() {
    this.mountainData = new MountainData()
    this.getAuth = () => new Auth()
    this.getTrip = (token: string | undefined) => new Trip(token || '')
    this.getBadge = (token: string | undefined) => new Badge(token || '')
    this.getUser = (token: string | undefined) => new User(token || '')
  }
}
