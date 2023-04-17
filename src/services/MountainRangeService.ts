import ApiService, { ApiResponse } from './ApiService'
import MountainRange from '@/models/MountainRange'
import Section from '@/models/Section'

class MountainRangeService {
  private mountainRangeUrl = '/mountain-ranges'

  private apiService = ApiService.getInstance()

  public async getMountainRanges(): Promise<MountainRange[]> {
    const response = await this.apiService.get<ApiResponse<MountainRange[]>>(`${this.mountainRangeUrl}`)
    return response as any as Promise<MountainRange[]>
  }

  public async getSections(mountainRangeId: number): Promise<Section[]> {
    const response = await this.apiService.get<ApiResponse<Section[]>>(`${this.mountainRangeUrl}/${mountainRangeId}/sections`)
    return response as any as Promise<Section[]>
  }
}

export default MountainRangeService
