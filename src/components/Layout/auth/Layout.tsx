import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './Layout.module.scss'
import PageInterface from '@/pages/auth/PageInterface'
import NavItem from './NavItem'
import * as NavTop from './NavTop'
import { useAuth } from '../../../context/auth'
import { getPath, PathNames } from '../../../utils/defines'
import { useDependencies } from '../../../context/dependencies'

interface Props {
  paths: Record<string, PageInterface>,
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const [userService] = useState(apiService.getUser(auth.token))
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getUser()
        console.log(user)
        setUserName(`${user.first_name} ${user.last_name}`)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [userService])

  console.log(auth.token)

  return (
    <>
      <header>
        <nav
          id="sidebarMenu"
          className={`${Styles.sidebar} collapse d-lg-block bg-white`}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-2 mt-4">
              {
                Object.entries(props.paths).map(([name, page]) => {
                  const requireRole = page.requireRole?.toString()
                  console.log(auth.roles)

                  let hasRequiredRole: boolean | undefined
                  if (requireRole) {
                    hasRequiredRole = auth.roles?.includes(requireRole.toString())
                  } else {
                    hasRequiredRole = true
                  }
                  return (
                    hasRequiredRole && (
                      <NavItem.Component
                        key={name}
                        name={name}
                        page={page}
                      />
                    )
                  )
                })
              }
            </div>
          </div>
        </nav>

        <NavTop.Component
          mainComponent={(
            <>
              <figcaption
                className="px-3 rounded-circle text-red"
              >
                { userName || 'Użytkownik' }
              </figcaption>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="22"
                alt="Avatar"
                loading="lazy"
              />
            </>
          )}
          options={[
            {
              name: 'Wyloguj',
              onClick: () => {
                auth.setToken(undefined)
                auth.setLoggedIn(false)
                auth.setRoles([])
                navigate(getPath(PathNames.WELCOME))
              },
            },
          ]}
        />
      </header>

      <main
        className={Styles.main}
        style={{ marginTop: '58px' }}
      >
        <div
          className="container pt-4"
        >
          { props.children }
        </div>
      </main>
    </>
  )
}

export default Layout
