export type TripElement = {
  section: number,
  date: Date,
  oppositeDirection: boolean,
}

export type Inputs = {
  name: string,
  description: string,
  tripElements: TripElement[],
}
