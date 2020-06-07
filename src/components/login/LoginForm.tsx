import React from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './LoginForm.scss'

const LoginForm: React.FC = () => {
  return (
    <Form className={styles.self}>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' />
      </Form.Group>
      <Button variant='outline-light'>Login</Button>
    </Form>
  )
}

export default LoginForm
