import React from 'react'
import {
  Dropdown, Navbar, Nav,
} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import Styles from './NavTop.module.scss'
import * as Types from './types'

interface Props {
  mainComponent: React.ReactNode,
  options: Array<Types.Option>
}

const NavDropdownComponent = (props: Props) => (
  <Navbar
    className="bg-light"
    sticky="top"
  >
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
