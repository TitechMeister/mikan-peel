import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import LogoBig from '../components/logo/LogoBig'
import LoginForm from '../components/form/LoginForm'
import AuthContext from '../context/AuthContext'
import styles from './LoginView.scss'
import { useHistory } from 'react-router'

const LoginView: React.FC = () => {
  const history = useHistory()
  const { authed } = useContext(AuthContext)

  useEffect(() => {
    if (authed) history.replace('/')
  }, [authed])

  return (
    <div className={styles.self}>
      <Container>
        <LogoBig type='light' />
        <LoginForm />
      </Container>
    </div>
  )
}

export default LoginView
