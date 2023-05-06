import MountainRange from '@/models/MountainRange'

class MountainGroup {
  id: number

  name: string

  created_at: string

  updated_at: string

  mountain_ranges: Array<MountainRange>

  constructor(id: number, name: string, created: string, updated: string) {
    this.id = id
    this.name = name
    this.created_at = created
    this.updated_at = updated
    this.mountain_ranges = []
  }
}

export default MountainGroup
