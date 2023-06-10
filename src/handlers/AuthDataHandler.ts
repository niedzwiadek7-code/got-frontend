import User from '@/models/User'

interface AuthData {
    user: User;
    token: string;
}

class AuthDataHandler {
  private authData: AuthData | null

  constructor() {
    this.authData = null
  }

  setAuthData(data: AuthData): void {
    this.authData = data
  }

  clearAuthData(): void {
    this.authData = null
  }

  getAuthData(): AuthData | null {
    return this.authData
  }

  getUser(): User | null {
    return this.authData?.user || null
  }

  getToken(): string | undefined {
    return this.authData?.token || undefined
  }

  getUserRoles(): string[] | null {
    return this.authData?.user.roles || null
  }
}

export default AuthDataHandler
