import React from 'react'
import {
  Dropdown, Navbar, Nav, Button,
} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars, faSun, faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Styles from './NavTop.module.scss'
import * as Types from './types'
import { useTheme } from '../../../../context/theme'

interface Props {
  mainComponent: React.ReactNode,
  options: Array<Types.Option>,
  showMenu: boolean,
  toggleMenu: () => any,
}

const NavDropdownComponent = (props: Props) => {
  const theme = useTheme()

  return (
    <Navbar
      sticky="top"
      style={{
        backgroundColor: theme.colors.background,
        filter: 'brightness(95%)',
        color: theme.colors.color,
      }}
    >
      <Nav
        className="d-block d-lg-none mx-3"
      >
        <Button
          variant="link"
          onClick={props.toggleMenu}
        >
          {
            props.showMenu ? (
              <FontAwesomeIcon
                icon={faXmark}
                style={{ fontSize: '1.5em' }}
                color="#666666"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                style={{ fontSize: '1.5em' }}
                color="#666666"
              />
            )
          }
        </Button>
      </Nav>
      <Navbar.Collapse
        className="justify-content-end"
      >
        <Nav className="align-items-center">
          <FontAwesomeIcon
            icon={faSun}
            color={theme.colors.color}
            style={{
              cursor: 'pointer',
              fontSize: '1em',
            }}
            onClick={() => theme.changeTheme()}
          />

          <Dropdown
            className="mx-3"
            drop="down-centered"
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="d-flex flex-row align-items-center bg-transparent border-0"
              style={{
                color: theme.colors.color,
              }}
            >
              { props.mainComponent }
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: theme.colors.background,
              }}
            >
              {
                props.options.map((option) => (
                  <Dropdown.Item
                    key={uuidv4()}
                    className={Styles.item}
                    style={{
                      color: theme.colors.color,
                    }}
                    onClick={option.onClick}
                  >
                    { option.name }
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavDropdownComponent
