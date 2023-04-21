import TerrainPoint from '@/models/TerrainPoint'
import ApiService from './ApiService'

class TerrainPointService {
  private terrainPointUrl = '/terrain-points'

  private apiService = ApiService.getInstance()

  public async getTerrainPoints(): Promise<TerrainPoint[]> {
    return this.apiService.get<TerrainPoint[]>(this.terrainPointUrl)
  }

  public async createTerrainPoint(data?: any): Promise<(TerrainPoint)> {
    return this.apiService.post<TerrainPoint>(`${this.terrainPointUrl}`, data)
  }
}

export default TerrainPointService
