import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import LogoMedium from '../components/logo/LogoMedium'
import ResetPasswordForm from '../components/form/ResetPasswordForm'

import styles from './ResetPasswordView.scss'

const ResetPasswordView: React.FC = () => {
  const { token } = useParams()

  return (
    <div className={styles.self}>
      <Container>
        <LogoMedium type='light' />
        <ResetPasswordForm />
      </Container>
    </div>
  )
}

export default ResetPasswordView
