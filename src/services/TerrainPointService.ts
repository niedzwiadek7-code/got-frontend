import TerrainPoint from '@/models/TerrainPoint'
import ApiService, { ApiResponse } from './ApiService'

class TerrainPointService {
  private terrainPointUrl = '/terrain-points'

  private apiService = ApiService.getInstance()

  public async getTerrainPoints(): Promise<TerrainPoint[]> {
    const response = await this.apiService.get<ApiResponse<TerrainPoint[]>>(this.terrainPointUrl)
    // TODO: improve types
    return response as any as Promise<TerrainPoint[]>
  }
}

export default TerrainPointService
