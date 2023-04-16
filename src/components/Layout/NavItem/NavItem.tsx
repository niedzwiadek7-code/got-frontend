import React from 'react'
import { NavLink } from 'react-router-dom'
import PageInterface from '@/pages/PageInterface'
import Styles from './NavItem.module.scss'

interface Props {
    page: PageInterface,
    name: string
}

const createNavItem = (name: string, page: PageInterface) => (
  <NavLink
    to={page.link}
    className={({ isActive }) => [
      'rounded', 'border-0', 'list-group-item', 'py-2', Styles.link,
      isActive ? Styles.active : null,
    ].filter(Boolean).join(' ')}
    aria-current="true"
  >
    <div
      className="row align-items-center"
    >
      <div
        className="col-3"
        style={{ fontSize: '1.3rem' }}
      >
        { page?.icon }
      </div>
      <span
        className="col-9"
      >
        { name }
      </span>
    </div>
  </NavLink>
)

const createPanelItem = (name: string, page: PageInterface) => (
  <NavLink
    to={page.link}
    className={({ isActive }) => [
      'ms-4', 'rounded', 'border-0', 'list-group-item', 'py-2', Styles.link,
      isActive ? Styles.active : null,
    ].filter(Boolean).join(' ')}
    aria-current="true"
  >
    <div
      className="row align-items-center"
    >
      <div
        className="col-3"
        style={{ fontSize: '1.3rem' }}
      >
        { page?.icon }
      </div>
      <span
        className="col-9"
      >
        { name }
      </span>
    </div>
  </NavLink>
)

const NavItem: React.FC<Props> = (props) => (
  <>
    { createNavItem(props.name, props.page) }
    {
      props.page.panels
      && Object.entries(props.page.panels).map(
        ([name, panel]) => createPanelItem(name, panel),
      )
    }
    <div className="mb-2" />
  </>
)

export default NavItem
