import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const PasswordSettingFormGroup: React.FC<FormProps> = ({
  onUpdate,
  values,
}) => {
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
      <Form inline>
        <Row>
          <Col sm={6}>
            <Form.Control
              type='password'
              className='mb-2 mr-sm-2'
              name='password'
              onChange={onChange}
              value={values.password || ''}
            />
          </Col>
          <Col sm={6}>
            <Form.Control
              type='password'
              placeholder='再入力'
              name='passwordConfirm'
              onChange={onChange}
              value={values.passwordConfirm || ''}
            />
          </Col>
        </Row>
      </Form>
    </Form.Group>
  )
}

export default PasswordSettingFormGroup
