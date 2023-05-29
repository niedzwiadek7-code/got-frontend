import Role from './Role'

class User {
  name: string

  email: string

  firstName: string

  lastName: string

  legitimationNumber: string

  roles?: Role[] = []

  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.firstName = data.first_name
    this.lastName = data.last_name
    this.legitimationNumber = data.legitimation_number
  }

  setRoles(roles: Record<string, number>) {
    const trackedMountainGroups = {
      tatra_podtatrze: 'Tatra Podtatrze',
      tatra_slowackie: 'Tatra Słowackie',
      beskidy_zachodnie: 'Beskidy Zachodnie',
      beskidy_wschodnie: 'Beskidy Wschodnie',
      gory_swietokrzyskie: 'Góry Świętokrzyskie',
      sudety: 'Sudety',
      słowacja: 'Słowacja',
    }

    this.roles = Object.entries(trackedMountainGroups).map(([key, name]) => new Role(
      name,
      Boolean(roles[key]),
    ))
  }
}

export default User
