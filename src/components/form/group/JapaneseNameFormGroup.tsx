import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const JapaneseNameFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formJapaneseName' className={styles.form}>
      <Form.Label>名前</Form.Label>
      <Row>
        <Col sm={6}>
          <Form.Control
            type='text'
            className='mb-2'
            placeholder='山田'
            name='ja_last_name'
            onChange={onChange}
            value={values.ja_last_name || ''}
          />
        </Col>
        <Col sm={6}>
          <Form.Control
            type='text'
            placeholder='太郎'
            name='ja_first_name'
            onChange={onChange}
            value={values.ja_first_name || ''}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

export default JapaneseNameFormGroup
