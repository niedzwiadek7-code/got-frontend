class Section {
  id : number

  name : string

  description : string

  mountain_range_id : number

  terrain_point_a_id : number

  terrain_point_b_id : number

  badge_points_a_to_b : number

  badge_points_b_to_a : number

  created_at : string

  updated_at : string

  constructor(
    id: number,
    name: string,
    description: string,
    mountainRangeId: number,
    terrainPointAId: number,
    terrainPointBId: number,
    badgePointsAToB: number,
    badgePointsBToA: number,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.mountain_range_id = mountainRangeId
    this.terrain_point_a_id = terrainPointAId
    this.terrain_point_b_id = terrainPointBId
    this.badge_points_a_to_b = badgePointsAToB
    this.badge_points_b_to_a = badgePointsBToA
    this.created_at = createdAt
    this.updated_at = updatedAt
  }
}

export default Section
