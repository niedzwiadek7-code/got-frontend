import ApiService from '../ApiService'

class Auth {
  private authUrl = '/auth'

  private apiService: ApiService

  public async login(data?: any): Promise<string> {
    const response = await this.apiService.post<{ user: Record<string, any>, token: string}>(`${this.authUrl}/login`, data)
    return response.token
  }

  public async register(data?: any): Promise<string> {
    const response = await this.apiService.post<{ user: Record<string, any>, token: string}>(`${this.authUrl}/register`, data)
    return response.token
  }

  constructor() {
    this.apiService = new ApiService('')
  }
}

export default Auth
