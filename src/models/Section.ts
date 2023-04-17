class Section {
  id : number

  name : string

  description : string

  terrain_point_a_id : number

  terrain_point_b_id : number

  badge_points_a_to_b : number

  badge_points_b_to_a : number

  created_at : string

  updated_at : string

  // eslint-disable-next-line max-len
  constructor(id: number, name: string, description: string, terrainPointAId: number, terrainPointBId: number, badgePointsAToB: number, badgePointsBToA: number, createdAt: string, updatedAt: string) {
    this.id = id
    this.name = name
    this.description = description
    this.terrain_point_a_id = terrainPointAId
    this.terrain_point_b_id = terrainPointBId
    this.badge_points_a_to_b = badgePointsAToB
    this.badge_points_b_to_a = badgePointsBToA
    this.created_at = createdAt
    this.updated_at = updatedAt
  }
}

export default Section
