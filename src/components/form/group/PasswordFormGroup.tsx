import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const PasswordFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formPassword' className={styles.form}>
      <Form.Label>パスワード</Form.Label>
      <Form.Control
        type='password'
        placeholder='password'
        name='password'
        onChange={onChange}
        value={values.password || ''}
      />
    </Form.Group>
  )
}

export default PasswordFormGroup
