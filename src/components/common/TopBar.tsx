import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import TopBarLink from './TopBarLink'

const TopBar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand as={Link} to='/'>
        Mikan
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className='mr-auto' activeKey={`#${pathname}`}>
          <TopBarLink to='/'>Home</TopBarLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopBar
