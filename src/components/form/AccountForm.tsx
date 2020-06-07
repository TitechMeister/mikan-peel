import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import c from 'classnames'

import styles from './AccountForm.scss'

const AccountForm: React.FC = () => {
  return (
    <div className={c(styles.self, styles.form)}>
      <Form.Group controlId='formUsername'>
        <Form.Label>ユーザー名</Form.Label>
        <Form.Control type='text' placeholder='username' />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label>メール</Form.Label>
        <Form.Control type='email' placeholder='example@meister.tech' />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label>パスワード</Form.Label>
        <Form inline>
          <Row>
            <Col sm={6}>
              <Form.Control type='password' className='mb-2 mr-sm-2' />
            </Col>
            <Col sm={6}>
              <Form.Control type='password' placeholder='再入力' />
            </Col>
          </Row>
        </Form>
      </Form.Group>
    </div>
  )
}

export default AccountForm
