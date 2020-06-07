import React from 'react'
import { Form, Button } from 'react-bootstrap'
import AccountForm from '../form/AccountForm'
import ProfileForm from '../form/ProfileForm'
import RegistrationCodeForm from '../form/RegistrationCodeForm'

const RegisterForm: React.FC = () => {
  return (
    <Form>
      <AccountForm />
      <ProfileForm />
      <RegistrationCodeForm />
      <Button variant='outline-light'>Register</Button>
    </Form>
  )
}

export default RegisterForm
