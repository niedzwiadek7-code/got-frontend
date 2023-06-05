import ApiService from '../ApiService'
import Trip from '../../../models/Trip'
import TripEntry from '../../../models/TripEntry'

class TripService {
  private tripUrl: string = '/plans'

  private apiService: ApiService

  public async createTrip(data?: any): Promise<Trip> {
    const tripRequest = {
      name: data.name,
      description: data.description,
    }

    const response = await this.apiService.post<Trip>(`${this.tripUrl}`, tripRequest)

    const tripId = response.id

    const entriesRequest = data.tripElements.map((entry: any) => ({
      trip_plan_id: tripId,
      section_id: entry.section,
      trip_date: entry.date,
      b_to_a: Boolean(entry.opositeDirection),
    }))

    // eslint-disable-next-line no-restricted-syntax
    for (const entryRequest of entriesRequest) {
      await this.apiService.post<TripEntry>(`${this.tripUrl}/entries`, entryRequest)
    }

    return response
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default TripService
