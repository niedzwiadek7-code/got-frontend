import TerrainPoint from '@/models/TerrainPoint'
import ApiService from './ApiService'

class TerrainPointService {
  private terrainPointUrl = '/terrain-points'

  private apiService = ApiService.getInstance()

  public async getTerrainPoints(): Promise<TerrainPoint[]> {
    return this.apiService.get<TerrainPoint[]>(this.terrainPointUrl)
  }
}

export default TerrainPointService
