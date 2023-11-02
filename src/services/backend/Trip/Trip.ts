import ApiService from '../ApiService'
import Trip from '../../../models/Trip'

class TripService {
  private tripUrl: string = '/plans'

  private apiService: ApiService

  public async getAllTrips(): Promise<Trip[]> {
    const tripsResponse = await this.apiService.get<any[]>(`${this.tripUrl}`)

    return tripsResponse.map((tripBase) => new Trip(
      tripBase.id,
      tripBase.name,
      tripBase.description,
      (tripBase.trip_plan_entries || []).map((entry: any) => ({
        sectionId: entry.section_id,
        date: entry.trip_date,
        oppositeDirection: Boolean(entry.b_to_a),
        section: entry.section,
      })),
    ))
  }

  public async getTrip(tripId: string): Promise<Trip> {
    const tripBase = await this.apiService.get<any>(`${this.tripUrl}/${tripId}`)

    const trip = new Trip(
      tripBase.id,
      tripBase.name,
      tripBase.description,
      tripBase.trip_plan_entries.map((entry: any) => ({
        sectionId: entry.section_id,
        date: entry.trip_date,
        oppositeDirection: Boolean(entry.b_to_a),
        section: entry.section,
      })),
    )

    return trip
  }

  public async createTrip(data?: any): Promise<Trip> {
    const tripRequest = {
      name: data.name,
      description: data.description,
      trip_plan_entries: data.tripElements.map((entry: any) => ({
        section_id: entry.section,
        trip_date: entry.date,
        b_to_a: Boolean(entry.oppositeDirection),
      })),
    }

    return this.apiService.post<Trip>(`${this.tripUrl}/with-entries`, tripRequest)
  }

  public async updateTrip(tripId: string, data?: any): Promise<Trip> {
    const tripRequest = {
      name: data.name,
      description: data.description,
      trip_plan_entries: data.tripElements.map((entry: any) => ({
        section_id: entry.section,
        trip_date: entry.date,
        b_to_a: Boolean(entry.opositeDirection),
      })),
    }

    return this.apiService.put<Trip>(`${this.tripUrl}/with-entries/${tripId}`, tripRequest)
  }

  public async deleteTrip(tripId: string): Promise<void> {
    await this.apiService.delete<any>(`${this.tripUrl}/${tripId}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default TripService
