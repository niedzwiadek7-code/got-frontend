import ApiService from '../ApiService'
import UserModel from '../../../models/User'

class User {
  private apiService: ApiService

  private userUrl = '/user'

  public async getAllUsersWithRoles() {
    const response = await this.apiService.get<Record<string, Array<any>>>(`${this.userUrl}/users-with-roles`)
    const backendUsers = response.users
    return backendUsers.map((user) => {
      const modelUser = new UserModel(user)
      if (user.roles[0]) {
        modelUser.setRoles(user.roles[0])
      }
      return modelUser
    })
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default User
