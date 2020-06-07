import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const UsernameFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formUsername' className={styles.form}>
      <Form.Label>ユーザー名</Form.Label>
      <Form.Control
        type='text'
        placeholder='username'
        name='username'
        onChange={onChange}
        value={values.username || ''}
      />
    </Form.Group>
  )
}

export default UsernameFormGroup
