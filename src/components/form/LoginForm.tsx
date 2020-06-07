import React, { useState, useCallback, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import UsernameFormGroup from './group/UsernameFormGroup'
import PasswordFormGroup from './group/PasswordFormGroup'
import AuthContext from '../../context/AuthContext'
import styles from './LoginForm.scss'

const LoginForm: React.FC = () => {
  const histroy = useHistory()
  const auth = useContext(AuthContext)
  const [values, setValues] = useState<FormValues>({})
  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(async () => {
    try {
      const success = await auth.login(values.username, values.password)
      if (success) {
        histroy.push('/')
      } else {
        console.log('error')
      }
    } catch (e) {
      console.log('error', e)
    }
  }, [auth, histroy, values])

  return (
    <Form className={styles.self}>
      <UsernameFormGroup onUpdate={onUpdate} values={values} />
      <PasswordFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
