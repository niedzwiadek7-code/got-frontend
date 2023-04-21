import ApiService, { ApiResponse } from './ApiService'
import MountainRange from '@/models/MountainRange'
import MountainGroupService from './MountainGroupService'
import Section from '@/models/Section'

class MountainRangeService {
  private mountainRangeUrl = '/mountain-ranges'

  private apiService = ApiService.getInstance()

  public async getMountainRanges(): Promise<MountainRange[]> {
    const response = await this.apiService.get<ApiResponse<MountainRange[]>>(`${this.mountainRangeUrl}`)
    return response as any as Promise<MountainRange[]>
  }

  public async getMountainRangeWithSections(): Promise<MountainRange[]> {
    const mountains = await this.apiService.get<MountainRange[]>(`${this.mountainRangeUrl}`)

    // eslint-disable-next-line no-restricted-syntax
    for (const mountain of mountains) {
      mountain.sections = await this.getSections(mountain.id.toString())
    }

    return mountains
  }

  public async getOneMountainRange(mountainRangeId: string): Promise<MountainRange> {
    const mountain = await this.apiService.get<MountainRange>(`${this.mountainRangeUrl}/${mountainRangeId}`)
    mountain.sections = await this.getSections(mountainRangeId)

    const mountainGroupService = new MountainGroupService()
    mountain.mountain_group = await mountainGroupService.getOneMountainGroup(mountain.id.toString())

    return mountain
  }

  public async getSections(mountainRangeId: string): Promise<Section[]> {
    const response = await this.apiService.get<ApiResponse<Section[]>>(`${this.mountainRangeUrl}/${mountainRangeId}/sections`)
    return response as any as Promise<Section[]>
  }
}

export default MountainRangeService
