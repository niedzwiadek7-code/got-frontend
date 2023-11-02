/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

class GotBookEntry {
  id: number

  gotBookId: number

  badgeAwardId: number

  sectionId: number

  date: Date

  oppositeDirection: boolean

  constructor(
    id: number,
    sectionId: number,
    tripDate: Date,
    gotBookId: number,
    oppositeDirection: boolean,
    badgeAwardId: number,
  ) {
    this.id = id
    this.sectionId = sectionId
    this.date = tripDate
    this.gotBookId = gotBookId
    this.oppositeDirection = oppositeDirection
    this.badgeAwardId = badgeAwardId
  }
}

export default GotBookEntry
