import React from 'react'
import { NavLink } from 'react-router-dom'
import PageInterface from '@/pages/PageInterface'
import Styles from './NavItem.module.scss'

interface Props {
    page: PageInterface,
    name: string
}

const NavItem = (props: Props) => (
  <NavLink
    to={props.page.link}
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
        {props.page?.icon}
      </div>
      <span
        className="col-9"
      >
        { props.name }
      </span>
    </div>
  </NavLink>
)

export default NavItem
