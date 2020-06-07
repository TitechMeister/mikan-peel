import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import TopBarLink from './TopBarLink'
import type { Auth } from '../../utils/auth'

import styles from './TopBar.scss'

type Props = {
  auth: Auth
}

const TopBar: React.FC<Props> = ({ auth }: Props) => {
  const { pathname } = useLocation()

  console.log(auth?.account)

  const username = auth?.account?.username

  return (
    <Navbar bg='primary' variant='dark' expand='lg' className={styles.self}>
      <Navbar.Brand as={Link} to='/'>
        Mikan
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto' activeKey={`#${pathname}`}>
          <TopBarLink to='/'>Home</TopBarLink>
        </Nav>
        <Nav className='ml-auto'>
          <NavDropdown id='nav-dropdown' title={username}>
            <NavDropdown.Item disabled as={Link} to='/profile'>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/logout'>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopBar
