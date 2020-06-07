import React, { useState, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import EmailFormGroup from './group/EmailFormGroup'

const RecoverForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(() => {
    console.log(values)
  }, [values])

  return (
    <Form>
      <EmailFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default RecoverForm
