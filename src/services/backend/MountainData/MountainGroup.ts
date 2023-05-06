import MountainGroup from '@/models/MountainGroup'
import ApiService from '../ApiService'

class MountainGroupService {
  private mountainGroupUrl = '/mountain-groups'

  private apiService: ApiService

  public async getMountainGroups(): Promise<MountainGroup[]> {
    return this.apiService.get<MountainGroup[]>(this.mountainGroupUrl)
  }

  public async getMountainGroupsWithMountainRanges(): Promise<MountainGroup[]> {
    return this.apiService.get<MountainGroup[]>(`${this.mountainGroupUrl}/with-ranges`)
  }

  public async getOneMountainGroup(id: string): Promise<(MountainGroup | undefined)> {
    return this.apiService.get<MountainGroup>(`${this.mountainGroupUrl}/${id}`)
  }

  public async addMountainGroup(data?: any): Promise<MountainGroup> {
    return this.apiService.post<MountainGroup>(this.mountainGroupUrl, data)
  }

  public async editMountainGroup(id: string, data?: any): Promise<MountainGroup> {
    return this.apiService.put<MountainGroup>(`${this.mountainGroupUrl}/${id}`, data)
  }

  public async deleteMountainGroup(id: string): Promise<MountainGroup> {
    return this.apiService.delete<MountainGroup>(`${this.mountainGroupUrl}/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default MountainGroupService
