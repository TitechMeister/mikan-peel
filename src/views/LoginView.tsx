import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LogoBig from '../components/logo/LogoBig'
import LoginForm from '../components/form/LoginForm'
import AuthContext from '../context/AuthContext'
import styles from './LoginView.scss'

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
        <div className={styles.links}>
          <Link to='/register'>Register</Link>
          <Link to='/recover'>Forgot password?</Link>
        </div>
      </Container>
    </div>
  )
}

export default LoginView
