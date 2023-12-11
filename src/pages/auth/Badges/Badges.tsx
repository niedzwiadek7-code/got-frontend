import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import * as TableComponent from './Table'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import Badge from '../../../models/Badge'

const Badges: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [badges, setBadges] = useState<Badge[]>([])
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const badgeService = apiService.getBadge(token)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setBadges(await badgeService.getAllBadges())
      setLoading(false)
    }

    fetchData()
  }, [])

  const refreshBadgesList = async () => {
    const fetchData = async () => {
      setBadges(await badgeService.getAllBadges())
    }
    setLoading(true)
    await fetchData()
  }

  if (loading) {
    return (
      <div className="mt-3 text-center">
        <Spinner animation="border" role="status" className="text-center">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-4">
        Zarządzanie odznakami
      </h3>
      <div>
        <TableComponent.Component badges={badges} refreshBadgesList={refreshBadgesList} />
      </div>
    </div>
  )
}

export default Badges
