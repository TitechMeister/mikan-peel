import React, { useState, useCallback, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import EmailFormGroup from './group/EmailFormGroup'
import MikanApiContext from '../../context/MikanApiContext'

const RecoverForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [validated, setValidated] = useState(false)

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
        const errors = e?.response?.data
        console.log(e?.response)
        if (errors) {
          setValidated(true)
          setErrors(errors)
        }
      }
    },
    [mikanApi, values],
  )

  return (
    <Form onSubmit={onSubmit} validated={validated}>
      <EmailFormGroup onUpdate={onUpdate} values={values} errors={errors} />
      <Button variant='outline-light' onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default RecoverForm
