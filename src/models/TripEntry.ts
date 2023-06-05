/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export enum Status {
  PLANNED = 'Planowany',
  IN_PROGRESS = 'W trakcie',
  FINISHED = 'Odbyta'
}

class TripEntry {
  sectionId: number

  tripDate: Date

  status: Status

  isBlocked: boolean

  constructor(sectionId: number, tripDate: Date, status: Status, isBlocked: boolean) {
    this.sectionId = sectionId
    this.tripDate = tripDate
    this.status = status
    this.isBlocked = isBlocked
  }
}

export default TripEntry
