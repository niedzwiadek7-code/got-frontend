import Point from './Point'
import TerrainPoint from '@/models/TerrainPoint'

class Line {
  name: string

  pointAId: number

  pointBId: number

  pointA?: Point

  pointB?: Point

  constructor(name: string, pointA: number, pointB: number) {
    this.name = name
    this.pointAId = pointA
    this.pointBId = pointB
  }

  getLine(): [[number, number], [number, number]] {
    return [
      this.pointA?.getPosition() || [0, 0],
      this.pointB?.getPosition() || [0, 0],
    ]
  }

  setPointA(pointA: TerrainPoint) {
    this.pointA = new Point(
      pointA.name,
      pointA.latitude,
      pointA.longitude,
    )
  }

  setPointB(pointB: TerrainPoint) {
    this.pointB = new Point(
      pointB.name,
      pointB.latitude,
      pointB.longitude,
    )
  }
}

export default Line
