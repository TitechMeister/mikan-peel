import React from 'react'
import { Container } from 'react-bootstrap'
import LogoMedium from '../components/logo/LogoMedium'
import RegisterForm from '../components/register/RegisterForm'

import styles from './RegisterView.scss'

const RegisterView: React.FC = () => {
  return (
    <div className={styles.self}>
      <Container>
        <LogoMedium type='light' />
        <RegisterForm />
      </Container>
    </div>
  )
}

export default RegisterView
