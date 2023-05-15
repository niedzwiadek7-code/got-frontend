import React from 'react'
import Layout from '../components/Layout'
import Public from './public'
import Auth from './auth'
import paths from './auth/paths'
import { useAuth } from '../context/auth'

type Props = {}

const Content: React.FC<Props> = () => {
  const { loggedIn } = useAuth()

  if (loggedIn) {
    return (
      <Layout.Auth.Component
        paths={paths}
      >
        <Auth />
      </Layout.Auth.Component>
    )
  }

  return (
    <Layout.Public.Component>
      <Public />
    </Layout.Public.Component>
  )
}

export default Content
