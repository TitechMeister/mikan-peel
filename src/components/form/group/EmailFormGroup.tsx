import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const EmailFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formEmail' className={styles.form}>
      <Form.Label>メール</Form.Label>
      <Form.Control
        type='email'
        placeholder='example@meister.tech'
        name='email'
        onChange={onChange}
        value={values.email || ''}
      />
    </Form.Group>
  )
}

export default EmailFormGroup
