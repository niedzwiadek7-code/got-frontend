import MountainRange from '@/models/MountainRange'

class MountainGroup {
  id: bigint

  name: string

  created_at: string

  updated_at: string

  mountainRange: Array<MountainRange>

  constructor(id: bigint, name: string, created: string, updated: string) {
    this.id = id
    this.name = name
    this.created_at = created
    this.updated_at = updated
    this.mountainRange = []
  }
}

export default MountainGroup
