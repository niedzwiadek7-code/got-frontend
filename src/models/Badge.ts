class Badge {
    id: number
    name: string
    point_threshold : number
    next_badge: number | null
    previous_badge : number | null
  
    constructor(id: number, name: string, point_threshold : number, next_badge: number | null, previous_badge : number | null) {
      this.id = id
      this.name = name
      this.point_threshold  = point_threshold 
      this.next_badge = next_badge
      this.previous_badge  = previous_badge 
    }
  }
  
  export default Badge
  