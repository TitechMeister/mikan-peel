import React, { useState, useCallback, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import PasswordSettingFormGroup from './group/PasswordSettingFormGroup'
import MikanApiContext from '../../context/MikanApiContext'

type Props = {
  token: string
}

const ResetPasswordForm: React.FC<Props> = ({ token }: Props) => {
  const mikanApi = useContext(MikanApiContext)
  const [values, setValues] = useState<FormValues>({})
  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(
    async (event: OnSubmitEvent) => {
      event.preventDefault()

      try {
        if (token && values.password) {
          await mikanApi.postWithoutDefaultHeader('/recover/renew', {
            token,
            password: values.password,
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    [token, values],
  )

  return (
    <Form onSubmit={onSubmit}>
      <PasswordSettingFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ResetPasswordForm
