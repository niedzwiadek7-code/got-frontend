import Role from './Role'

class User {
  id: number

  name: string

  email: string

  firstName: string

  lastName: string

  legitimationNumber: string

  roles?: Role[] = []

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.firstName = data.first_name
    this.lastName = data.last_name
    this.legitimationNumber = data.legitimation_number
  }

  setRoles(roles: Record<string, any>[]) {
    this.roles = roles.map((role) => new Role(
      role.id,
      role.name,
      role.pivot.assignment_date,
    ))
  }
}

export default User
