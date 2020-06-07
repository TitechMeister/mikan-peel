import React, { useState, useCallback, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import EmailFormGroup from './group/EmailFormGroup'
import MikanApiContext from '../../context/MikanApiContext'

const RecoverForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const mikanApi = useContext(MikanApiContext)

  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      try {
        if (values.email) {
          await mikanApi.postWithoutDefaultHeader('/recover/token', {
            email: values.email,
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    [mikanApi, values],
  )

  return (
    <Form onSubmit={onSubmit}>
      <EmailFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default RecoverForm
