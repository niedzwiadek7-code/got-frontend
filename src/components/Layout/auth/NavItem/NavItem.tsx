import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import PageInterface from '@/pages/auth/PageInterface'
import Styles from './NavItem.module.scss'
import { useTheme } from '../../../../context/theme'

interface Props {
    page: PageInterface,
    name: string
}

type NavItemLocalProps = {
  name: string,
  page: PageInterface
}

const NavItemLocal: React.FC<NavItemLocalProps> = ({ name, page }) => {
  const theme = useTheme()

  return (
    <NavLink
      to={page.link}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
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
}

type PanelItemProps = {
  name: string,
  page: PageInterface,
}

const PanelItem: React.FC<PanelItemProps> = ({ name, page }) => {
  const theme = useTheme()

  return (
    <NavLink
      to={page.link}
      key={uuidv4()}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
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
}

const NavItem: React.FC<Props> = (props) => (
  <>
    <NavItemLocal
      name={props.name}
      page={props.page}
    />
    {
      props.page.panels
      && Object.entries(props.page.panels).map(
        ([name, panel]) => !panel?.hideInMenu && (
          <PanelItem
            key={name}
            name={name}
            page={panel}
          />
        ),
      )
    }
    <div className="mb-2" />
  </>
)

export default NavItem
