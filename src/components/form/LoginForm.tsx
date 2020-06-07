import React, { useState, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './LoginForm.scss'
import UsernameFormGroup from './group/UsernameFormGroup'
import PasswordFormGroup from './group/PasswordFormGroup'

const LoginForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(() => {
    console.log(values)
  }, [values])

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
