import ApiService from '../ApiService'
import GotBookEntry from '@/models/GotBookEntry'
import TripEntry from '@/models/TripEntry'
import GotBook from '@/models/GotBook'
import BadgeAward from '@/models/BadgeAward'

class GotBookService {
  private gotBookUrl: string = '/got-books'

  private apiService: ApiService

  public async mapEntryToGot(
    gotBookId: number,
    badgeAwardId: number,
    entry: TripEntry,
  ): Promise<GotBookEntry> {
    const tripRequest = {
      got_book_id: gotBookId,
      badge_award_id: badgeAwardId,
      trip_plan_entry_id: entry.id,
      section_id: entry.section.id,
      trip_date: entry.date,
      b_to_a: Boolean(entry.oppositeDirection),
    }

    return this.apiService.put<GotBookEntry>(`${this.gotBookUrl}/map-entry`, tripRequest)
  }

  public async getGotBook() {
    return this.apiService.get<GotBook>(`${this.gotBookUrl}`)
  }

  public async createGotBook() {
    return this.apiService.post<GotBook>(`${this.gotBookUrl}`)
  }

  public async getLatestBadgeAward() {
    return this.apiService.get<BadgeAward>(`${this.gotBookUrl}/badge-award`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default GotBookService
