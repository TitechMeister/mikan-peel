import React, { useState, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import PasswordSettingFormGroup from './group/PasswordSettingFormGroup'

const ResetPasswordForm: React.FC = () => {
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
      <PasswordSettingFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ResetPasswordForm
