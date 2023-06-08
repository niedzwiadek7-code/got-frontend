/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import Section from './Section'

export enum Status {
  PLANNED = 'Planowany',
  IN_PROGRESS = 'W trakcie',
  FINISHED = 'Odbyta'
}

class TripEntry {
  id: number

  sectionId: number

  section: Section

  date: Date

  status: Status

  oppositeDirection: boolean

  constructor(
    id: number,
    sectionId: number,
    tripDate: Date,
    status: Status,
    oppositeDirection: boolean,
    section: Section,
  ) {
    this.id = id
    this.sectionId = sectionId
    this.date = tripDate
    this.status = status
    this.oppositeDirection = oppositeDirection
    this.section = section
  }
}

export default TripEntry
