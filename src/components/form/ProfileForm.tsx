import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import c from 'classnames'

import styles from './ProfileForm.scss'

const ProfileForm: React.FC = () => {
  const teams = [
    { id: 1, name: '翼班' },
    { id: 2, name: '電装班' },
  ]

  return (
    <div className={c(styles.self, styles.form)}>
      <Form.Group controlId='formName'>
        <Form.Label>Name</Form.Label>
        <Form inline>
          <Row>
            <Col sm={6}>
              <Form.Control
                type='text'
                className='mb-2 mr-sm-2'
                placeholder='Yamada'
              />
            </Col>
            <Col sm={6}>
              <Form.Control type='text' placeholder='Taro' />
            </Col>
          </Row>
        </Form>
      </Form.Group>
      <Form.Group controlId='formJaName'>
        <Form.Label>名前</Form.Label>
        <Form inline>
          <Row>
            <Col sm={6}>
              <Form.Control
                type='text'
                className='mb-2 mr-sm-2'
                placeholder='山田'
              />
            </Col>
            <Col sm={6}>
              <Form.Control type='text' placeholder='太郎' />
            </Col>
          </Row>
        </Form>
      </Form.Group>
      <Form.Group controlId='formExecutiveGeneration'>
        <Form.Label>執行代</Form.Label>
        <Form.Control
          type='number'
          placeholder={(new Date().getFullYear() + 2).toString()}
        />
      </Form.Group>
      <Form.Group controlId='formTeam'>
        <Form.Label>班</Form.Label>
        <Form.Control as='select' custom>
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='formProfileImage'>
        <Form.Label>プロフィール画像</Form.Label>
        <Form.Control
          type='file'
          custom
          accept='image/*'
          placeholder='Choose a image...'
        />
      </Form.Group>
    </div>
  )
}

export default ProfileForm
