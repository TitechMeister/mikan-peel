import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const RegistrationCodeFormGroup: React.FC<FormProps> = ({
  onUpdate,
  values,
}) => {
  const onChange = (event: OnChangeEvent): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formRegistrationCode' className={styles.form}>
      <Form.Label>登録コード</Form.Label>
      <Form.Control
        type='text'
        name='registration_code'
        onChange={onChange}
        value={values.registration_code || ''}
      />
    </Form.Group>
  )
}

export default RegistrationCodeFormGroup
