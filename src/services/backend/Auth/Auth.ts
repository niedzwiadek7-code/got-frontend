import ApiService from '../ApiService'
import AuthDataHandler from '../../../handlers/AuthDataHandler'
import User from '@/models/User'

class Auth {
  private authUrl = '/auth'

  private apiService: ApiService

  public async login(data?: any): Promise<AuthDataHandler> {
    const response = await this.apiService.post<{ user: User, token: string}>(`${this.authUrl}/login`, data)
    const authDataHandler = new AuthDataHandler()
    authDataHandler.setAuthData({
      user: response.user,
      token: response.token,
    })
    return authDataHandler
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
