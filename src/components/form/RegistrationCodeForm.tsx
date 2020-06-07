import React from 'react'
import { Form } from 'react-bootstrap'
import c from 'classnames'

import styles from './AccountForm.scss'

const RegistrationCodeForm: React.FC = () => {
  return (
    <div className={c(styles.self, styles.form)}>
      <Form.Group controlId='formRegistrationCode'>
        <Form.Label>登録コード</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
    </div>
  )
}

export default RegistrationCodeForm
