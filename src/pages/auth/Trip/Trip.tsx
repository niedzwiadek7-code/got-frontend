import React, { useEffect, useState } from 'react'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import Trip from '@/models/Trip'
import * as Loading from '../../../components/UI/Loading'
import * as Card from './Card'
import GotBook from '@/models/GotBook'

type Props = {}

const TripComponent: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [tripService] = useState(apiService.getTrip(token))
  const [gotBookService] = useState(apiService.getGotBook(token))
  const [gotBook, setGotBook] = useState<GotBook | null>(null)

  const fetchData = async () => {
    setTrips(
      await tripService.getAllTrips(),
    )
    setGotBook(
      await gotBookService.getGotBook(),
    )
  }

  useEffect(() => {
    fetchData().then(() => setLoading(false))
  }, [tripService, gotBookService])

  if (loading) {
    return <Loading.Component />
  }

  return (
    <div>
      <h2 className="text-center mb-4">
        Twoje wycieczki
      </h2>
      {
        trips.map((trip) => (
          <div
            key={trip.id}
            className="mb-3"
          >
            <Card.Component
              trip={trip}
              gotBook={gotBook}
            />
          </div>
        ))
      }
    </div>
  )
}

export default TripComponent
