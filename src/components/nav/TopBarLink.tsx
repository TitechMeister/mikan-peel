import React from 'react'
import c from 'classnames'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  to: string
}

const TopBarLink: React.FC<Props> = ({ to, children }) => {
  const { pathname, search } = useLocation()

  return (
    <Nav.Item className={c({ active: to === pathname })}>
      <Nav.Link as={Link} to={{ pathname: to, search: search }}>
        {children}
      </Nav.Link>
    </Nav.Item>
  )
}

export default TopBarLink
