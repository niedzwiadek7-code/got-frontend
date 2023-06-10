import ApiService from '../ApiService'
import UserModel from '../../../models/User'

class User {
  private apiService: ApiService

  private userUrl = '/users'

  public async getAllUsersWithRoles() {
    const backendUsers = await this.apiService.get<any[]>(`${this.userUrl}/with-mountain-groups/`)
    return backendUsers.map((user) => {
      const modelUser = new UserModel(user)
      modelUser.setRoles(user.mountain_groups)
      return modelUser
    })
  }

  public async getUserWithRoles(id: string) {
    const response = await this.apiService.get<any[]>(`${this.userUrl}/with-mountain-groups/${id}`)
    const backendUser = response[0]
    const modelUser = new UserModel(backendUser)
    modelUser.setRoles(backendUser.mountain_groups)
    return modelUser
  }

  public async assignMountainGroup(data?: any) {
    return this.apiService.post<any>(`${this.userUrl}/assign-mountain-group`, data)
  }

  public async revokeMountainGroup(data?: any) {
    return this.apiService.post<any>(`${this.userUrl}/revoke-mountain-group`, data)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default User
