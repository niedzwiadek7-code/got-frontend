import TripEntry from '@/models/TripEntry'

class Trip {
  id: number

  name: string

  description: string

  tripEntries: TripEntry[]

  constructor(id: number, name: string, description: string, tripEntries: TripEntry[]) {
    this.id = id
    this.name = name
    this.description = description
    this.tripEntries = tripEntries
  }
}

export default Trip
