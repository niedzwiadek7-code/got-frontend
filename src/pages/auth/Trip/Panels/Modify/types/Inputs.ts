export type TripElement = {
  section: string,
  date: Date,
  oppositeDirection: boolean,
}

export type Inputs = {
  name: string,
  description: string,
  tripElements: TripElement[],
}
