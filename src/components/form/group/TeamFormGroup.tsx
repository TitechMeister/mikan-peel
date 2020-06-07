import React from 'react'
import { Form } from 'react-bootstrap'

import styles from './BasicFormGroup.scss'

const TeamFormGroup: React.FC<FormProps> = ({ onUpdate, values }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name
    const newValue = event.target.value
    onUpdate({
      [name]: newValue,
    })
  }

  const teams = [
    { id: 1, name: '翼班' },
    { id: 2, name: '電装班' },
  ]

  return (
    <Form.Group controlId='formTeam' className={styles.form}>
      <Form.Label>班</Form.Label>
      <Form.Control as='select' custom onChange={onChange}>
        {teams &&
          teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
              selected={team.id === values.team}
            >
              {team.name}
            </option>
          ))}
      </Form.Control>
    </Form.Group>
  )
}

export default TeamFormGroup
