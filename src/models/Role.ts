class Role {
  name: string

  id: number

  assignmentDate: string

  constructor(id: number, name: string, assignmentDate: string) {
    this.id = id
    this.name = name
    this.assignmentDate = assignmentDate
  }
}

export default Role
