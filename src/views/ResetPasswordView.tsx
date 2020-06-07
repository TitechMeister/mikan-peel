import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import LogoMedium from '../components/logo/LogoMedium'
import ResetPasswordForm from '../components/form/ResetPasswordForm'
import MikanApiContext from '../context/MikanApiContext'

import styles from './ResetPasswordView.scss'

const ResetPasswordView: React.FC = () => {
  const mikanApi = useContext(MikanApiContext)
  const [isValid, setIsValid] = useState(true)
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      mikanApi
        .postWithoutDefaultHeader('/recover/verify', {
          token,
        })
        .then(() => {
          setIsValid(true)
        })
        .catch(() => {
          setIsValid(false)
        })
    }
  }, [token])

  if (isValid) {
    return (
      <div className={styles.self}>
        <Container>
          <LogoMedium type='light' />
          <h2>Enter new password</h2>
          <ResetPasswordForm token={token} />
        </Container>
      </div>
    )
  } else {
    return (
      <div className={styles.self}>
        <Container>
          <LogoMedium type='light' />
          <h2>Invalid token.</h2>
        </Container>
      </div>
    )
  }
}

export default ResetPasswordView
