import React from 'react'
import { Container } from 'react-bootstrap'

import styles from './RecoverView.scss'
import LogoMedium from '../components/logo/LogoMedium'
import RecoverForm from '../components/form/RecoverForm'

const RecoverView: React.FC = () => {
  return (
    <div className={styles.self}>
      <Container>
        <LogoMedium type='light' />
        <h2>Recover password</h2>
        <RecoverForm />
      </Container>
    </div>
  )
}

export default RecoverView
