class Point {
  name: string

  latitude: string

  longitude: string

  constructor(name: string, latitude: string, longitude: string) {
    this.name = name
    this.latitude = latitude
    this.longitude = longitude
  }

  getPosition(): [number, number] {
    return [
      parseFloat(this.latitude),
      parseFloat(this.longitude),
    ]
  }

  setName(name: string): void {
    this.name = name
  }

  setLatitude(latitude: string): void {
    this.latitude = latitude
  }

  setLongitude(longitude: string): void {
    this.longitude = longitude
  }
}

export default Point
