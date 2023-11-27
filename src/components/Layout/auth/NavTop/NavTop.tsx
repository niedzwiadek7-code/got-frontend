import React from 'react'
import {
  Dropdown, Navbar, Nav, Button,
} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars, faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Styles from './NavTop.module.scss'
import * as Types from './types'

interface Props {
  mainComponent: React.ReactNode,
  options: Array<Types.Option>,
  showMenu: boolean,
  toggleMenu: () => any,
}

const NavDropdownComponent = (props: Props) => (
  <Navbar
    className="bg-light"
    sticky="top"
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
      <Nav>
        <Dropdown
          className="mx-3"
          drop="down-centered"
        >
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="d-flex flex-row align-items-center bg-transparent border-0 text-dark"
          >
            { props.mainComponent }
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              props.options.map((option) => (
                <Dropdown.Item
                  key={uuidv4()}
                  className={Styles.item}
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

export default NavDropdownComponent
