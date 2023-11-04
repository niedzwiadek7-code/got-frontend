/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

class GotBook {
  id: number

  gotBookId: string

  userId: number

  constructor(
    id: number,
    gotBookId: string,
    userId: number,
  ) {
    this.id = id
    this.gotBookId = gotBookId
    this.userId = userId
  }
}

export default GotBook
