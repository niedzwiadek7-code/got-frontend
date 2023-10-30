import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import * as TableComponent from './Table'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import User from '../../../models/User'

const Leaders: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const [usersService] = useState(apiService.getUser(token))

  useEffect(() => {
    const fetchData = async () => {
      setUsers(
        await usersService.getAllUsersWithRoles(),
      )
    }

    fetchData()
  }, [usersService])

  useEffect(() => {
    setLoading(false)
  }, [users])

  if (loading) {
    return (
      <div className="mt-3 text-center">
        <Spinner
          animation="border"
          role="status"
          className="text-center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-4">
        Zarządzanie przodownikami
      </h3>

      <div>
        <TableComponent.Component
          users={users}
        />
      </div>
    </div>
  )
}

export default Leaders
