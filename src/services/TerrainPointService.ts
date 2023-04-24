import TerrainPoint from '@/models/TerrainPoint'
import ApiService from './ApiService'

class TerrainPointService {
  private terrainPointUrl = '/terrain-points'

  private apiService = ApiService.getInstance()

  public async getTerrainPoints(): Promise<TerrainPoint[]> {
    return this.apiService.get<TerrainPoint[]>(this.terrainPointUrl)
  }

  public async getTerrainPoint(id: string): Promise<TerrainPoint> {
    return this.apiService.get<TerrainPoint>(`${this.terrainPointUrl}/${id}`)
  }

  public async createTerrainPoint(data?: any): Promise<(TerrainPoint)> {
    return this.apiService.post<TerrainPoint>(`${this.terrainPointUrl}`, data)
  }

  public async editTerrainPoint(id: string, data?: any): Promise<(TerrainPoint)> {
    return this.apiService.put<TerrainPoint>(`${this.terrainPointUrl}/${id}`, data)
  }

  public async deleteTerrainPoint(id: string, data?: any): Promise<(TerrainPoint)> {
    return this.apiService.delete<TerrainPoint>(`${this.terrainPointUrl}/${id}`, data)
  }
}

export default TerrainPointService
