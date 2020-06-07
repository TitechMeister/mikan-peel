import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import type { Auth } from '../utils/auth'
import { Container } from 'react-bootstrap'

type Props = {
  auth: Auth
}

const LogoutView: React.FC<Props> = ({ auth }) => {
  const history = useHistory()

  useEffect(() => {
    if (auth) {
      auth.logout()
      history.push('/')
    }
  }, [auth, history.push])

  return <Container></Container>
}

export default LogoutView
