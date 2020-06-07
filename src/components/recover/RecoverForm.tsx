import React from 'react'
import { Button, Form } from 'react-bootstrap'
import c from 'classnames'
import styles from './RecoverForm.scss'

const RecoverForm: React.FC = () => {
  return (
    <Form className={c(styles.self, styles.form)}>
      <Form.Group controlId='formPassword'>
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control type='email' placeholder='example@meister.tech' />
      </Form.Group>
      <Button variant='outline-light'>Submit</Button>
    </Form>
  )
}

export default RecoverForm
