import Section from '@/models/Section'

class MountainRange {
  id : number

  name : string

  mountain_group_id : number

  sections : Array<Section>

  created_at : string

  updated_at : string

  // eslint-disable-next-line max-len
  constructor(id: number, name: string, mountainGroupId: number, createdAt: string, updatedAt: string) {
    this.id = id
    this.name = name
    this.mountain_group_id = mountainGroupId
    this.sections = []
    this.created_at = updatedAt
    this.updated_at = createdAt
  }
}

export default MountainRange
