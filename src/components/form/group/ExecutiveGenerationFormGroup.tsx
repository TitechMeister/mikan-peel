import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const ExecutiveGenerationFormGroup: React.FC<FormProps> = ({
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
    <Form.Group controlId='formExecutiveGeneration' className={styles.form}>
      <Form.Label>執行代</Form.Label>
      <Form.Control
        type='number'
        placeholder={(new Date().getFullYear() + 2).toString()}
        name='executive_generation'
        onChange={onChange}
        value={values.executive_generation || ''}
      />
    </Form.Group>
  )
}

export default ExecutiveGenerationFormGroup
