import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const LogoutView: React.FC = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (auth) {
      auth.logout()
      history.push('/')
    }
  }, [auth, history.push])

  return <Container></Container>
}

export default LogoutView
