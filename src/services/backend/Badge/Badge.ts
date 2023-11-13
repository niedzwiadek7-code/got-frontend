import ApiService from '../ApiService'
import Badge from '../../../models/Badge'

class BadgeService {
  private badgeUrl: string = '/badges'

  private apiService: ApiService

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }

  public async getAllBadges(): Promise<Badge[]> {
    const badgesResponse = await this.apiService.get<Badge[]>(`${this.badgeUrl}`)
    return badgesResponse
  }

  public async getBadge(badgeId: string): Promise<Badge> {
    const badgeResponse = await this.apiService.get<Badge>(`${this.badgeUrl}/${badgeId}`)
    return badgeResponse
  }

  public async createBadge(data: any): Promise<Badge> {
    const badgeRequest = {
      name: data.name,
      point_threshold: data.point_threshold,
      next_badge: data.next_badge,
      previous_badge: data.previous_badge,
    }

    const newBadge = await this.apiService.post<Badge>(`${this.badgeUrl}`, badgeRequest)
    return newBadge
  }

  public async updateBadge(badgeId: string, data: any): Promise<Badge> {
    const badgeRequest = {
      name: data.name,
      point_threshold: data.point_threshold,
      next_badge: data.next_badge,
      previous_badge: data.previous_badge,
    }

    const updatedBadge = await this.apiService.put<Badge>(`${this.badgeUrl}/${badgeId}`, badgeRequest)
    return updatedBadge
  }

  public async deleteBadge(badgeId: string): Promise<void> {
    await this.apiService.delete<void>(`${this.badgeUrl}/${badgeId}`)
  }
}

export default BadgeService
