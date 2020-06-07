import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const PasswordSettingFormGroup: React.FC<FormProps> = ({
  onUpdate,
  values,
  errors,
}) => {
  const onChange = (event: OnChangeEvent): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formPassword' className={styles.form}>
      <Form.Label>パスワード</Form.Label>
      <Row>
        <Col sm={6}>
          <Form.Control
            type='password'
            className='mb-2'
            name='password'
            onChange={onChange}
            value={values.password || ''}
            isInvalid={!!errors?.password}
          />
          <Form.Control.Feedback type='invalid'>
            {errors?.password}
          </Form.Control.Feedback>
        </Col>
        <Col sm={6}>
          <Form.Control
            type='password'
            placeholder='再入力'
            name='passwordConfirm'
            onChange={onChange}
            value={values.passwordConfirm || ''}
            isInvalid={
              (values.password || values.passwordConfirm) &&
              values.password !== values.passwordConfirm
            }
          />
          <Form.Control.Feedback type='invalid'>
            Password did not match.
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default PasswordSettingFormGroup
