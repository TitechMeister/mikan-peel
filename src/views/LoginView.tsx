import React from 'react'
import LogoBig from '../components/logo/LogoBig'
import { Container } from 'react-bootstrap'

import styles from './LoginView.scss'
import LoginForm from '../components/form/LoginForm'
import type { Auth } from '../utils/auth'

type Props = {
  auth: Auth
}

const LoginView: React.FC<Props> = ({ auth }) => {
  return (
    <div className={styles.self}>
      <Container>
        <LogoBig type='light' />
        <LoginForm auth={auth} />
      </Container>
    </div>
  )
}

export default LoginView
