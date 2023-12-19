import ApiService from '../ApiService'
import BadgeAward from '../../../models/BadgeAward'

class BadgeAwardService {
  private badgeAwardUrl: string = '/badge-awards'

  private apiService: ApiService

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }

  public async getBadgeAwardsForGotBook(): Promise<BadgeAward[]> {
    return this.apiService.get<BadgeAward[]>(`${this.badgeAwardUrl}/for-got-book`)
  }
}

export default BadgeAwardService
