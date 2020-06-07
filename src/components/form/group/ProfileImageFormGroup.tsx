import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const ProfileImageFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  return (
    <Form.Group controlId='formProfileImage' className={styles.form}>
      <Form.Label>プロフィール画像</Form.Label>
      <Form.Control
        type='file'
        custom
        name='profile_image'
        onChange={onChange}
        value={values.profile_image || ''}
        accept='image/*'
        placeholder='Choose a image...'
      />
    </Form.Group>
  )
}

export default ProfileImageFormGroup
