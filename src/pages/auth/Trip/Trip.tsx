import React, { useEffect, useState } from 'react'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import Trip from '@/models/Trip'
import * as Loading from '../../../components/UI/Loading'
import * as Card from './Card'

type Props = {}

const TripComponent: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [tripService] = useState(apiService.getTrip(token))

  useEffect(() => {
    const fetchData = async () => {
      setTrips(
        await tripService.getAllTrips(),
      )
      setLoading(false)
    }

    fetchData()
  }, [tripService])

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
            />
          </div>
        ))
      }
    </div>
  )
}

export default TripComponent
