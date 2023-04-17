import TerrainPoint from '@/models/TerrainPoint'
import ApiService, { ApiResponse } from './ApiService'
import Section from '@/models/Section'

class SectionService {
  private sectionUrl = '/sections'

  private apiService = ApiService.getInstance()

  public async getSections(): Promise<Section[]> {
    const response = await this.apiService.get<ApiResponse<Section[]>>(this.sectionUrl)
    return response as any as Promise<Section[]>
  }

  public async getTerrainPoints(sectionId : number): Promise<TerrainPoint[]> {
    const response = await this.apiService.get<ApiResponse<TerrainPoint[]>>(`${this.sectionUrl}/${sectionId}/terrain-points`)
    return response as any as Promise<TerrainPoint[]>
  }
}

export default SectionService
