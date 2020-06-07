import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const EnglishNameFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formEnglishName' className={styles.form}>
      <Form.Label>Name</Form.Label>
      <Row>
        <Col sm={6}>
          <Form.Control
            type='text'
            className='mb-2'
            placeholder='Yamada'
            name='en_last_name'
            onChange={onChange}
            value={values.en_last_name || ''}
          />
        </Col>
        <Col sm={6}>
          <Form.Control
            type='text'
            placeholder='Taro'
            name='en_first_name'
            onChange={onChange}
            value={values.en_first_name || ''}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

export default EnglishNameFormGroup
