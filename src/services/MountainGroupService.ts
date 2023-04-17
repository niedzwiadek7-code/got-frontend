import MountainGroup from '@/models/MountainGroup'
import MountainRange from '@/models/MountainRange'
import ApiService from './ApiService'

class MountainGroupService {
  private mountainGroupUrl = '/mountain-groups'

  private apiService = ApiService.getInstance()

  public async getMountainGroups(): Promise<MountainGroup[]> {
    return this.apiService.get<MountainGroup[]>(this.mountainGroupUrl)
  }

  public async getMountainGroupsWithMountainRanges(): Promise<MountainGroup[]> {
    const mountains = await this.apiService.get<MountainGroup[]>(this.mountainGroupUrl)

    // eslint-disable-next-line no-restricted-syntax
    for (const mountain of mountains) {
      mountain.mountainRange = await this.apiService.get<MountainRange[]>(`${this.mountainGroupUrl}/${mountain.id}/mountain-ranges`)
    }

    return mountains
  }
}

export default MountainGroupService
