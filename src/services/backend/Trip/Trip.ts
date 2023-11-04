import ApiService from '../ApiService'
import Trip from '../../../models/Trip'
import TripEntry from '../../../models/TripEntry'

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
        id: entry.id,
        sectionId: entry.section_id,
        date: entry.trip_date,
        oppositeDirection: Boolean(entry.b_to_a),
        section: entry.section,
      })),
    ))
  }

  public async getTrip(tripId: string): Promise<Trip> {
    const tripBase = await this.apiService.get<any>(`${this.tripUrl}/${tripId}`)

    return new Trip(
      tripBase.id,
      tripBase.name,
      tripBase.description,
      tripBase.trip_plan_entries.map((entry: any) => ({
        id: entry.id,
        sectionId: entry.section_id,
        date: entry.trip_date,
        oppositeDirection: Boolean(entry.b_to_a),
        section: entry.section,
      })),
    )
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

  public async getMappedEntries(tripId: string): Promise<TripEntry[]> {
    const tripEntriesResponse = await this.apiService.get<any[]>(`${this.tripUrl}/${tripId}/mapped`)

    return tripEntriesResponse.map((entry: any) => new TripEntry(
      entry.id,
      entry.section_id,
      entry.trip_date,
      entry.status,
      Boolean(entry.b_to_a),
      entry.section,
    ))
  }

  public async getUnmappedEntries(tripId: string): Promise<TripEntry[]> {
    const tripEntriesResponse = await this.apiService.get<any[]>(`${this.tripUrl}/${tripId}/unmapped`)

    return tripEntriesResponse.map((entry: any) => new TripEntry(
      entry.id,
      entry.section_id,
      entry.trip_date,
      entry.status,
      Boolean(entry.b_to_a),
      entry.section,
    ))
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default TripService
