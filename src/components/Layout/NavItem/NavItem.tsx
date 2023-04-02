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
      'rounded', 'border-0', 'list-group-item', 'py-2', Styles.link, 'text-center',
      isActive ? Styles.active : null,
    ].filter(Boolean).join(' ')}
    aria-current="true"
  >
    <span>{ props.name }</span>
  </NavLink>
)

export default NavItem
