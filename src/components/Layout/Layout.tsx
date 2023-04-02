import React from 'react'
import Styles from './Layout.module.scss'
import PageInterface from '@/pages/PageInterface'
import NavItem from './NavItem'
import NavTop from './NavTop'

interface Props {
  paths: Record<string, PageInterface>,
  Content: React.ReactNode
}

const Layout = (props: Props) => (
  <>
    <header>
      <nav
        id="sidebarMenu"
        className={`${Styles.sidebar} collapse d-lg-block bg-white`}
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            {
                Object.entries(props.paths).map(([name, page]) => (
                  <NavItem.Component
                    key={name}
                    name={name}
                    page={page}
                  />
                ))
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
              Random admin
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
          'Ustawienia',
          'Wyloguj',
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
        { props.Content }
      </div>
    </main>
  </>
)

export default Layout
