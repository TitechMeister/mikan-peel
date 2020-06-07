import React from 'react'
import LogoBig from '../components/logo/LogoBig'
import { Container } from 'react-bootstrap'

import styles from './LoginView.scss'
import LoginForm from '../components/login/LoginForm'

const LoginView: React.FC = () => {
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
