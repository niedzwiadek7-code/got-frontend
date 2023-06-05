import React, { useEffect, useState } from 'react'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import Trip from '@/models/Trip'
import * as Loading from '../../../components/UI/Loading'

type Props = {}

const TripComponent: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const [trips, setTrips] = useState<Trip[]>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const tripService = apiService.getTrip(token)
      setTrips(
        await tripService.getAllTrips(),
      )
      setLoading(false)
    }

    fetchData()
  })

  if (loading) {
    return <Loading.Component />
  }

  return (
    <div>
      {JSON.stringify(trips)}
    </div>
  )
}

export default TripComponent
